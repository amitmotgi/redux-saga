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
  ActivityIndicator
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
import LoanActions from '../../Redux/Loan';
import Modal from 'react-native-modal';
import TextAmount from '../../Common/TextAmount';

class LoanConfirmationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  renderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(41),
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20)
      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(18),
          color: Colors.transparent,
          textAlign: 'left',
          lineHeight: DimensionManager.verticalScale(24)
        }}>
          {I18n.t('letMakeSureWeGotAllTheDetails')}
        </Text>

      </View>
    )
  }

  renderLOC() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(52),
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          textAlign: 'center',
        }}>
          {I18n.t('totalLineOfreduxsagait')}
        </Text>
        <View style={{
          alignSelf: 'center'
        }}>
          <TextAmount
            amountType={'$'}
            amount={this.props.loan.locAmount.toFixed(2)}
            style={{color: Colors.reduxsagaOffWhite}}/>
        </View>
      </View>
    );
  }

  renderToken(coinType, value) {
    var coinImage = null;

    if (coinType === 'LBA') {
      coinImage = require('./Images/lba-on.png');
    } else {
      coinImage = coinType === 'BTC' ?
        require('./Images/bitcoin-on.png') : require('./Images/eth-on.png');
    }

    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: DimensionManager.verticalScale(8)
      }}>
        <Image
          style={{
            width: DimensionManager.scale(35.8),
            height: DimensionManager.verticalScale(35.8),
            resizeMode: 'contain',
            marginRight: DimensionManager.scale(8.7),
            alignSelf: 'center'
          }}
          source={coinImage} />
        <Text style={{
          ...styles.transferText,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(38),
          color: Colors.transparent,
          textAlign: 'center',
        }}>
          {value}
        </Text>
        <Text style={{
          ...styles.transferText,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.transparent,
          marginTop: DimensionManager.verticalScale(24),
          marginLeft: DimensionManager.scale(12)
        }}>
          {coinType}
        </Text>
      </View>
    );
  }

  renderCollateralPledged() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(32),
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          textAlign: 'center',
          letterSpacing: 0
        }}>
          {I18n.t('collateralPledged')}
        </Text>
        {this.renderToken('BTC' , this.props.loan.btcCollateralCoins)}
        {this.renderToken('ETH' , this.props.loan.ethCollateralCoins)}
      </View>
    )
  }

  renderLBAStaked() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(57),
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          textAlign: 'center',
          letterSpacing: DimensionManager.scale(0)
        }}>
          {I18n.t('totalLBAVaulted')}
        </Text>
        {this.renderToken('LBA' ,this.props.loan.lbaCollateral)}
      </View>
    );
  }

  renderAnnualPercentage() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(59),
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          textAlign: 'center',
          letterSpacing: DimensionManager.scale(0)
        }}>
          {I18n.t('annualPercentageFee')}
        </Text>
        <Text style={{
          ...styles.transferText,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(38),
          color: Colors.transparent,
          textAlign: 'center',
        }}>
          {this.props.loan.annualPercentage}%
        </Text>
      </View>
    );
  }

  renderOriginationFee() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(59),
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#9fbafb',
          textAlign: 'center',
        }}>
          {I18n.t('originationFee')}
        </Text>
        <Text style={{
          ...styles.transferText,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(38),
          color: Colors.transparent,
          textAlign: 'center',
        }}>
          3%
        </Text>
      </View>
    );
  }

  renderQuoteApproved() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    if (this.props.loan.loanStatus === 'APPROVED') {
      navigation.navigate('LoanAgreement');
    }
  }

  renderCLOCStatus() {
    // if (this.props.loan.) {
    //
    // }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.renderQuoteApproved();

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
          title={I18n.t('getYourQuote')} />

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
            {this.renderLOC()}
            {this.renderCollateralPledged()}
            {this.renderLBAStaked()}
            {this.renderAnnualPercentage()}
            {this.renderOriginationFee()}

            <View style={{

            }}>

              <TouchableOpacityView
                spinner={this.state.spinner}
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(51),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(72),
                  marginBottom: DimensionManager.verticalScale(30),
                  backgroundColor: Colors.reduxsagaGreen
                }}
                label={'Confirm'}
                disabled={false}
                onPress={() => {
                  const { navgiation } = this.props;
                  const { dispatch } = navigation;

                  this.setState({spinner: true});

                  var computeLBAInterest = [];
                  const { loan } = this.props;
                  const { loanSettings = {}} = loan;
                  const rate = loanSettings && loanSettings.interest_rate &&
                    loanSettings.interest_rate.length > 0 && loanSettings.interest_rate[0].rate || 12;

                  if ((rate - this.props.loan.annualPercentage) > 0) {
                    computeLBAInterest = [{
                      currency: "LBA",
                      percentage: rate - this.props.loan.annualPercentage,
                    }];
                  }
                  // Requesting a Quote from Underwriting Service
                  var userInfo = {
                    payload: {
                      collateral: {
                        btc: this.props.loan.btcCollateralCoins,
                        eth: this.props.loan.ethCollateralCoins,
                        xrp: 0
                      },
                      currency: this.props.loan.currencyType,
                      interest_rate_rebates: computeLBAInterest,
                      tenor_in_months: 36
                    },
                    jToken: this.props.user.jToken,
                    uuid: this.props.user.uuid
                  };

                  dispatch(LoanActions.loanCreateQuote(userInfo));

                }}>
                  <View style={{
                    flexDirection: 'row'
                  }}>
                    <Text style={{
                      ...Fonts.style.inputBoldGT,
                      fontWeight: '500',
                      color: Colors.transparent,
                      textAlign: 'center',
                      marginTop: DimensionManager.verticalScale(14),
                    }}>Confirm</Text>
                  </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoanConfirmationView));
