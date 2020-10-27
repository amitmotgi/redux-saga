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
import Modal from 'react-native-modal';
import LoanActions from '../../Redux/Loan';
import TextAmount from '../../Common/TextAmount';

class GetYourLoanView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      amountType: 'USD',
      walletAddress: '',
      showPreview: false,
      selectBTC: false,
      selectETH: false,
      btcValue: 0,
      ethValue: 0,
      btcPrice: 6391.98, // TODO needs to replaced with API values
      ethPrice: 209.5, // TODO needs to replaced with API values,
      btcCoins: this.props.loan && this.props.loan.btcCollateralCoins || 0,
      ethCoins: this.props.loan && this.props.loan.ethCollateralCoins || 0,
      sliderMoved: false
    };
  }

  renderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(20),

      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.transparent
        }}>
          {I18n.t('changeLoanAmountWithSliders')}
        </Text>
      </View>
    )
  }

  renderAmount() {
    var totalAmount = 0;
    var btc = parseFloat(this.state.btcValue),
    eth = parseFloat(this.state.ethValue);

    if (!this.state.sliderMoved) {
      totalAmount = this.props.loan.locAmount;
    } else {
      totalAmount = btc + eth;
    }

    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: DimensionManager.verticalScale(20)
      }}>
      <TextAmount amountType='$' amount={totalAmount} style={{color: Colors.reduxsagaOffWhite}}/>
      </View>
    )
  }

  renderSliderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(41.9),
        marginLeft: DimensionManager.scale(71.5),
        marginRight: DimensionManager.scale(69.5)
      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color:'#9fbafb',
          lineHeight: DimensionManager.verticalScale(22)
        }}>
          {I18n.t('moveTheSlidersToSeeAnEstimate')}
        </Text>
      </View>
    )
  }

  renderSliderCoins() {
    var disabledLoanBtn = true;

    if (this.state.selectBTC || this.state.selectETH) {
      disabledLoanBtn = false;
    }

    var ImageBTC = this.state.btcValue === 0 ?
      require('./Images/bitcoin-off.png') :
      require('./Images/bitcoin-on.png');

    var ImageETH = this.state.ethValue === 0 ?
      require('./Images/eth-off.png') :
      require('./Images/eth-on.png');

    var btcSliderMax = parseFloat(this.props.loan.loanSettings.max_reduxsagait /
      this.props.loan.loanSettings.btc_ltv / this.props.loan.BTC.price);
    var btcSliderVal = parseFloat(btcSliderMax *
      this.props.loan.BTC.price * this.props.loan.loanSettings.btc_ltv);

    var ethSliderMax = parseFloat(this.props.loan.loanSettings.max_reduxsagait /
      this.props.loan.loanSettings.eth_ltv / this.props.loan.ETH.price);
    var ethSliderVal = parseFloat(ethSliderMax *
      this.props.loan.ETH.price * this.props.loan.loanSettings.eth_ltv);

    var btcSliderInitVal = 0, btcSliderInit = 0;
    var ethSliderInitVal = 0, ethSliderInit = 0;

    if (this.props.loan.selectedBTC) {
      btcSliderInitVal = parseFloat(this.props.loan.locAmount /
        this.props.loan.loanSettings.btc_ltv / this.props.loan.BTC.price);
      btcSliderInit = parseFloat(btcSliderInitVal *
        this.props.loan.BTC.price * this.props.loan.loanSettings.btc_ltv);
    }

    if (this.props.loan.selectedETH) {
      ethSliderInitVal = parseFloat(this.props.loan.locAmount /
        this.props.loan.loanSettings.eth_ltv / this.props.loan.ETH.price);
      ethSliderInit = parseFloat(ethSliderInitVal *
        this.props.loan.ETH.price * this.props.loan.loanSettings.eth_ltv);
    }

    btcSliderInit = btcSliderInit > parseFloat(this.props.loan.loanSettings.max_reduxsagait) ?
     parseFloat(this.props.loan.loanSettings.max_reduxsagait) : btcSliderInit;

    btcSliderInit = btcSliderInit > parseFloat(this.props.loan.loanSettings.max_reduxsagait) ?
     parseFloat(this.props.loan.loanSettings.max_reduxsagait) : btcSliderInit;

    return (
      <View style={{
        flexDirection: 'column',
        marginLeft: DimensionManager.scale(43),
        marginRight: DimensionManager.scale(43),
      }}>
        <View style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(17)
        }}>
          <Slider
            value={btcSliderInit}
            minimumValue={0}
            maximumValue={btcSliderVal}
            minimumTrackTintColor={Colors.reduxsagaGreen}
            maximumTrackTintColor={'#6e94ee'}
            thumbTintColor={'#6e94ee'}
            onValueChange={value => {
              var limitValue = value > parseFloat(this.props.loan.loanSettings.max_reduxsagait) ?
                parseFloat(this.props.loan.loanSettings.max_reduxsagait) : value;

              var btcCoins = parseFloat(limitValue /
                this.props.loan.loanSettings.btc_ltv / this.props.loan.BTC.price);

              this.setState({
                btcValue: limitValue.toFixed(2),
                btcCoins: btcCoins.toFixed(2),
                sliderMoved: true
              });
            }}
            thumbImage={ImageBTC}
            thumbStyle={{
              width: DimensionManager.scale(36),
              height: DimensionManager.verticalScale(36),
              backgroundColor: Colors.transparent,
              borderRadius: 20
            }}
            trackStyle={{
              height: DimensionManager.verticalScale(2),
            }}
          />
          <Text style={[styles.coinsLabel, {
            fontSize: DimensionManager.scale(15),
            marginTop: DimensionManager.verticalScale(5),
          }]}>
            {this.state.btcCoins} BTC
          </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(25)
        }}>
          <Slider
            value={ethSliderInit}
            minimumValue={0}
            maximumValue={ethSliderVal}
            minimumTrackTintColor={Colors.reduxsagaGreen}
            maximumTrackTintColor={'#6e94ee'}
            thumbTintColor={'#6e94ee'}
            onValueChange={value => {
              var limitValue = value > parseFloat(this.props.loan.loanSettings.max_reduxsagait) ?
                parseFloat(this.props.loan.loanSettings.max_reduxsagait) : value;

              var ethCoins = parseFloat(limitValue /
                this.props.loan.loanSettings.eth_ltv / this.props.loan.ETH.price);

              this.setState({
                ethValue: limitValue.toFixed(2),
                ethCoins: ethCoins.toFixed(2),
                sliderMoved: true
              });

            }}
            thumbImage={ImageETH}
            thumbStyle={{
              width: DimensionManager.scale(36),
              height: DimensionManager.verticalScale(36),
              backgroundColor: Colors.transparent,
              borderRadius: 20
            }}
            trackStyle={{
              height: DimensionManager.verticalScale(2),
            }}
          />
          <Text style={[styles.coinsLabel, {
            fontSize: DimensionManager.scale(15),
            marginTop: DimensionManager.verticalScale(5.8),
          }]}>
            {this.state.ethCoins} ETH
          </Text>
        </View>
      </View>

    )
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <View style={styles.safeAreaBottom} />

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
            {this.renderSliderTitle()}
            {this.renderSliderCoins()}
            <View style={{

            }}>
              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(214),
                  marginBottom: DimensionManager.verticalScale(30),
                  backgroundColor: Colors.reduxsagaGreen
                }}
                label={'Continue'}
                disabled={false}
                onPress={() => {
                  var totalAmount = parseFloat(this.state.btcValue) + parseFloat(this.state.ethValue);
                  var bigSpender = !this.state.sliderMoved ? this.props.loan.locAmount : totalAmount;

                  dispatch(LoanActions.loanUpdate({
                    locAmount: !this.state.sliderMoved ? this.props.loan.locAmount : totalAmount,
                    btcCollateral: parseFloat(this.state.btcValue),
                    ethCollateral: parseFloat(this.state.ethValue),
                    btcCollateralCoins: this.state.btcCoins,
                    ethCollateralCoins: this.state.ethCoins
                  }));

                  if (bigSpender > this.props.loan.loanSettings.max_reduxsagait - 1) {
                    navigation.navigate('BigSpender')
                  } else {
                    this.props.navigation.navigate('LBAStacked');
                  }
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                    marginTop: DimensionManager.verticalScale(14),
                  }}>{I18n.t('Continue')}</Text>
                </TouchableOpacityView>
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
  safeAreaBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(GetYourLoanView));
