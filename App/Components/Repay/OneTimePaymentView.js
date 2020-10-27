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
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { Switch } from 'react-native-switch';
import TextFieldAmount from '../../Common/TextFieldAmount.js';
import RepayActions from '../../Redux/Repay';
import PaymentActions from '../../Redux/Payment';

class OneTimePaymentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      autoPaySwitch: false,
      amount: 0,
      isbuttonActive: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.setState(preState => ({
      isbuttonActive: preState.amount.length > 3 ? true : false,
    }));

    dispatch(PaymentActions.paymentGetCards({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken,
    }));

    dispatch(PaymentActions.paymentGetKey({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken,
    }));

  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        opacity: 0.2
      }}
      />
    );
  }

  renderBankInfo() {
    const { onboarding } = this.props;
    const { debitCard = {} } = onboarding;
    const { payment } = this.props;
    const lastFourDigits = payment.last_four_digits || '';

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(14),
          marginBottom: DimensionManager.verticalScale(15),
        }}>
          <Text style={[Fonts.style.textMediumGT, {
            color: Colors.reduxsagaBlack,
            textAlign: 'left',
            fontWeight: '500',
            opacity: 0.5
          }]}>
            {I18n.t('mastercardDebit')}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={[Fonts.style.textBoldNormalGT, {
            marginRight: DimensionManager.scale(12),
            color: Colors.reduxsagaBlack,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: DimensionManager.scale(16),
          }]}>
            ···
          </Text>
          <Text style={[Fonts.style.textBoldNormalGT, {
            color: Colors.reduxsagaBlack,
            alignSelf: 'center',
            fontWeight: '500',
            fontSize: DimensionManager.scale(14),
          }]}>
            {lastFourDigits}
          </Text>
        </View>
      </View>
    );
  }

  renderLoanBalance() {
    return (
      <View style={styles.loanBalance}>
        <View style={{
          width: '100%',
          alignItems: 'center',
          height: DimensionManager.verticalScale(200),
          backgroundColor: '#ebf3ff',
          marginBottom: DimensionManager.verticalScale(26)
        }}>
          <Text style={[Fonts.style.textMediumGT, {
            marginTop: DimensionManager.verticalScale(37),
            color: Colors.reduxsagaDarkBlue,
            textAlign: 'center',
            fontSize: DimensionManager.verticalScale(16),
            fontWeight: '500',
          }]}>
            Payment amount
          </Text>

          <TextFieldAmount
            defaultValue={this.state.amount}
            amountType={'$'}
            style={{ color: Colors.reduxsagaDarkBlue }}
            onChangeText={(data) => {
              console.log('U input amount value is: ' + data + '');
              this.setState({
                amount: data,
                isbuttonActive: data.length > 3 ? true : false,
              });
            }} />

            <Text style={[styles.loanHeadText, {
              fontSize: DimensionManager.scale(14),
              fontWeight: '500',
              color: '#6e94ee',
              fontStyle: 'normal',
              textAlign: 'center',
              lineHeight: DimensionManager.verticalScale(18),
              marginTop: DimensionManager.verticalScale(18),
              marginLeft: DimensionManager.scale(97.5),
              marginRight: DimensionManager.scale(95.5)
            }]}>
              Payment applied to $ in fees & interest first
            </Text>
          </View>
      </View>
    );
  }

  renderStatus() {
    const { repay = {}} = this.props;

    if (repay.repaySuccess) {
      this.props.navigation.navigate('RepaySuccess');
    } else {
      //this.props.navigation.navigate('RepayFailed');
    }

  }

  render() {
    const { navigation, onboarding } = this.props;
    const { dispatch } = navigation;
    const { debitCard = {} } = onboarding;
    const { payment = {}} = this.props;
    const lastFourDigits = payment.last_four_digits || '';

    this.renderStatus();

    const getDebitCard = (
      <View>
        {/* <TouchableOpacity style={{
        }}
          onPress={() => {
            this.props.navigation.navigate('ChooseAccount');
          }}
        > */}
        {lastFourDigits ? this.renderBankInfo() : null}

        {/* </TouchableOpacity> */}
      </View>
    );

    const addDebitCard = (
      <View>
        {this.renderLine()}
        <TouchableOpacity
          onPress={() => {


            this.props.navigation.navigate('ScanCard');
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.verticalScale(16),
            marginBottom: DimensionManager.verticalScale(16),
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaDarkBlue,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
            }]}>
              {I18n.t('addDebitCard')}
              {/*debitCard.cardNumber ? I18n.t('changeDebitCard') : I18n.t('addDebitCard')*/}
            </Text>
            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Components/Images/arrow.png')}
                style={{
                  height: DimensionManager.verticalScale(16),
                  width: DimensionManager.scale(8),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {this.renderLine()}
      </View>
    );

    const previewButton = (
      <View style={{
        backgroundColor: Colors.transparent
      }}>
        <TouchableOpacityView
          style={{
            width: DimensionManager.scale(335),
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(45),
            marginBottom: DimensionManager.verticalScale(20),
          }}
          active={this.state.amount > 0}
          label={'Make a payment'}
          onPress={() => {
            const { navigation } = this.props;
            const { dispatch } = navigation;

            dispatch(RepayActions.repayUpdate({
              repaymentAmount: parseFloat(this.state.amount)
            }));

            dispatch(RepayActions.repayPayment({
              uuid: this.props.user.uuid,
              jToken: this.props.user.jToken,
              payload: {
                notes: "Repayment",
                amount: parseFloat(this.state.amount) || 0,
                repay_from: {
                  currency: 'USD',
                  ref_id:  this.props.payment.id || '',
                  transfer_method: 'reduxsaga'
                }
              }
            }));

            // this.props.navigation.navigate('PaymentConfirmation');

            // this.props.navigation.navigate('WithDrawalResponse', {
            //   type: '1', cardNumber: this.state.cardNumber,
            //   onPress: () => {
            //     // Your onPress
            //   }
            // });

          }} />
      </View>
    );

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={this.state.context === 'BURGER'}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('oneTimePayment')} />
          {this.renderLoanBalance()}

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          >
            {this.renderLine()}

            <Text style={[Fonts.style.textBoldGT, {
              marginTop: DimensionManager.verticalScale(20.9),
              marginBottom: DimensionManager.verticalScale(14.5),
              marginLeft: DimensionManager.scale(20),
              color: '#9ca5b5',
              textAlign: 'left',
              alignContent: 'center',
              fontWeight: 'bold',
              fontSize: DimensionManager.scale(12),
              letterSpacing: DimensionManager.scale(1)
            }]}>
              PAYMENT METHOD
            </Text>
            {this.renderLine()}

            {getDebitCard}
            {addDebitCard}
            {previewButton}

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
    height: DimensionManager.verticalScale(200),
    backgroundColor: '#ebf3ff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loanHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaDarkBlue,
    marginTop: DimensionManager.verticalScale(-14),
  },
  loanContentView: {
    marginTop: DimensionManager.verticalScale(37),
    //marginBottom: DimensionManager.verticalScale(18),
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(OneTimePaymentView));
