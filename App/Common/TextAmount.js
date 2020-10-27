import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Colors, Fonts, DimensionManager } from '../Themes';
import {
  withNavigation
} from 'react-navigation';

class TextAmount extends Component {

  //format "1234567" to "1,234,567"
  formatAmount(str) {
    var str = '' + str;//number to char
    var newStr = '';
    var count = 0;

    if (str.indexOf('.') === -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 === 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      //str = newStr + ".00";//if need the decimal
      str = newStr;
    }
    return str;
  }

  formatDecimal(str) {
    if (str.length > 2) {
      str = str.substring(0, 2);
    }
    return str;
  }

  render() {
    const mAmont = this.props.amount && ('' + this.props.amount).split('.');
    const mInt = mAmont[0] ? this.formatAmount(mAmont[0]) : '0';
    const mDecimal = mAmont[1] ? this.formatDecimal(mAmont[1]) : '00';
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
          fontSize: DimensionManager.scale(18),
        }, this.props.style, this.props.symbolStyle]}>
          {this.props.amountType}
        </Text>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'center',
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          lineHeight: DimensionManager.scale(54),//Do not delete otherwise three texts cannot be top aligned
          fontSize: DimensionManager.scale(54),
        }, this.props.style, this.props.IntegerStyle]}>
          {mInt ? mInt : '000'}
        </Text>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'right',
          fontWeight: '500',
          alignSelf: 'flex-start',
          fontSize: DimensionManager.scale(18),
        }, this.props.style, this.props.decimalStyle]}>
          .{mDecimal ? mDecimal : '00'}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TextAmount));
