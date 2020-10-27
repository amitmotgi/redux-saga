import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import I18n from '../../I18n';
import { DimensionManager, Colors, Fonts } from '../../Themes';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import TextFieldAmount from '../../Common/TextFieldAmount.js';
import DashboardMessageView from '../Dashboard/DashboardMessageView.js';
import WithdrawActions from '../../Redux/Withdraw';
import PaymentActions from '../../Redux/Payment';

class WithdrawTransferView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      minAmount: '7,500',
      amountType: '$',
      amount: '',
      isbuttonActive: false,
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

  renderDashboard() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    if (this.props.withdraw.withDrawComplete) {
      navigation.navigate('Dashboard');
      dispatch(WithdrawActions.withDrawUpdate({
        withDrawComplete: false
      }));
    }
  }

  renderCards = () => {
    const { onboarding } = this.props;
    const { debitCard = {} } = onboarding;

    const { payment } = this.props;
    const lastFourDigits = payment.last_four_digits || '';

    this.renderDashboard();

    const getAmount = (
      <View style={{
        width: '100%',
        height: DimensionManager.verticalScale(185),
        backgroundColor: '#ebf3ff',
        alignItems: 'center',
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          marginTop: DimensionManager.verticalScale(37),
          color: Colors.reduxsagaDarkBlue,
          textAlign: 'center',
          fontSize: DimensionManager.verticalScale(16),
          fontWeight: '500',
        }]}>
          {I18n.t('withDraw')}
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
        <Text style={[Fonts.style.textMediumGT, {
          marginTop: DimensionManager.verticalScale(-6),
          color: Colors.reduxsagaLightBlue,
          fontSize: DimensionManager.scale(16),
          textAlign: 'center',
          fontWeight: '500',
        }]}>
          {this.state.amountType}{this.state.minAmount} {I18n.t('limit')}
        </Text>
      </View>
    );

    const getDebitCard = (
      <View>
        {/* <TouchableOpacity style={{
        }}
          onPress={() => {
            this.props.navigation.navigate('ChooseAccount');
          }}
        > */}
        {lastFourDigits ? this.renderLine() : null}
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
            //this.props.navigation.navigate('ScanCard', { type: 'add' });
            // debitCard.cardNumber ? this.props.navigation.navigate('ChooseAccount') :
            //   this.props.navigation.navigate('ScanCard', { type: 'add' });
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
          label={I18n.t('sendToCard')}
          onPress={() => {
            const { navigation } = this.props;
            const { dispatch } = navigation;

            dispatch(WithdrawActions.withDrawUpdate({
              withDrawalAmount: parseFloat(this.state.amount)
            }));

            dispatch(WithdrawActions.withDrawPayment({
              uuid: this.props.user.uuid,
              jToken: this.props.user.jToken,
              payload: {
                notes: "Withdrawal",
                amount: parseFloat(this.state.amount) || 0,
                withdraw_to: {
                  currency: 'USD',
                  ref_id: this.props.payment.id || '',
                  transfer_method: 'reduxsaga'
                }
              }
            }));

            // TODO - If no cards are added, then user scans the card
            //this.props.navigation.navigate('ScanCard');

            this.props.navigation.navigate('WithDrawalResponse', {
              type: '1', cardNumber: this.state.cardNumber,
              onPress: () => {
                // Your onPress
              }
            });

          }} />
      </View>
    );

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {getAmount}
          {this.renderLine()}
          <Text style={[Fonts.style.textBoldGT, {
            marginTop: DimensionManager.verticalScale(18),
            marginBottom: DimensionManager.verticalScale(17),
            marginLeft: DimensionManager.scale(20),
            color: Colors.reduxsagaDarkGray,
            textAlign: 'left',
            alignContent: 'center',
            fontWeight: '500',
            fontSize: DimensionManager.scale(12),
            opacity: 1
          }]}>
            {I18n.t('transferToAccount')}
          </Text>
          {getDebitCard}
          {lastFourDigits ? null : addDebitCard}
          {previewButton}
        </View>
      </ScrollView>
    );
  }

  render() {

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
          title={I18n.t('withdrawTransfer')} />
        <DashboardMessageView visable='true' type='8' amount={this.state.amountType + '' + this.state.amount} />
        {this.renderCards()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  preview: {
    height: DimensionManager.verticalScale(248),
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WithdrawTransferView));
