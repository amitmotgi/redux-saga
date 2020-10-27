import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import DimensionManager from '../../Themes/DimensionManager';
import { PageStyleConfig } from '../../Config/PageStyleConfig';
import { withNavigation, SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SendCoinsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      recipientFocus: false,
      amount: 0,
      amountFocus: false,
      usdAmount: 0,
      usdAmountFocus: false,
      ...this.transformPropsData(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.transformPropsData(nextProps)
    });
  }

  transformPropsData = props => {
    const { navigation = {} } = props;
    const { state = {} } = navigation;
    const { params = {} } = state;
    const { currency, currencyName } = params;
    return { currencyName, currency };
  };

  sendCoinsOnPress = () => {
    console.log('send coins');
  };

  focusColor = typeBool => {
    return typeBool
      ? {
          color: Colors.reduxsagaDarkBlue,
          borderColor: Colors.reduxsagaDarkBlue
        }
      : {
          color: Colors.reduxsagaSkyLightGray,
          borderColor: Colors.reduxsagaSkyLightGray
        };
  };

  renderAmount = ({ value, title, focusType, focusBool, onFocus, onBlur, onChangeText }) => {
    return (
      <View style={{ width: DimensionManager.scale(157) }}>
        <Text
          style={{
            ...Fonts.style.textRegularNormalGT,
            opacity: 1,
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: 12,
            color: this.focusColor(focusBool).color
          }}
        >
          {title}
        </Text>
        <TextInput
          style={{
            marginTop: DimensionManager.verticalScale(10),
            ...Fonts.style.textBoldGT,
            borderBottomWidth: 1,
            borderColor: this.focusColor(focusBool).borderColor,
            width: '100%',
            fontSize: 18,
            fontWeight: '500',
            opacity: 1,
            color: this.focusColor(focusBool).color
          }}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />
      </View>
    );
  };

  renderRecipient = () => {
    const {
      currency,
      recipient,
      recipientFocus,
      amount,
      amountFocus,
      usdAmount,
      usdAmountFocus
    } = this.state;
    return (
      <View style={{ marginTop: DimensionManager.verticalScale(50) }}>
        <Text
          style={{
            ...Fonts.style.textRegularNormalGT,
            opacity: 1,
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: 12,
            color: this.focusColor(recipientFocus).color
          }}
        >
          RECIPIENT
        </Text>
        <TextInput
          style={{
            marginTop: DimensionManager.verticalScale(10),
            ...Fonts.style.textBoldGT,
            borderBottomWidth: 1,
            borderColor: this.focusColor(recipientFocus).borderColor,
            width: '100%',
            fontSize: DimensionManager.scale(14),
            fontWeight: '500',
            opacity: 1,
            color: this.focusColor(recipientFocus).color
          }}
          value={recipient}
          onFocus={() => {
            this.setState({ recipientFocus: true });
          }}
          onBlur={() => {
            this.setState({ recipientFocus: false });
          }}
          onChangeText={text => {
            this.setState({ recipient: text });
          }}
        />
        <View
          style={{
            marginTop: DimensionManager.verticalScale(35),
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {this.renderAmount({
            value: amount,
            title: `${currency} AMOUNT`,
            focusType: 'amountFocus',
            focusBool: amountFocus,
            onFocus: () => this.setState({ amountFocus: true, usdAmountFocus: true }),
            onBlur: () => this.setState({ amountFocus: false, usdAmountFocus: false }),
            onChangeText: text => this.setState({ amount: text })
          })}
          {this.renderAmount({
            value: usdAmount,
            title: 'USD AMOUNT',
            focusType: 'usdAmountFocus',
            focusBool: usdAmountFocus,
            onFocus: () => this.setState({ usdAmountFocus: true }),
            onBlur: () => this.setState({ usdAmountFocus: false }),
            onChangeText: text => this.setState({ usdAmount: text })
          })}
        </View>
      </View>
    );
  };

  renderSendCoinsInfo = () => {
    const { currencyName } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
        }}
      >
        <View style={{ marginTop: DimensionManager.verticalScale(32) }}>
          <Text
            style={{
              ...Fonts.style.textRegularNormalGT,
              opacity: 1,
              fontWeight: 'normal',
              lineHeight: 1.59 * 17,
              fontSize: 17,
              color: Colors.reduxsagaBlack
            }}
          >
            Send {currencyName} to an external wallet from your reduxsaga wallet
          </Text>
          {this.renderRecipient()}
        </View>
        <TouchableOpacity style={styles.button} onPress={this.sendCoinsOnPress}>
          <Text style={styles.buttonLabel}>Send coins</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={'Send coins'}
          hideStep
          hideMenu={false}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(20)}
        >
          {this.renderSendCoinsInfo()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  button: {
    marginTop: DimensionManager.verticalScale(102),
    height: DimensionManager.verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  buttonLabel: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.transparent,
    textAlign: 'center',
    fontSize: 18
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SendCoinsView));
