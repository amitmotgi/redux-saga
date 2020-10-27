import { StyleSheet } from 'react-native';
import { Metrics, Colors, DimensionManager } from '../../../Themes/';

export default StyleSheet.create({
  container: {
    marginTop: Math.round(24 * DimensionManager.heightScale),
    backgroundColor: Colors.transparent,
    alignItems: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: Math.round(24 * DimensionManager.widthScale),
    color: Colors.gray,
    marginBottom: Math.round(16 * DimensionManager.heightScale)
  }
});
