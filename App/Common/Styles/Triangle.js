import { StyleSheet } from 'react-native';
import { Metrics, Colors, DimensionManager } from '../../Themes/';

export default StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: Math.round(10 * DimensionManager.widthScale),
    borderRightWidth: Math.round(10 * DimensionManager.widthScale),
    borderBottomWidth: Math.round(20 * DimensionManager.widthScale),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.grayTip,

  }
});
