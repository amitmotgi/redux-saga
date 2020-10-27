import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView,
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { Switch } from 'react-native-switch';

class PaymentConfirmationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoPaySwitch: false
    };
  }

  renderHeader() {
    return (
      <View style={styles.loanBalance}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: DimensionManager.scale(35),
          marginRight: DimensionManager.scale(34)
        }}>
          <Text style={[Fonts.style.textMediumGT,{
            textAlign: 'center',
            fontSize: DimensionManager.scale(36),
            color: Colors.transparent,
            fontWeight: '500',
            marginTop: DimensionManager.verticalScale(-15)
          }]}>
            {I18n.t('congrats')}
          </Text>

          <Text style={[Fonts.style.textMediumGT,{
            textAlign: 'center',
            fontSize: DimensionManager.scale(24),
            color: Colors.transparent,
            fontWeight: '500',
            marginTop: DimensionManager.verticalScale(12)
          }]}>
            {I18n.t('youJustCompletedOTP')}
          </Text>
        </View>
      </View>
    );
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        opacity: 0.2
      }} />
    )
  }

  renderPaymentHistory(type, value, color, underline) {
    return (
      <View style={{
        height: DimensionManager.verticalScale(47),
        backgroundColor: color
      }}>
        <View style={{
          flexDirection: 'row',
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(15),
            marginBottom: DimensionManager.verticalScale(11)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: '#787e8b',
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              {type}
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            justifyContent: 'center',
            marginTop: DimensionManager.verticalScale(15),
            marginBottom: DimensionManager.verticalScale(11)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: '#0a0f13',
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
            }]}>
              {value}
            </Text>
          </View>
        </View>
        {underline ? this.renderLine() : null}
      </View>
    );
  }

  renderReminder() {
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          color: '#caced7',
          textAlign: 'center',
          fontWeight: '500',
          fontSize: DimensionManager.scale(12),
          width: DimensionManager.scale(204),
          marginTop: DimensionManager.verticalScale(21.9)
        }]}>
          Your transaction will be debited within three business days
        </Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={'Finish up'} />

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          >
            {this.renderPaymentHistory('Payment amount', '$665.0', Colors.transparent, false)}
            {this.renderPaymentHistory('Payment method', 'Chase **** *** 3602', '#f4f8ff', false)}
            {this.renderPaymentHistory('Payment status', 'PENDING', Colors.transparent, false)}
            {this.renderPaymentHistory('Balance left', '$78,752.43', '#f4f8ff', false)}
            {this.renderPaymentHistory('Payoff time left', '35 months', Colors.transparent, false)}
            {this.renderPaymentHistory('Payments made to-date', '35', '#f4f8ff', false)}
            {this.renderPaymentHistory('Interest', '1', Colors.transparent, false)}
            {this.renderPaymentHistory('Fees', '$3.42', '#f4f8ff', false)}
            {this.renderPaymentHistory('Principal', '$78,752.43', Colors.transparent, true)}

            {this.renderReminder()}
            <View style={{
              backgroundColor: Colors.transparent
            }}>
              <TouchableOpacityView
                style={{
                  width: DimensionManager.scale(335),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(117),
                  marginBottom: DimensionManager.verticalScale(20),
                }}
                active={true}
                label={I18n.t('Complete one-time payment')}
                onPress={() => {
                  //this.props.navigation.navigate('ChooseAccount');
                }} />
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  loanBalance: {
    height: DimensionManager.verticalScale(127),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loanHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginTop: DimensionManager.verticalScale(-14),

  },
  loanContentView: {
    marginTop: DimensionManager.verticalScale(5),
    marginBottom: DimensionManager.verticalScale(18),
  },
  loanFooterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loanFooterTitle: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginRight: DimensionManager.scale(7)
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PaymentConfirmationView));
