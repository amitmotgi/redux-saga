import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  View,
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
import { Dropdown } from 'react-native-material-dropdown';
import DistributionActions from '../../Redux/Distribution';
import WalletActions from '../../Redux/Wallet';
import Modal from 'react-native-modal';
import LoanActions from '../../Redux/Loan';
import TextFieldAmount from '../../Common/TextFieldAmount.js';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';

class StartCLOCView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.loan.locAmount || 0.00,
      amountType: 'USD',
      walletAddress: '',
      showPreview: false,
      selectBTC: false,
      selectETH: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    InteractionManager.runAfterInteractions(() => {
      // this runs on requestAnimationFrame
      // add long waiting synchro tasks here... if any
      if (Platform.OS === 'ios') {
        LayoutAnimation.easeInEaseOut();
      } else {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    });

    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
      symbol: 'BTC',
      convert: 'USD'
    }));

    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
      symbol: 'ETH',
      convert: 'USD'
    }));

    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
      symbol: 'LBA',
      convert: 'USD'
    }));

    dispatch(LoanActions.loanGetLtv({}));

  }

  renderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(22),
        marginLeft: DimensionManager.scale(3)
      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          letterSpacing: 0
        }}>
          {I18n.t('enterADollarAmountForYourLoan')}
        </Text>
      </View>
    )
  }

  renderAmount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    let data = [
      {
        value: 'USD',
      },
      {
        value: 'USDT',
      },
      {
        value: 'DAI',
      }
    ];
    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: DimensionManager.verticalScale(20)
      }}>
        <TextFieldAmount
          amountType={'$'}
          style={{ color: Colors.reduxsagaOffWhite }}
          onBlur={() => {
          // update the redux state
          dispatch(DistributionActions.distributionWithdrawalAmount({
            withdrawalAmount: parseFloat(this.state.amount),
            currencyType: this.state.amountType
          }));

          dispatch(LoanActions.loanUpdate({
            locAmount: parseFloat(this.state.amount),
            currencyType: this.state.amountType
          }));
        }}
        onChangeText={(data) => {
          this.setState({amount: data});
          dispatch(LoanActions.loanUpdate({
            locAmount: parseFloat(data),
            currencyType: this.state.amountType
          }));
        }} />
      </View>
    )
  }

  renderSelectCoins() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    var ImageBTC = this.state.selectBTC ? (
      require('./Images/bitcoin-on.png')
    ) : (
      require('./Images/bitcoin-off.png')
    );
    var ImageETH = this.state.selectETH ? (
      require('./Images/eth-on.png')
    ) : (
      require('./Images/eth-off.png')
    );

    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(27),
          alignSelf: 'center',
        }}>
          <TouchableOpacity onPress={() => {
            this.setState({selectBTC: true, selectETH: false});
            dispatch(DistributionActions.distributionUpdate({
              coin: 'BTC'
            }));
          }}>
            <Image
              style={{
                width: DimensionManager.scale(36),
                height: DimensionManager.verticalScale(36),
                resizeMode: 'contain',
                marginRight: DimensionManager.scale(44.2)
              }}
              source={ImageBTC} />
            <Text style={[styles.coinsLabel, {
              fontSize: DimensionManager.scale(15),
              textAlign: 'left',
              marginTop: DimensionManager.verticalScale(9.5),
              marginLeft: DimensionManager.scale(4),
              opacity: this.state.selectBTC ? 1 : 0.8
            }]}>
              BTC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({selectBTC: false, selectETH: true});
            dispatch(DistributionActions.distributionUpdate({
              coin: 'ETH'
            }));
          }}>
            <Image
              style={{
                width: DimensionManager.scale(36),
                height: DimensionManager.verticalScale(36),
                resizeMode: 'contain',
              }}
              source={ImageETH} />
              <Text style={[styles.coinsLabel, {
                fontSize: DimensionManager.scale(15),
                marginTop: DimensionManager.verticalScale(9.5),
                opacity: this.state.selectETH ? 1 : 0.8
              }]}>
                ETH
              </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  renderCryptosRequired() {
    var btc = (parseFloat(this.state.amount / this.props.loan.loanSettings.btc_ltv) /
      this.props.loan.BTC.price).toFixed(2);
    var eth = (parseFloat(this.state.amount / this.props.loan.loanSettings.eth_ltv) /
      this.props.loan.ETH.price).toFixed(2);

    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(54),
          marginTop: DimensionManager.verticalScale(9.5),
        }]}>
          {this.state.selectBTC ? btc : eth}
        </Text>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(12),
          marginTop: DimensionManager.verticalScale(2),
          lineHeight: DimensionManager.verticalScale(20),
          letterSpacing: DimensionManager.scale(1)
        }]}>
          APPROXIMATE {this.state.selectBTC ? 'BTC' : 'ETH'} NEEDED
        </Text>
        {this.renderCLOCAPR()}
      </View>
    )
  }

  renderCLOCAPR() {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(14),
          marginTop: DimensionManager.verticalScale(54),
          fontWeight: '500',
          fontStyle: 'normal'
        }]}>
          Get a reduxsagait line at
        </Text>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(54),
          marginTop: DimensionManager.verticalScale(9.5),
          fontWeight: 'bold'
        }]}>
          12%
        </Text>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(12),
          marginTop: DimensionManager.verticalScale(6),
          letterSpacing: DimensionManager.scale(1),
          textAlign: 'center'
        }]}>
          INTRODUCTORY APR!
        </Text>
      </View>
    )
  }

  renderCoins() {
    var disabledLoanBtn = true;

    if (this.state.selectBTC || this.state.selectETH) {
      disabledLoanBtn = false;
    }

    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(29),
          alignSelf: 'center'
        }}>
          <Text style={[styles.coinsLabel, {
            color: '#9fbafb'
          }]}>
            {I18n.t('pickACoinAsCollateral')}
          </Text>
        </View>
        {this.renderSelectCoins()}
        {!disabledLoanBtn ? this.renderCryptosRequired() : null}
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    var disabledLoanBtn = true;

    if (this.state.selectBTC || this.state.selectETH) {
      disabledLoanBtn = false;
    }

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />

        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('tryOutreduxsaga')} />

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={{
              backgroundColor: Colors.reduxsagaDarkBlue
            }}
          >
            {this.renderTitle()}
            {this.renderAmount()}

            {parseFloat(this.state.amount) > 1999 ?
              this.renderCoins() : null}
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableOpacityView
                active={!disabledLoanBtn}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),

                  marginTop: DimensionManager.verticalScale(41),
                  marginBottom: DimensionManager.verticalScale(30),
                  backgroundColor: disabledLoanBtn ? Colors.reduxsagaConcreteGray :
                    Colors.reduxsagaGreen
                }}
                label={'Continue'}
                disabled={disabledLoanBtn}
                onPress={() => {
                  var btc = (parseFloat(this.state.amount / this.props.loan.loanSettings.btc_ltv) /
                    this.props.loan.BTC.price).toFixed(2);
                  var eth = (parseFloat(this.state.amount / this.props.loan.loanSettings.eth_ltv) /
                    this.props.loan.ETH.price).toFixed(2);

                  dispatch(LoanActions.loanUpdate({
                    selectedBTC: this.state.selectBTC,
                    selectedETH: this.state.selectETH,
                    btcCollateralCoins: this.state.selectBTC ? btc : 0,
                    ethCollateralCoins: this.state.selectETH ? eth : 0
                  }));

                  dispatch(WalletActions.walletGetAddresses({
                    uuid: this.props.user.uuid,
                    jToken: this.props.user.jToken
                  }));

                  if (this.props.loan.locAmount > this.props.loan.loanSettings.max_reduxsagait - 1) {
                    navigation.navigate('BigSpender')
                  } else {

                    this.props.navigation.navigate('GetYourLoan')
                  }
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                  }}>Continue</Text>
                </TouchableOpacityView>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue,
    height: '100%'
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    //height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  loanBalance: {
    height: DimensionManager.verticalScale(26),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginTop: DimensionManager.verticalScale(-30),
  },
  loanContentView: {
    marginTop: DimensionManager.verticalScale(5),
    marginBottom: DimensionManager.verticalScale(18),
  },
  transferText: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(17),
    textAlign: 'center'
  },
  walletAddress: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(19),
    textAlign: 'left',
  },
  amount: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(48),
    textAlign: 'center',
    alignSelf: 'center'
  },
  amountType: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(18),
    textAlign: 'center',
    alignSelf: 'center'
  },
  amountSelect: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaGreen,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center',
    fontStyle: 'normal',
  },
  modalText: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center',
  },
  coinsLabel: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.transparent,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center',
    fontStyle: 'normal',
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(StartCLOCView));
