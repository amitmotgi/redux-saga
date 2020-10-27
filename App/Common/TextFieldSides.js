import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../Themes';
import { verticalScale } from '../Themes/DimensionManager';
import TextField from './TextField';

export default class TextFieldSides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { textFieldViewStyle, rightElement, rightViewStyle } = this.props;
    return (
      <View style={styles.textInputView}>
        <View style={textFieldViewStyle}>
          <TextField {...this.props} />
        </View>
        <View style={[styles.rightView, rightViewStyle]}>{rightElement}</View>
      </View>
    );
  }
}

TextFieldSides.propTypes = {
  rightElement: PropTypes.any,
  rightViewStyle: PropTypes.object,
  textFieldViewStyle: PropTypes.object
};

TextFieldSides.defaultProps = {
  rightElement: '',
  rightViewStyle: {},
  textFieldViewStyle: {}
};

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: Colors.reduxsagaBlack
  },
  rightView: {
    borderBottomWidth: verticalScale(1)
  }
});
