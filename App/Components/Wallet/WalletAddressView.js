import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  PanResponder,
  UIManager,
  InteractionManager,
  Clipboard
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import { toFormatNumber } from '../../Utils/CurrencyUtils';
import QRCode from 'react-native-qrcode';
import { scale, verticalScale } from '../../Themes/DimensionManager';
import OnboardingActions from '../../Redux/Onboarding';
import { PageStyleConfig } from '../../Config/PageStyleConfig';
import SendSMS from 'react-native-sms';
import email from 'react-native-email';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class WalletAddressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.transferData(props)
    };
  }
  transferData = props => {
    const { navigation = {} } = props;
    const { state = {} } = navigation;
    const { params = {} } = state;
    const { currency, address } = params;
    return { currency, address };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.transferData(nextProps)
    });
  }

  copyAddress = () => {
    const { address } = this.state;
    Clipboard.setString(address);
  };

  // TODO add copyImage
  addressInfo = () => {
    const { currency, address } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.headContentView}>
          <Text style={styles.headContentText}>
            Paste this address into your external wallet to send assets to your reduxsaga wallet.
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: DimensionManager.verticalScale(1),
            borderTopWidth: DimensionManager.verticalScale(1),
            borderColor: Colors.reduxsagaLightGray,
            backgroundColor: Colors.reduxsagaExtraLightBlue,
            height: DimensionManager.verticalScale(406),
            alignItems: 'center'
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: 12,
                fontWeight: 'bold',
                opacity: 1,
                letterSpacing: 1,
                paddingLeft: DimensionManager.scale(6),
                marginTop: DimensionManager.verticalScale(35),
                marginBottom: DimensionManager.verticalScale(15),
                color: Colors.reduxsagaSkyLightGray
              }
            ]}
          >
            reduxsaga {currency} ADDRESS
          </Text>
          <View style={styles.qrCodeView}>
            <QRCode
              value={address}
              size={150}
              bgColor={Colors.reduxsagaBlack}
              fgColor={Colors.transparent}
            />
          </View>
          <Text
            style={[
              styles.text,
              {
                marginTop: DimensionManager.verticalScale(25),
                marginBottom: DimensionManager.verticalScale(25),
                color: Colors.reduxsagaDarkBlue
              }
            ]}
          >
            {address}
          </Text>
          <TouchableOpacity onPress={this.copyAddress} style={styles.copyView}>
            <Image source={require('../Dashboard/Images/copy-icon.png')} style={styles.copyImage} />
            <Text
              style={[
                styles.text,
                {
                  color: Colors.reduxsagaDarkBlue,
                  marginTop: DimensionManager.verticalScale(7),
                  paddingLeft: DimensionManager.scale(4)
                }
              ]}
            >
              Copy address
            </Text>
          </TouchableOpacity>
        </View>
        {this.footerButton()}
      </View>
    );
  };

  footerButton = () => {
    return (
      <View style={styles.footerView}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            const to = ['amit.motgi@gmail.com'] // string or array of email addresses
            email(to, {
              // Optional additional arguments
              subject: 'reduxsaga Wallet Address',
              body: 'LBA Wallet Address'
            }).catch((err) => {

            });
          }}>
          <Text style={
            styles.footerButtonLabel}>Email them</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            SendSMS.send({
              body: 'reduxsaga - Wallet Address',
              recipients: ['014088136286'],
              successTypes: ['sent', 'queued'],
              allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {
              console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
            });
          }}>
          <Text style={styles.footerButtonLabel}>Text them</Text>
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
          title={'Addresses'}
          hideStep
          hideMenu={false}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(20)}
        >
          {this.addressInfo()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const marginLeft = DimensionManager.scale(20);
const marginRight = DimensionManager.scale(20);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBlack
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  content: {
    flex: 1
  },
  headContentView: {
    marginTop: DimensionManager.verticalScale(31),
    marginBottom: DimensionManager.verticalScale(23),
    marginHorizontal: marginLeft
  },
  headContentText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack,
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 1.59 * 17
  },
  qrCodeView: {
    width: scale(183),
    height: scale(183),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: verticalScale(1),
    borderColor: Colors.reduxsagaGray,
    borderRadius: verticalScale(4),
    overflow: 'hidden',
    backgroundColor: Colors.transparent
  },
  text: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 1,
    color: Colors.reduxsagaBlack
  },
  copyView: {
    alignItems: 'center'
  },
  copyImage: {
    width: DimensionManager.scale(25),
    height: DimensionManager.verticalScale(25),
    resizeMode: 'contain'
  },
  footerView: {
    marginTop: DimensionManager.verticalScale(70),
    marginHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerButton: {
    width: DimensionManager.scale(157),
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  footerButtonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WalletAddressView));
