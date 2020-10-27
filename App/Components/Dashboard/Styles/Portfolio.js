import { StyleSheet } from 'react-native';
import { Metrics, Colors, DimensionManager } from '../../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    height: Math.round(180 * DimensionManager.heightScale)
  },
  headerText: {
    textAlign: 'center',
    fontSize: Math.round(24 * DimensionManager.widthScale),
    color: Colors.gray,
    marginTop: Math.round(50 * DimensionManager.heightScale)
  },
  portfolioValue: {
    color: '#424242',
    fontSize: Math.round(36 * DimensionManager.widthScale),
    textAlign: 'center',
    marginTop: Math.round(-20 * DimensionManager.heightScale)
  }
});
