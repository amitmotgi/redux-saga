import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { Images, Colors } from '../Themes';
import {widthScale, heightScale} from '../Themes/DimensionManager';
import styles from './Styles/Triangle';

class Triangle extends Component {
  render() {
    return (
      <View style={[styles.triangle, this.props.style]} />
    );
  }
}
export default Triangle;
