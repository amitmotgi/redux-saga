import { StyleSheet } from 'react-native';
import { Metrics, Colors, DimensionManager } from '../../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    height: Math.round(240 * DimensionManager.heightScale)
  },
  headerText: {
    textAlign: 'center',
    fontSize: Math.round(24 * DimensionManager.widthScale),
    color: Colors.transparent,
    marginTop: Math.round(16 * DimensionManager.heightScale),
    marginBottom: Math.round(8 * DimensionManager.heightScale)
  },
  sliderContainer: {
    marginTop: Math.round(36 * DimensionManager.heightScale),
    marginLeft: Math.round(16 * DimensionManager.widthScale),
    marginRight: Math.round(16 * DimensionManager.widthScale)
  }
});
