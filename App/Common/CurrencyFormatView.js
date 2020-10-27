import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Fonts from '../Themes/Fonts';
import Colors from '../Themes/Colors';
import { getSeparationOfFormatCurrency } from '../Utils/CurrencyUtils';

// TODO fix the Android's style
// https://github.com/facebook/react-native/issues/20666
// https://snack.expo.io/rJBu_p9jX
class CurrencyFormatView extends Component {
  static propTypes = {
    currencySymbol: PropTypes.string,
    currencyValue: PropTypes.number,
    precision: PropTypes.number,
    currencyStyle: PropTypes.object, // ===styles
    symbolPosition: PropTypes.oneOf(['front', 'after']),
    /*
    * type ===full --->1000.11
    * ====slice-->1000 .11
    * */
    type: PropTypes.oneOf(['slice', 'full'])
  };
  static defaultProps = {
    currencySymbol: '$',
    currencyValue: 0,
    precision: 2,
    currencyStyle: {},
    symbolPosition: 'front', // after
    type: 'slice' // full,slice-->1000, .11 full-->1000.11
  };
  constructor(props) {
    super(props);
  }

  currencySymbol = val => {
    const { currencyStyle } = this.props;
    return (
      <View style={[styles.currencyContentSymbolView, currencyStyle.currencyContentSymbolView]}>
        <Text
          style={[
            styles.currencyContentText,
            styles.currencyContentSymbolText,
            currencyStyle.currencyContentText,
            currencyStyle.currencyContentSymbolText
          ]}
        >
          {val}
        </Text>
      </View>
    );
  };
  currencyIntegerView = val => {
    const { currencyStyle } = this.props;
    return (
      <View
        style={[styles.currencyContentIntView, currencyStyle.currencyContentIntView]}
        key={'int'}
      >
        <Text
          style={[
            styles.currencyContentText,
            styles.currencyContentIntText,
            currencyStyle.currencyContentText,
            currencyStyle.currencyContentIntText
          ]}
        >
          {val}
        </Text>
      </View>
    );
  };
  currencyDecimalView = val => {
    const { currencyStyle } = this.props;
    return (
      <View
        style={[styles.currencyContentDecimalView, currencyStyle.currencyContentDecimalView]}
        key={'decimal'}
      >
        <Text
          style={[
            styles.currencyContentText,
            styles.currencyContentDecimalText,
            currencyStyle.currencyContentText,
            currencyStyle.currencyContentDecimalText
          ]}
        >
          {val}
        </Text>
      </View>
    );
  };

  currencyFullView = val => {
    const { currencyStyle } = this.props;
    return (
      <View style={[styles.currencyContentFullView, currencyStyle.currencyContentFullView]}>
        <Text
          style={[
            styles.currencyContentText,
            styles.currencyContentFullText,
            currencyStyle.currencyContentText,
            currencyStyle.currencyContentFullText
          ]}
        >
          {val}
        </Text>
      </View>
    );
  };

  currencyView = () => {
    // console.log('%c CurrencyFormat', 'color:red', this.props);
    const {
      symbolPosition,
      currencyValue,
      precision,
      currencySymbol,
      currencyStyle,
      type
    } = this.props;
    const { unit, currencyInteger, currencyDecimalAndPoint } = getSeparationOfFormatCurrency({
      val: currencyValue,
      precision,
      currencySymbol
    });
    const symbolFrontPage = symbolPosition === 'front' ? this.currencySymbol(unit) : null;
    const symbolAfterPage = symbolPosition === 'after' ? this.currencySymbol(unit) : null;
    const page =
      type === 'slice'
        ? [
            this.currencyIntegerView(currencyInteger),
            this.currencyDecimalView(currencyDecimalAndPoint)
          ]
        : this.currencyFullView(currencyInteger + currencyDecimalAndPoint);

    return (
      <View style={[styles.currencyContent, currencyStyle.currencyContent]}>
        {symbolFrontPage}
        {page}
        {symbolAfterPage}
      </View>
    );
  };
  render() {
    return <View>{this.currencyView()}</View>;
  }
}
const styles = StyleSheet.create({
  currencyContent: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  currencyContentText: {
    ...Fonts.style.largeTextBold,
    color: Colors.transparent
  },
  currencyContentIntView: {},
  currencyContentIntText: {},
  currencyContentDecimalView: {},
  currencyContentDecimalText: {
    fontSize: Fonts.size.medium
  },
  currencyContentSymbolView: {},
  currencyContentSymbolText: {},
  currencyContentFullView: {},
  currencyContentFullText: {}
});
export default CurrencyFormatView;
