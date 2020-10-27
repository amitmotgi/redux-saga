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
  Clipboard
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, StackActions, NavigationActions, SafeAreaView } from 'react-navigation';
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
import UserActions from '../../Redux/User';
import PaymentActions from '../../Redux/Payment';
import QRCode from 'react-native-qrcode';
import SendSMS from 'react-native-sms';
import email from 'react-native-email';
import CountDownView from '../../Common/CountDownView'

class CoinAddressesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectLBA: false,
      lbaValue: 9,
      lbaPrice: 0.056758, // TODO needs to replaced with API values
      coinAddress: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(PaymentActions.paymentGetCards({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken,
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
          {I18n.t('copyTheBelowAddressesAndPaste')}
        </Text>
        <View style={{
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(20)
        }}>
          <CountDownView
            until={this.props.user.lendingTimer}
            width={53}
            height={53}
            digitBgColor={'#ffab00'}
            digitTxtColor={Colors.transparent}
            size={DimensionManager.scale(30)}
          />

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
                marginLeft: DimensionManager.scale(124)
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
                marginLeft: DimensionManager.scale(27)
              }}>
                SEC
              </Text>
            </View>
          </View>


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

  renderQRCode(val) {
    return (
      <View style={[styles.qrCode, {
        alignSelf: 'center'
      }]}>
        <QRCode value={val} size={150} bgColor={Colors.reduxsagaBlack} fgColor={Colors.transparent} />
      </View>
    );
  }

  renderCoinAddresses(coinType) {
    const coinAddr = this.props.wallet && this.props.wallet.length > 0 &&
      this.props.wallet[coinType] && this.props.wallet[coinType].address || 0;

    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(38),
        backgroundColor: '#f4f8ff',
        height: DimensionManager.verticalScale(514)
      }}>
        {this.renderUnderline()}
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.reduxsagaSkyLightGray,
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(37),
          letterSpacing: DimensionManager.scale(1)
        }}>
          reduxsaga {coinType} ADDRESS
        </Text>
        <View style={{
          marginTop: DimensionManager.verticalScale(15)
        }}>
          {this.renderQRCode(coinAddr)}
        </View>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.reduxsagaBlack,
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(25)
        }}>
          {coinAddr}
        </Text>

        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(24),
          color: Colors.reduxsagaBlack,
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(25)
        }}>
          {coinType === 'LBA' ? this.props.loan.lbaCollateral :
            this.props.loan[coinType.toLowerCase()+'CollateralCoins']}
        </Text>

        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: Colors.reduxsagaBlack,
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(10),
          marginLeft: DimensionManager.scale(106.5),
          marginRight: DimensionManager.scale(105.5)
        }}>
          {coinType} needed to complete collateral transaction
        </Text>

        <TouchableOpacity style={{
          flexDirection: 'column'
        }}>
          <Image
            style={{
              marginTop: DimensionManager.verticalScale(27),
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={require('./Images/copy-icon.png')} />
            <Text style={{
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              color: Colors.reduxsagaDarkBlue,
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(7),
            }}>
              Copy address
            </Text>
        </TouchableOpacity>

      </View>
    );
  }

  renderButtons() {
    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: DimensionManager.verticalScale(41),
      }}>
        <TouchableOpacityView
          active={true}
          style={{
            width: DimensionManager.scale(157),
            height: DimensionManager.verticalScale(50),
            alignSelf: 'center',
            marginBottom: DimensionManager.verticalScale(40),
            marginRight: DimensionManager.scale(20),
            backgroundColor:  Colors.reduxsagaDarkBlue
          }}
          label={'Email'}
          disabled={false}
          onPress={() => {
            //this.props.navigation.navigate('Dashboard');
            const to = ['amit.motgi@gmail.com'] // string or array of email addresses
            email(to, {
              // Optional additional arguments
              subject: 'reduxsaga Wallet Address',
              body: 'LBA Wallet Address'
            }).catch((err) => {

            });
          }}>
            <Text style={{
              ...Fonts.style.inputBoldGT,
              fontWeight: '500',
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(14),
            }}>Email</Text>
          </TouchableOpacityView>
          <TouchableOpacityView
            active={true}
            style={{
              width: DimensionManager.scale(157),
              height: DimensionManager.verticalScale(50),
              alignSelf: 'center',
              marginBottom: DimensionManager.verticalScale(40),
              backgroundColor: Colors.reduxsagaDarkBlue
            }}
            label={'Text'}
            disabled={false}
            onPress={() => {
              //Clipboard.setString(this.state.coinAddress);

              // Prepares a SMS notification for user
              // TODO - The below code needs to fixed with proper
              // messaging to users
              SendSMS.send({
                body: 'The default body of the SMS!',
                recipients: ['014088136286'],
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true
              }, (completed, cancelled, error) => {
                console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
              });

            }}>
              <Text style={{
                ...Fonts.style.inputBoldGT,
                fontWeight: '500',
                color: Colors.transparent,
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(14),
              }}>Text</Text>
          </TouchableOpacityView>
      </View>
    );
  }

  renderNext() {
    const { navigation } = this.props;

    if (this.props.payment && this.props.payment.id) {
      navigation.navigate('Dashboard');
    } else if (this.props.payment.id === undefined) {
      navigation.navigate('LoanOriginationSuccess');
    }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={true}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('transferCollateral')} />

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
            {this.renderCoinAddresses('BTC')}
            {this.renderUnderline()}
            {this.renderCoinAddresses('ETH')}
            {this.renderUnderline()}
            {this.renderCoinAddresses('LBA')}
            {this.renderUnderline()}
            {this.renderButtons()}

            <TouchableOpacityView
              active={true}
              style={{
                width: DimensionManager.scale(335),
                height: DimensionManager.verticalScale(50),
                marginBottom: DimensionManager.verticalScale(20),
                backgroundColor: Colors.reduxsagaGreen,
                alignSelf: 'center'
              }}
              label={'Continue'}
              disabled={false}
              onPress={() => {
                const { navigation } = this.props;
                const { dispatch } = navigation;

                this.renderNext();

              }}>
                <Text style={{
                  ...Fonts.style.inputBoldGT,
                  fontWeight: '500',
                  color: Colors.transparent,
                  textAlign: 'center',
                }}>Continue</Text>
              </TouchableOpacityView>

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
  qrCode: {
    width: DimensionManager.scale(183),
    height: DimensionManager.scale(183),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DimensionManager.verticalScale(1),
    borderColor: Colors.reduxsagaGray,
    borderRadius: DimensionManager.verticalScale(4),
    overflow:'hidden' // must add it, stop webView's white blank
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CoinAddressesView));
