import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import i18n from '../I18n';
import { FormattedCurrency } from 'react-native-globalize';

class CurrencyView extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const {
      size,
      currencyType,
      currencyValue,
      style,
      minimumFractionDigits
    } = this.props;

    let fontSizeObj = size === 'medium' ?
      Fonts.style.h1BoldGT : Fonts.style.h5TextBold;

    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <FormattedCurrency
            minimumFractionDigits={minimumFractionDigits}
            numberStyle={'symbol'}
            value={currencyValue}
            useGrouping={true}
            style={[fontSizeObj, style]}
            currency={currencyType} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.h1BoldGT,
    color: Colors.transparent,
    textAlign: 'center'
  }
});

export default withNavigation(CurrencyView);
