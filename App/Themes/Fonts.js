import { DimensionManager } from './DimensionManager';

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
  reduxsagaBold: 'GTAmerica-Bold',
  reduxsagaLight: 'GTAmerica-Light',
  reduxsagaRegular: 'GTAmerica-Regular',
  reduxsagaMedium: 'GTAmerica-Medium'
};

const size = {
  large: 50,
  semi: 40,
  h1: 36,
  h2: 34,
  h3: 32,
  h4: 27,
  h5: 24,
  h6: 19,
  input: 18,
  bodyText: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  semiTextBold: {
    fontSize: size.large,
    fontWeight: 'bold',
    fontFamily: type.reduxsagaBold,
  },
  largeTextBold: {
    fontSize: size.large,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
  },
  h1BoldGT: {
    fontSize: size.h1,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
  },
  h1RegularGT: {
    fontSize: size.h1,
    fontWeight: '300',
    fontFamily: type.reduxsagaRegular,
    opacity: 0.8,
  },
  h3BoldGT: {
    fontSize: size.h3,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
  },
  h4BoldGT:{
    fontSize: size.h4,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
  },
  inputLabelBoldGT: {
    fontSize: size.input,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
    opacity: 0.8
  },
  inputBoldGT: {
    fontSize: size.input,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
    //opacity: 0.8
  },
  inputRegularGT: {
    fontSize: size.input,
    fontWeight: '300',
    fontFamily: type.reduxsagaRegular,
    opacity: 0.5
  },
  textBoldGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaBold,
    fontWeight: 'normal',
    opacity: 0.6
  },
  textRegularGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaRegular,
    fontWeight: 'normal',
    opacity: 0.6
  },
  textRegularNormalGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaRegular,
    fontWeight: 'normal',
  },
  textBoldNormalGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaBold,
    fontWeight: '500',
  },
  textLightGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaLight,
    fontWeight: '300',
  },
  textLightMediumGT: {
    fontSize: size.bodyText,
    fontFamily: type.reduxsagaLight,
    fontWeight: '500',
    opacity: 0.4
  },
  textMediumGT: {
    fontSize: size.medium,
    fontWeight: 'normal',
    fontFamily: type.reduxsagaMedium,
  },
  textMediumNormalGT: {
      fontSize: size.bodyText,
      fontFamily: type.reduxsagaMedium,
      fontWeight: '500',
  },
  textMediumRegularGT: {
    fontSize: size.medium,
    fontWeight: 'normal',
    fontFamily: type.reduxsagaRegular,
    opacity: 0.6
  },
  textMediumLightGT: {
    fontSize: size.medium,
    fontWeight: 'normal',
    fontFamily: type.reduxsagaMedium,
    opacity: 0.6
  },
  textSmallBoldGT: {
    fontSize: size.small,
    fontWeight: 'bold',
    fontFamily: type.reduxsagaBold,
  },
  textSmallGT: {
    fontSize: size.small,
    fontWeight: 'normal',
    fontFamily: type.reduxsagaRegular,
    opacity: 0.4
  },
  textSmallNormalGT: {
    fontSize: size.small,
    fontWeight: 'normal',
    fontFamily: type.reduxsagaRegular,
    opacity: 0.6
  },
  h5TextRegular: {
    fontSize: size.h5,
    fontWeight: '300',
    fontFamily: type.reduxsagaRegular,
  },
  h5TextBold: {
    fontSize: size.h5,
    fontWeight: '500',
    fontFamily: type.reduxsagaBold,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
