import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

export default class TouchableOpacityView extends Component {
  constructor(props){
    super(props);
  }

  getSpinner() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20)
      }}>
        <ActivityIndicator
          animating={true}
          size={'small'}
          color={Colors.transparent} />
      </View>
    );
  }

  render() {
    const { style, onPress, label, active, invertColor, spinner } = this.props;
    let colorValue = Colors.reduxsagaGray;

    if (invertColor && active) {
      colorValue = Colors.transparent;
    } else if (!active) {
      colorValue = Colors.reduxsagaExtraDarkGray;
    } else {
      colorValue = Colors.reduxsagaActiveBlue;
    }

    let stylesObj = {
      flexDirection: 'column',
      backgroundColor: colorValue,
      width: DimensionManager.scale(335),
      height: DimensionManager.verticalScale(50),
      justifyContent: 'center',
      alignItems: 'center',
      ...this.props.style
    };

    return (
      <TouchableOpacity
        disabled={spinner}
        style={stylesObj}
        onPress={active ? onPress : null}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text style={{
          ...Fonts.style.inputBoldGT,
          fontWeight: '500',
          color: invertColor ? Colors.reduxsagaActiveBlue : Colors.transparent,
          textAlign: 'center',
        }}>{label}</Text>
        {spinner ? this.getSpinner() : null}
        </View>
      </TouchableOpacity>
    );
  }
}

TouchableOpacityView.defaultProps = {
  spinner: false
};
