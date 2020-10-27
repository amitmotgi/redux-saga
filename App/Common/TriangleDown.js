import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { Images, Colors } from '../Themes';
import {widthScale, heightScale} from '../Themes/DimensionManager';
import Triangle from './Triangle';
import styles from './Styles/TriangleDown';

class TriangleDown extends Component {
  render() {
    return (
      <Triangle style={styles.triangleDown}/>
    );
  }
}
export default TriangleDown;
