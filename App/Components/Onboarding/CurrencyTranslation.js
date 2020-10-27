import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { DimensionManager, Colors, Fonts } from '../../Themes';

class CurrencyTranslation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.showModal || false,
      // TODO get this data from props
      type: 'on the way',
      currency: 'BTC',
      currencyName: 'Bitcoin',
      currencyValue: 6.25
    };
  }
  onClickCancel = () => {
    this.setState(preState => ({ visible: false }));
  };
  closeModalView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: DimensionManager.verticalScale(20),
          marginRight: DimensionManager.scale(20),
          marginBottom: DimensionManager.verticalScale(10)
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
  onPress = () => {
    this.setState(preState => ({ visible: false }));
  };
  renderButton = () => {
    return (
      <View
        style={{
          marginHorizontal: DimensionManager.scale(20),
          marginTop: DimensionManager.verticalScale(25)
        }}
      >
        <TouchableOpacity style={styles.footerButton} onPress={this.onPress}>
          <Text style={styles.footerButtonLabel}>Go to wallet</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // TODO add date variable
  renderTransferInfo = () => {
    const { currency, currencyName, currencyValue } = this.state;
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
          It’s on the way!
        </Text>
        <Image
          source={require('../Dashboard/Images/bitcoin-on.png')}
          style={{
            height: DimensionManager.verticalScale(36),
            width: DimensionManager.scale(36),
            resizeMode: 'contain',
            marginTop: DimensionManager.verticalScale(7),
            marginBottom: DimensionManager.verticalScale(13)
          }}
        />
        <Text
          style={{
            width: DimensionManager.scale(234),
            ...Fonts.style.textRegularNormalGT,
            fontSize: 18,
            fontWeight: 'normal',
            lineHeight: 1.44 * 18,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center'
          }}
        >
          Your {currencyName} transaction is pending. You should be receiving your assets within 24
          hours.
        </Text>
        <Text
          style={{
            width: DimensionManager.scale(220),
            ...Fonts.style.textRegularNormalGT,
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 1.5 * 14,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(36)
          }}
        >
          You have transferred{' '}
          <Text style={{ fontWeight: 'bold', color: Colors.reduxsagaBlack }}>
            {currencyValue} {currency}
          </Text>{' '}
          from your external wallet to your reduxsaga wallet at 6:14 pm PST on November 16th, 2018.
        </Text>
      </View>
    );
  };
  renderOnTheWay = () => {
    return (
      <View style={styles.content}>
        {this.closeModalView()}
        {this.renderTransferInfo()}
        {this.renderButton()}
      </View>
    );
  };
  renderItsHereInfo = () => {
    const { currency, currencyName, currencyValue } = this.state;
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
          It’s here!
        </Text>
        <Image
          source={require('../Dashboard/Images/bitcoin-on.png')}
          style={{
            height: DimensionManager.verticalScale(36),
            width: DimensionManager.scale(36),
            resizeMode: 'contain',
            marginTop: DimensionManager.verticalScale(7),
            marginBottom: DimensionManager.verticalScale(13)
          }}
        />
        <Text
          style={{
            width: DimensionManager.scale(234),
            ...Fonts.style.textRegularNormalGT,
            fontSize: 18,
            fontWeight: 'normal',
            lineHeight: 1.44 * 18,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center'
          }}
        >
          Your {currencyName} transaction has been completed and is now available as collateral in
          your reduxsaga wallet.
        </Text>
        <Text
          style={{
            width: DimensionManager.scale(220),
            ...Fonts.style.textRegularNormalGT,
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 1.5 * 14,
            color: Colors.reduxsagaDarkGray,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(36)
          }}
        >
          You have transferred{' '}
          <Text style={{ fontWeight: 'bold', color: Colors.reduxsagaBlack }}>
            {currencyValue} {currency}
          </Text>{' '}
          from your external wallet to your reduxsaga wallet at 6:14 pm PST on November 16th, 2018.
        </Text>
      </View>
    );
  };
  renderOnHere = () => {
    return (
      <View style={styles.content}>
        {this.closeModalView()}
        {this.renderItsHereInfo()}
        {this.renderButton()}
      </View>
    );
  };

  render() {
    const { visible, type } = this.state;
    return (
      <View>
        <Modal isVisible={visible}>
          {type === 'on the way' ? this.renderOnTheWay() : this.renderOnHere()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: DimensionManager.verticalScale(487),
    backgroundColor: Colors.transparent
  },
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
  }
});

export default CurrencyTranslation;
