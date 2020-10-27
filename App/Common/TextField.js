import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Fonts, Images, Colors, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secureText: props.secureTextEntry,
      isFocused: false,
      text: props.value,
      validValue: true,
      showLock: props.showLock,
      password: ''
    };

    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.isFocused = this.isFocused.bind(this);
    this.toggleRevealPassword = this.toggleRevealPassword.bind(this);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.text !== nextProps.value){
      this.setState({text: nextProps.value});
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  isFocused() {
    return this.state.isFocused;
  }

  toggleRevealPassword() {
    this.setState({secureText: !this.state.secureText});
    this.blur();
  }

  validateInput(validation: () => boolean ) {
    if (validation) {
      var valid = validation();
      this.setState({validValue: valid});
    }
  }

  handleField() {
    let {
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      textColor,
      textFocusColor,
      textBlurColor,
      onFocus,
      onBlur,
      onChangeText,
      onChange,
      value,
      inputStyle,
      wrapperStyle,
      autoGrow,
      multiline,
      secureTextEntry,
      validation,
      editable,
      ...props
    } = this.props;

    var styleObj = this.props.borderColor ? {
      color: textColor || this.props.borderColor,
      borderColor: this.props.borderColor,
    } : {};

    return (
      <TextInput
        style={[styles.textField, styleObj]}
        underlineColorAndroid={'transparent'} //android
        value={this.props.value}
        editable={this.props.editable}
        secureTextEntry={this.props.secureTextEntry}
        onFocus={() => {
          this.setState({isFocused: true});
          onFocus && onFocus();
        }}
        onBlur={() => {
          this.setState({isFocused: false});
          this.validateInput(validation);
          onBlur && onBlur();
        }}
        onChangeText={(text) => {
          this.setState({text});
          onChangeText && onChangeText(text);
        }}
        onChange={(event) => {
          onChange && onChange(event);
        }}
        {...this.props}
        ref={(component) => (this.input = component)} />
    );
  }

  render () {
    let data = null;
    let errorMessage = this.state.validValue ? null : (
      <Text
        ref={'errorMessage'} // eslint-disable-line react/no-string-refs
        style={[styles.errorMessage]}>
        {this.props.errorMessage}
      </Text>
    );

    return (
      this.handleField()
    );
  }
}

TextField.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  highlightColor: PropTypes.string,
  labelColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  textFocusColor: PropTypes.string,
  textBlurColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  inputStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  errorMessage: PropTypes.string,
  validation: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send', 'none']),
};

TextField.defaultProps = {
  duration: 200,
  value: '',
  underlineColorAndroid: 'transparent',
  multiline: false,
  secureTextEntry: false,
  autoCapitalize: 'none',
  returnKeyType: 'done',
};

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: DimensionManager.verticalScale(4),
    fontSize: DimensionManager.scale(Fonts.size.input),
    color: Colors.reduxsagaRed,
  },
  textField: {
    ...Fonts.style.textLightGT,
    color: Colors.reduxsagaBlack,
    borderColor: Colors.reduxsagaBlack,
    height: DimensionManager.verticalScale(30),
    borderBottomWidth: DimensionManager.scale(1),
    fontSize: DimensionManager.scale(18),
    fontWeight: '500',
    //elevation: 5,
    padding: 0, // android,
    marginTop: DimensionManager.verticalScale(3)
  }
});
