import React, { Component, createRef } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Colors, Fonts, DimensionManager } from '../Themes';
import TextField from './TextField';

class TextFieldAmount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mInt: this.defaultAmount(),
      mDecimal: this.defaultDecimal(),
    };
    this.mNumTextInput = createRef();
    this.mDecimalTextInput = createRef();
  }

  defaultAmount() {
    if (this.props.defaultValue && this.props.defaultValue.length > 0) {
      const mAmount = this.props.defaultValue.split('.');
      if (mAmount && mAmount[0]) {
        return mAmount[0] ? mAmount[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '';
      }
    }
  }

  defaultDecimal() {
    if (this.props.defaultValue && this.props.defaultValue.length > 0) {
      const mAmount = ('' + this.props.defaultValue).split('.');
      if (mAmount && mAmount[1]) {
        if (mAmount[1].length > 2) {
          const str = mAmount[1] = '.' + mAmount[1].substring(0, 2);
          return str;
        } else {
          return '.' + mAmount[1];
        }
      }
      return '.00';
    }
  }


  //format "1234567" to "1,234,567"
  formatAmount(num) {
    var num = '' + num;
    var inputa = 0;
    if (num.indexOf('.') !== -1) {

      // move foucus to Decimal TextField
      this.mNumTextInput.current.blur();
      this.mDecimalTextInput.current.focus();

      //make the Decimal TextField Started with "."
      if (!this.state.mDecimal || this.state.mDecimal === '.00') {
        this.setState({
          mDecimal: '.'
        });
      }
    }
    // index is changeed, delete the  old "," then reAdd
    num = num.replace(/[^0-9]/g, '');
    this.setState({
      mInt: (num || '').toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),//.replace(/^0+/, '')
    });

    if (this.state.mDecima) {
      inputa = num + '' + this.state.mDecimal;
    } else {
      inputa = num;
    }

    this.props.onChangeText(inputa);
  }

  onDecimalInput(decimal) {
    if (decimal.length > 0) {
      if (decimal.length > 3) {//keep 2  decimals
        return;
      }
      this.setState({
        mDecimal: decimal
      });
      var inputa = this.state.mInt.replace(',', '') + decimal;
      this.props.onChangeText(inputa);
    } else {//when user clear the input,  show defaultValue ".00" and move the focus back to Integer TextFiled
      this.setState({
        mDecimal: '.00'
      });
      var inputa = this.state.mInt.replace(',', '') + '.00';
      this.props.onChangeText(inputa);
      this.mDecimalTextInput.current.blur();
      this.mNumTextInput.current.focus();
    }

  }

  render() {
    const { mInt, mDecimal } = this.state;
    return (
      <View style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: DimensionManager.verticalScale(12),
          marginBottom: DimensionManager.verticalScale(12),
        }, this.props.style]}>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          fontSize: DimensionManager.verticalScale(16),
        }, this.props.style, this.props.symbolStyle]}>
          {this.props.amountType}
        </Text>
        <TextField
          autoFocus={true}
          ref={this.mNumTextInput}
          style={[Fonts.style.inputBoldGT, {
            color: Colors.reduxsagaBlack,
            textAlign: 'center',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            lineHeight: DimensionManager.verticalScale(58),//Do not delete otherwise three texts cannot be top aligned
            fontSize: DimensionManager.verticalScale(54),
          }, this.props.style, this.props.IntegerStyle]}
          enablesReturnKeyAutomatically={true}
          secureTextEntry={false}
          autoCorrect={false}
          value={mInt || ''}
          keyboardType={'number-pad'}
          onChangeText={(data) => {
            this.formatAmount(data);
          }}
          onBlur={() => {
            this.props.onBlur;
          }}
        />
        <TextField
          ref={this.mDecimalTextInput}
          style={[Fonts.style.textMediumGT, {
            color: Colors.reduxsagaBlack,
            textAlign: 'right',
            fontWeight: '500',
            alignSelf: 'flex-start',
            fontSize: DimensionManager.verticalScale(16),
          }, this.props.style, this.props.decimalStyle]}
          value={mDecimal}
          keyboardType={'number-pad'}
          onChangeText={(data) => {
            this.onDecimalInput(data);
          }}
          onBlur={() => {
            this.props.onBlur;
          }}
        />

      </View>
    );
  }
}

module.exports = TextFieldAmount;
