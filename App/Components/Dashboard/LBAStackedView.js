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

class LBAStackedView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectLBA: false,
      lbaValue: 9,
      lbaPrice: 0.056758, // TODO needs to replaced with API values
    };
  }

  renderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(21),

      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.transparent,
          textAlign: 'center',
        }}>
          {I18n.t('lowerYourInterestRateByHoldingLBA')}
        </Text>
      </View>
    )
  }

  renderSliderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(41.9),

      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color:'#9fbafb',
          lineHeight: DimensionManager.verticalScale(22),
          marginLeft: DimensionManager.scale(71.5),
          marginRight: DimensionManager.scale(69.5)
        }}>
          {I18n.t('moveTheSlidersToSeeAnEstimate')}
        </Text>
      </View>
    )
  }

  renderPercentage() {
    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: DimensionManager.verticalScale(16),

      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(54),
          color: Colors.transparent,
          textAlign: 'center',
        }}>
          {parseInt(21 - this.state.lbaValue)}%
        </Text>
      </View>
    )
  }

  renderSliderCoins() {
    var disabledLoanBtn = true;

    if (this.state.selectLBA) {
      disabledLoanBtn = false;
    }

    var ImageLBA = this.state.lbaValue === 0 ?
      require('./Images/lba-off.png') :
      require('./Images/lba-on.png');

    return (
      <View style={{
        flexDirection: 'column',
        marginLeft: DimensionManager.scale(43),
        marginRight: DimensionManager.scale(43)
      }}>
        <View style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(15)
        }}>
          <Slider
            value={9}
            minimumValue={9}
            maximumValue={12}
            step={1}
            minimumTrackTintColor={Colors.reduxsagaGreen}
            maximumTrackTintColor={'#6e94ee'}
            thumbTintColor={'#6e94ee'}
            onValueChange={value => {
              this.setState({lbaValue: value });
            }}
            thumbImage={ImageLBA}
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
          {this.state.lbaValue - 9 === 0 ? (
            <View>
              <Text style={[styles.coinsLabel, {
                fontSize: DimensionManager.scale(15),
                marginTop: DimensionManager.verticalScale(6),
                color: '#9fbafb'
              }]}>
                No LBA
              </Text>

              <TouchableOpacity onPress={() => {
                this.setState({showModal: true});
              }}>
                <Text style={[styles.coinsLabel, {
                  fontSize: DimensionManager.scale(14),
                  fontWeight: '500',
                  color: Colors.reduxsagaGreen,
                  marginTop: DimensionManager.verticalScale(9)
                }]}>
                  {I18n.t('whatsThis')}
                </Text>
              </TouchableOpacity>

            </View>
          ) : (
            <View>
              <Text style={[styles.coinsLabel, {
                fontSize: DimensionManager.scale(15),
                marginTop: DimensionManager.verticalScale(17),
              }]}>
                {this.state.lbaValue - 9}% = {(((this.state.lbaValue - 9) * this.props.loan.locAmount / 100) / this.props.loan.LBA.price).toFixed(2)} LBA
              </Text>
              <TouchableOpacity onPress={() => {
                this.setState({showModal: true});
              }}>
                <Text style={[styles.coinsLabel, {
                  fontSize: DimensionManager.scale(14),
                  fontWeight: '500',
                  color: Colors.reduxsagaGreen,
                  marginTop: DimensionManager.verticalScale(9)
                }]}>
                  {I18n.t('whatsThis')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

    )
  }

  renderPercentageGainMessage() {
    if ((this.state.lbaValue - 9) < 1) {
      return null;
    }
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(192),
        marginLeft: DimensionManager.scale(56),
        marginRight: DimensionManager.scale(56)
      }}>
        <Text style={[styles.coinsLabel, {
          fontSize: DimensionManager.scale(14),
          fontWeight: '500',
          lineHeight: DimensionManager.scale(22)
        }]}>
          {I18n.t('lowerYourInterestRates')} {this.state.lbaValue - 9} {I18n.t('percentByVaultingLBATokens')}
        </Text>
      </View>
    )
  }

  renderModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.showModal}
        >
          <View style={{
            height: DimensionManager.verticalScale(487),
            width: DimensionManager.scale(335),
            backgroundColor: Colors.transparent
          }}>
            <TouchableOpacity onPress={() => {
              this.setState({showModal: false});
            }}>
              <Image
                style={{
                  width: DimensionManager.scale(18),
                  height: DimensionManager.verticalScale(52),
                  marginRight: DimensionManager.scale(18),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(8.7),
                  alignSelf: 'flex-end'
                }}
                source={require('./Images/x-close-modal.png')} />
              </TouchableOpacity>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(28),
                color: Colors.reduxsagaDarkBlue,
                textAlign: 'center',
                lineHeight: DimensionManager.scale(44)
              }}>
                {I18n.t('lbaYouSay')}
              </Text>
              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: '#787e8b',
                textAlign: 'center',
                lineHeight: DimensionManager.scale(26),
                marginLeft: DimensionManager.scale(18),
                marginRight: DimensionManager.scale(21),
                marginTop: DimensionManager.verticalScale(5)
              }}>
                {I18n.t('yesLBAIsreduxsagaUtilityToken')}
              </Text>

              <Image
                style={{
                  width: DimensionManager.scale(108),
                  height: DimensionManager.verticalScale(79),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(52)
                }}
                source={require('./Images/bigass-coin-stack.png')} />

              <Text style={{
                ...styles.transferText,
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(14),
                color: '#787e8b',
                textAlign: 'center',
                lineHeight: DimensionManager.scale(21),
                marginLeft: DimensionManager.scale(48),
                marginRight: DimensionManager.scale(39),
                marginTop: DimensionManager.verticalScale(12.5)
              }}>
                {I18n.t('purchaseLBATokensOnUphold')}
              </Text>
          </View>
        </Modal>
      </View>
    );
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
            {this.renderPercentage()}
            {this.renderSliderTitle()}
            {this.renderSliderCoins()}
            {this.renderPercentageGainMessage()}
            {this.state.showModal ? this.renderModal() : null}
            <View style={{

            }}>
              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(34),
                  marginBottom: DimensionManager.verticalScale(30),
                  backgroundColor: Colors.reduxsagaGreen
                }}
                label={'Continue'}
                disabled={false}
                onPress={() => {
                  var lbaCollateral = (((this.state.lbaValue - 9) *
                    this.props.loan.locAmount / 100) / this.props.loan.LBA.price).toFixed(2);
                  var annualPercentage = 21 - this.state.lbaValue;

                  dispatch(LoanActions.loanUpdate({
                    lbaCollateral: parseFloat(lbaCollateral).toFixed(2),
                    annualPercentage: annualPercentage
                  }));

                  this.props.navigation.navigate('LoanConfirmation');
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                    marginTop: DimensionManager.verticalScale(14),
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LBAStackedView));
