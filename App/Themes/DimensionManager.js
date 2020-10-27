import {StyleSheet, Platform, Dimensions} from 'react-native';
var widthScale, topBarPadding, tabBarPadding, heightScale;

// if (Platform.OS === 'ios') {
//   widthScale = Dimensions.get('window').width / 375;
//   topBarPadding = ( Dimensions.get('window').height - ( (667.0 / 375.0) * Dimensions.get('window').width ) ) / 2.0;
//   tabBarPadding = topBarPadding;
//   heightScale = (Dimensions.get('window').height - topBarPadding - tabBarPadding) / 667;
// } else {
//   widthScale = Dimensions.get('window').width / 412;
//   topBarPadding = ( Dimensions.get('window').height - ( (720.0 / 412.0) * Dimensions.get('window').width ) ) / 2.0;
//   tabBarPadding = topBarPadding;
//   heightScale = (Dimensions.get('window').height - topBarPadding - tabBarPadding) / 720;
// }
//
// topBarPadding = topBarPadding >= 20 ? 20 : topBarPadding;
// if (topBarPadding <= 5) {
//   topBarPadding = 5;
// }
//
// if (tabBarPadding <= -5) {
//   tabBarPadding = -5;
// }
//
// tabBarPadding = tabBarPadding >= 34 ? 34 : tabBarPadding;

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ?
  [width, height] : [height, width];

//Guideline sizes for all screens
// The reason we use these values is because our UI designs are
// setup for iPhone-X
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => Math.round(shortDimension / guidelineBaseWidth * size);
const verticalScale = size => Math.round(longDimension / guidelineBaseHeight * size);
const moderateScale = (size, factor = 0.5) => Math.round(size + ( scale(size) - size ) * factor);

export function create(styles: Object): {[name: string]: number} {
  const platformStyles = {};
  Object.keys(styles).forEach((name) => {
    let {ios, android, ...style} = {...styles[name]};
    if (ios && Platform.OS === 'ios') {
      style = {...style, ...ios};
    }
    if (android && Platform.OS === 'android') {
      style = {...style, ...android};
    }
    platformStyles[name] = style;
  });
  return StyleSheet.create(platformStyles);
}

module.exports = {
  widthScale: widthScale,
  heightScale: heightScale,
  topBarPadding: topBarPadding,
  tabBarPadding: tabBarPadding,
  scale,
  verticalScale,
  moderateScale
};
