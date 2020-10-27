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
  SafeAreaView,
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';
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
import * as Progress from 'react-native-progress';
import CountDownView from '../../Common/CountDownView'
import CheckBox from 'react-native-checkbox';
import { EventRegister } from 'react-native-event-listeners';

class LoanAgreementView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectLBA: false,
      lbaValue: 9,
      lbaPrice: 0.056758, // TODO needs to replaced with API values,
      checked: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(LoanActions.loanUpdate({
      loanStatus: ''
    }));
  }

  renderTitle() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(35),
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20)
      }]}>
        <Text style={{
          ...styles.transferText,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(18),
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          lineHeight: DimensionManager.scale(24),
          letterSpacing: 0
        }}>
          {I18n.t('youJustAppliedForAreduxsagaitLineWithreduxsaga')}
        </Text>
      </View>
    )
  }

  renderLOC() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(35)
      }}>
        <View style={{
          borderWidth: 0.5,
          borderColor: '#d6dbe6',
          borderBottomColor: Colors.reduxsagaBlack,
        }} />
        <View style={{
          flexDirection: 'row',
          height: DimensionManager.verticalScale(70),
          marginLeft: DimensionManager.scale(19),
          marginRight: DimensionManager.scale(20),
          alignItems: 'center'
        }}>
            <Text style={{
              width: '50%',
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: '#9ca5b5',
              textAlign: 'left',
            }}>
              {I18n.t('totalLineOfreduxsagait')}
            </Text>
            <Text style={{
              width: '50%',
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              lineHeight: DimensionManager.scale(16)
            }}>
              {this.props.loan.quote.reduxsagait_line.toFixed(2)}
            </Text>
        </View>
      </View>

    )
  }

  renderCoins(coinType, collateralCoins) {
    var selectImg = require('./Images/lba-on.png');

    if (coinType === 'BTC') {
      selectImg = require('./Images/bitcoin-on.png');
    } else if (coinType === 'ETH') {
      selectImg = require('./Images/eth-on.png');
    }
    return (
      <View style={{
      }}>
        {this.renderUnderline()}
        <View style={{
          flexDirection: 'row',
          height: DimensionManager.verticalScale(70),
          marginLeft: DimensionManager.scale(19),
          marginRight: DimensionManager.scale(20),
          alignItems: 'center'
        }}>
            <View style={{
              width: '50%',
              flexDirection: 'row',
              alignSelf: 'center'
            }}>
              <Image
                style={{
                  width: DimensionManager.scale(36),
                  height: DimensionManager.verticalScale(36),
                  marginRight: DimensionManager.scale(10),
                  resizeMode: 'contain',
                }}
                source={selectImg} />
                <Text style={{
                  ...styles.transferText,
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: DimensionManager.scale(14),
                  color: '#9ca5b5',
                  alignSelf: 'center'
                }}>
                  {coinType}
                </Text>
            </View>

            <Text style={{
              width: '50%',
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              lineHeight: DimensionManager.scale(16)
            }}>
              {collateralCoins.toFixed(2)}
            </Text>
        </View>
      </View>

    )
  }

  renderUnderline() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: '#d6dbe6',
        borderBottomColor: Colors.reduxsagaBlack,
      }} />
    )
  }

  renderTerms(type, value) {
    return (
      <View style={{
      }}>
        <View style={{
          flexDirection: 'row',
          height: DimensionManager.verticalScale(70),
          marginLeft: DimensionManager.scale(19),
          marginRight: DimensionManager.scale(20),
          alignItems: 'center'
        }}>
            <Text style={{
              width: '50%',
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: '#9ca5b5',
              textAlign: 'left',
            }}>
              {type}
            </Text>
            <Text style={{
              width: '50%',
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              lineHeight: DimensionManager.scale(16)
            }}>
              {value}
            </Text>
        </View>
        {this.renderUnderline()}
      </View>
    )
  }

  renderCounter() {
    return (
      <View style={{
        flexDirection: 'column',
        alignSelf: 'center',
        height: DimensionManager.verticalScale(213),
        backgroundColor: Colors.reduxsagaDarkBlue,
        width: '100%',
        alignItems: 'center'
      }}>
        <View style={{
          marginTop: DimensionManager.verticalScale(50)
        }}>
          <CountDownView
            until={10800}
            width={53}
            height={53}
            digitBgColor={'#ffab00'}
            digitTxtColor={Colors.transparent}
            size={DimensionManager.scale(30)}
          />
        </View>
        <View style={{
          flexDirection: 'column',
          width: '100%'
        }}>
          <View style={{
            flexDirection: 'row',
            marginTop: DimensionManager.verticalScale(6)
          }}>
            <Text style={{
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: '#b5d1ff',
              textAlign: 'left',
              marginLeft: DimensionManager.scale(122)
            }}>
              HR
            </Text>
            <Text style={{
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: '#b5d1ff',
              marginLeft: DimensionManager.scale(32)
            }}>
              MINS
            </Text>
            <Text style={{
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: '#b5d1ff',
              marginLeft: DimensionManager.scale(26)
            }}>
              SEC
            </Text>
          </View>
        </View>

        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.transparent,
          marginTop: DimensionManager.verticalScale(20),
          textAlign: 'center',
          marginLeft: DimensionManager.scale(69),
          marginRight: DimensionManager.scale(68),
          lineHeight: DimensionManager.scale(21)
        }}>
          This agreement is time senstive and valid once collateral is collected
        </Text>
      </View>
    );
  }

  getTC() {
    return (
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(34),
          marginLeft: DimensionManager.scale(22),
          width: DimensionManager.scale(313)
        }}
      >
        <CheckBox
          checkedImage={require('../Images/check-mark.png')}
          uncheckedImage={require('../Images/check-box.png')}
          checkboxStyle={{
            borderColor: Colors.transparent,
            backgroundColor: Colors.reduxsagaDarkBlue,
            height: DimensionManager.verticalScale(16),
            width: DimensionManager.scale(16)
          }}
          label={''}
          labelStyle={[Fonts.style.textMediumGT]}
          checked={this.state.checked}
          onChange={() => this.setState({ checked: !this.state.checked })}
        />
        <View style={{
          flexDirection: 'row'
        }}>
          <Text
            style={[
              Fonts.style.textMediumGT, {
                color: Colors.reduxsagaBlack,
                justifyContent: 'center',
                alignSelf: 'flex-start',
                marginLeft: DimensionManager.scale(19),
                lineHeight: DimensionManager.scale(18),
                fontSize: DimensionManager.scale(14),
                fontWeight: 'normal',
                fontStyle: 'normal'
              }
            ]}
          >
            {I18n.t('iHaveReadAndAgree')}
          </Text>
        </View>
      </View>
    );
  }

  renderTC() {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(24),
          color: '#0a0f13',
          marginTop: DimensionManager.verticalScale(53),
          textAlign: 'center',
        }}>
          Terms & Conditions
        </Text>

        <Text style={{
          ...styles.transferText,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(12),
          color: '#787e8b',
          marginTop: DimensionManager.verticalScale(7),
          textAlign: 'center',
        }}>
          Posted on 8/28/2018
        </Text>

        <View style={{
          marginLeft: DimensionManager.scale(29),
          marginRight: DimensionManager.scale(23)
        }}>
          <Text style={{
            ...styles.transferText,
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: DimensionManager.scale(14),
            color: '#787e8b',
            marginTop: DimensionManager.verticalScale(7),
            lineHeight: DimensionManager.scale(20),
            textAlign: 'left',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ut justo sit amet bibendum. Integer accumsan vulputate tristique. Curabitur et imperdiet eros.
          </Text>
        </View>
        {this.getTC()}


      </View>
    );
  }

  renderAgreementApproved() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    const status = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.status || ''

    if (status === 'PENDING' || status === 'APPROVED' ||
        status === 'ACTIVE' || status === 'REJECTED') {

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'CoinAddresses'
        })],
      });
      navigation.dispatch(resetAction);
    }

  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.renderAgreementApproved();

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-3),
          }}
          title={I18n.t('officialQuote')} />

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={{
              backgroundColor: Colors.transparent
            }}
          >
            {this.renderTitle()}
            {this.renderLOC()}
            {this.renderCoins('BTC', parseFloat(this.props.loan.quote.collateral.btc))}
            {this.renderCoins('ETH', parseFloat(this.props.loan.quote.collateral.eth))}
            {this.renderCoins('LBA', parseFloat(this.props.loan.lbaCollateral))}
            {this.renderUnderline()}
            {this.renderTerms('Annual interest rate', this.props.loan.quote.annual_interest_percent+'%')}
            {this.renderTerms('Origination fee', this.props.loan.quote.fees.origination_fee_in_percentage+'%')}
            {this.renderTerms('Daily withdrawal limit', '$'+this.props.loan.quote.daily_withdrawal_limit.toFixed(2))}
            {this.renderTerms('Transfer method', 'Debit card')}
            {this.renderTerms('Monthly repayment', 'Interest and fees only')}

            {this.renderCounter()}

            {this.renderTC()}

            <View style={{
              flexDirection: 'row',
              alignSelf: 'center'
            }}>
              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(157),
                  height: DimensionManager.verticalScale(50),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(15),
                  marginBottom: DimensionManager.verticalScale(40),
                  marginRight: DimensionManager.scale(20),
                  backgroundColor: '#6e94ee'
                }}
                label={'Decline'}
                disabled={false}
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                    marginTop: DimensionManager.verticalScale(14),
                  }}>Decline</Text>
                </TouchableOpacityView>
                <TouchableOpacityView
                  active={true}
                  style={{
                    width: DimensionManager.scale(157),
                    height: DimensionManager.verticalScale(50),
                    alignSelf: 'center',
                    marginTop: DimensionManager.verticalScale(15),
                    marginBottom: DimensionManager.verticalScale(40),
                    backgroundColor: '#0f44d0'
                  }}
                  label={'Accept'}
                  disabled={false}
                  onPress={() => {
                    EventRegister.emit('lendingTimer');
                    //navigation.navigate('CoinAddresses');

                    var payload = {
                      uuid: this.props.user.uuid,
                      jToken: this.props.user.jToken,
                      clocPayload: {
                        esignature: new Date().getTime(),
                        funding_method: {
                          collateral: [
                            {
                              currency: 'BTC',
                              ref_id: this.props.wallet.BTC.address,
                              transfer_method: 'reduxsaga'
                            },
                            {
                              currency: 'ETH',
                              ref_id: this.props.wallet.ETH.address,
                              transfer_method: 'reduxsaga'
                            }
                          ],
                          stake: [{
                            currency: 'LBA',
                            ref_id: this.props.wallet.LBA.address,
                            transfer_method: 'reduxsaga'
                          }],
                          destination_account: {
                            currency: 'USD',
                            ref_id: '261fbb14-64f3-4693-b904-f799ff1dd84a',
                            transfer_method: 'reduxsaga'
                          },
                          source_account: {
                            currency: 'USD',
                            ref_id: '161fbb14-64f3-4693-b904-f799ff1dd84a',
                            transfer_method: 'reduxsaga'
                          }
                        },
                        quote_id: this.props.loan.quote.id
                      }
                    };

                    dispatch(LoanActions.loanCreateCloc(payload));

                  }}>
                    <Text style={{
                      ...Fonts.style.inputBoldGT,
                      fontWeight: '500',
                      color: Colors.transparent,
                      textAlign: 'center',
                      marginTop: DimensionManager.verticalScale(14),
                    }}>Accept</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoanAgreementView));
