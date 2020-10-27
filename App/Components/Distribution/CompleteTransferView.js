import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import Colors from '../../Themes/Colors';
import DimensionManager from '../../Themes/DimensionManager';
import Fonts from '../../Themes/Fonts';
import CurrencyFormatView from '../../Common/CurrencyFormatView';

class CompleteTransferView extends Component {
  constructor(props) {
    super(props);
  }
  onPress = () => {
    const { onCancel } = this.props;
    onCancel();
  };
  onClickCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };
  closeModalView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: DimensionManager.verticalScale(20),
          marginRight: DimensionManager.scale(20),
          marginBottom: DimensionManager.verticalScale(20)
        }}
      >
        <TouchableOpacity onPress={this.onClickCancel}>
          <Image
            style={styles.closeImg}
            source={require('../Dashboard/Images/x-close-modal.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderButton = () => {
    return (
      <View style={{ marginHorizontal: DimensionManager.scale(20) }}>
        <TouchableOpacity style={styles.footerButton} onPress={this.onPress}>
          <Text style={styles.footerButtonLabel}>Complete transfer</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTransferInfo = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            ...Fonts.style.h5TextBold,
            fontSize: 28,
            lineHeight: 1.57 * 28,
            color: Colors.reduxsagaDarkBlue,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Just to be clear
        </Text>
        <Text
          style={{
            ...Fonts.style.textRegularNormalGT,
            opacity: 1,
            fontSize: 18,
            lineHeight: 1.44 * 18,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center',
            marginBottom: DimensionManager.verticalScale(8)
          }}
        >
          We are withdrawing
        </Text>
        <CurrencyFormatView
          currencyValue={10000.0}
          currencyStyle={{
            currencyContent: {
              alignItems: 'flex-start'
            },
            currencyContentSymbolView: { marginRight: DimensionManager.scale(3) },
            currencyContentText: {
              fontSize: 12,
              lineHeight: 12,
              color: Colors.reduxsagaBlack,
              fontWeight: 'bold'
            },
            currencyContentIntText: { fontSize: 26, lineHeight: 26, fontWeight: 'bold' }
          }}
        />
        <Text
          style={{
            width: DimensionManager.scale(207),
            ...Fonts.style.textRegularNormalGT,
            opacity: 1,
            fontWeight: 'normal',
            fontSize: 18,
            lineHeight: 1.44 * 18,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(6)
          }}
        >
          from your reduxsagait line and transfering it to your Chase checking account
        </Text>
        <Text style={styles.commonText}>After this transaction you will have</Text>
        <Text style={[styles.commonText, { marginTop: 0 }]}>
          <Text style={[{ color: Colors.reduxsagaBlack }]}>$65,000</Text> available in your reduxsagait line
        </Text>
        <Text
          style={[
            styles.commonText,
            {
              marginTop: DimensionManager.verticalScale(15),
              marginBottom: DimensionManager.verticalScale(20)
            }
          ]}
        >
          You should be receiving your funds within the next two hours
        </Text>
      </View>
    );
  };
  renderContent = () => {
    return (
      <View
        style={{ height: DimensionManager.verticalScale(487), backgroundColor: Colors.transparent }}
      >
        {this.closeModalView()}
        {this.renderTransferInfo()}
        {this.renderButton()}
      </View>
    );
  };
  render() {
    return this.renderContent();
  }
}
const styles = StyleSheet.create({
  closeImg: {
    width: DimensionManager.scale(27),
    height: DimensionManager.scale(27),
    resizeMode: 'contain'
  },
  footerButton: {
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  footerButtonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  },
  commonText: {
    width: DimensionManager.scale(240),
    ...Fonts.style.textRegularNormalGT,
    opacity: 1,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 1.5 * 14,
    color: Colors.reduxsagaDarkGray,
    textAlign: 'center',
    marginTop: DimensionManager.verticalScale(34)
  }
});
export default CompleteTransferView;
