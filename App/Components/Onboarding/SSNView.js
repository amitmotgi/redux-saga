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
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import CodeInput from 'react-native-code-input';
import OnboardingActions from '../../Redux/Onboarding';
import WalletActions from '../../Redux/Wallet';
import DeviceInfo from 'react-native-device-info';
import { EventRegister } from 'react-native-event-listeners';

class SSNView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: 0
    };

    EventRegister.addEventListener('identityVerified', (data) => {
      const { navigation } = this.props;
      const { dispatch } = navigation;

      if (data.status) {
        dispatch(WalletActions.walletGetAddresses({
          uuid: this.props.user.uuid,
          jToken: this.props.user.jToken
        }));

        navigation.navigate('Congratulation');
      } else {
        // show an error page as the user could not be
        // allowed beyond this point on the App
        navigation.navigate('ApplicationInReview');
      }
    });
  }

  headerText() {
    return (
      <Text style={[Fonts.style.textRegularNormalGT,{
        color: Colors.transparent,
        textAlign: 'center'
      }]}>
        {I18n.t('last4SocialSecurity')}
      </Text>
    );
  }

  renderLabel(msg) {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(33)
      }}>
        <Text style={styles.label}>
          {msg}
        </Text>
      </View>
    );
  }

  getIndicatorImg() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image
          source={require('../Images/oval_white.png')}
          style={{
            height: DimensionManager.verticalScale(10),
            width: DimensionManager.scale(10),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/oval_white.png')}
          style={{
            height: DimensionManager.verticalScale(10),
            width: DimensionManager.scale(10),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/oval_white.png')}
          style={{
            height: DimensionManager.verticalScale(10),
            width: DimensionManager.scale(10),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />

        <Image
          source={require('../Images/dashes.png')}
          style={{
            height: DimensionManager.verticalScale(3),
            width: DimensionManager.scale(7),
            margin: DimensionManager.scale(6),
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />

        <Image
          source={require('../Images/oval_white.png')}
          style={{
            height: DimensionManager.verticalScale(10),
            width: DimensionManager.scale(10),
            marginLeft: DimensionManager.scale(3),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/oval_white.png')}
          style={{
            height: DimensionManager.verticalScale(10),
            width: DimensionManager.scale(10),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />

        <Image
          source={require('../Images/dashes.png')}
          style={{
            height: DimensionManager.verticalScale(3),
            width: DimensionManager.scale(7),
            margin: DimensionManager.scale(6),
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />

        <Image
          source={require('../Images/rectangle-blue.png')}
          style={{
            height: DimensionManager.verticalScale(14),
            width: DimensionManager.scale(14),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/rectangle-blue.png')}
          style={{
            height: DimensionManager.verticalScale(14),
            width: DimensionManager.scale(14),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/rectangle-blue.png')}
          style={{
            height: DimensionManager.verticalScale(14),
            width: DimensionManager.scale(14),
            marginLeft: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../Images/rectangle-blue.png')}
          style={{
            height: DimensionManager.verticalScale(14),
            width: DimensionManager.scale(14),
            marginLeft: DimensionManager.scale(5),
            marginRight: DimensionManager.scale(5),
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }

  getTextInput() {
    return (
      <CodeInput
        secureTextEntry={true}
        ref={'codeInputRef1'} // eslint-disable-line react/no-string-refs
        borderType={'square'}
        keyboardType={'numeric'}
        codeLength={4}
        space={20}
        inputPosition={'center'}
        size={50}
        autoFocus={true}
        codeInputStyle={{
          ...Fonts.style.h3BoldGT,
          backgroundColor: Colors.transparent,
          color: '#000',
        }}
        onFulfill={(code) => {
          this.setState({code});
        }}
      />
    );
  }

  setupPayload(codeInt) {
    const country = DeviceInfo.getDeviceCountry();

    var fullName = this.props.onboarding.FullName || '';
    var formatName = [], formateDate = [];
    if (fullName) {
      formatName = fullName.toString().split(" ");
    }
    var fullDate = this.props.onboarding.DateOfBirth || '';
    fullDate = fullDate && fullDate.split('/');

    formateDate[0] = fullDate[0];
    formateDate[1] = fullDate[1] ;
    formateDate[2] = fullDate[2];

console.log("formateDate[0] ", formateDate[0]);
console.log("formateDate[1] ", formateDate[1]);
console.log("formateDate[2] ", formateDate[2]);

    var expiryFullDate = this.props.onboarding.IDExpiryDate || '';
    expiryFullDate = expiryFullDate && expiryFullDate.split('/');

    var expiryFormateDate = [];

    expiryFormateDate[0] = expiryFullDate[0];
    expiryFormateDate[1] = expiryFullDate[1];
    expiryFormateDate[2] = expiryFullDate[2];

console.log("expiryFormateDate[0] ", expiryFormateDate[0]);
console.log("expiryFormateDate[1] ", expiryFormateDate[1]);
console.log("expiryFormateDate[2] ", expiryFormateDate[2]);

    var userInfo = {
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken || '',
      CountryCode: country || 'US',
      AcceptTruliooTermsAndConditions: true,
      DataFields: {
        PersonInfo: {
          FirstGivenName: formatName[0] || '',
          FirstSurName: formatName.length > 0 ? formatName[1] : '',
          MonthOfBirth: formateDate[0] || '',
          DayOfBirth: formateDate[1] || '',
          YearOfBirth: formateDate[2] || ''
        },
        'Location': {
          BuildingNumber: '',
          UnitNumber: '',
          StreetName: this.props.onboarding.Address1 || '',
          StreetType: '',
          City: this.props.onboarding.City || '',
          StateProvinceCode: this.props.onboarding.StateProvince || '',
          PostalCode: this.props.onboarding.PostalCode || ''
        },
        DriverLicence: {
          'Number': this.props.onboarding.DocumentNumber || '',
          State: this.props.onboarding.Issuer || '',
          DayOfExpiry: expiryFormateDate[1] || '',
          MonthOfExpiry: expiryFormateDate[0] || '',
          YearOfExpiry: expiryFormateDate[2] || ''
        },
        NationalIds: [{
          'Number': codeInt,
          Type: this.props.onboarding.nationalId
        }]
      }
    };

    return userInfo;

  }

  render() {
    const { onboarding, navigation } = this.props;
    const { dispatch } = navigation;
    const  {
      name,
      address,
      city,
      state,
      postalCode,
      idNumber,
      dateOfBirth
    } = onboarding;

    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.reduxsagaDarkBlue,
        paddingBottom: DimensionManager.verticalScale(120),
      }}>
        <View>
          <HeaderBarOnboardingView
            hideNextBtn={true}
            title={I18n.t('lastThing')}
            hideStep={true}
            navigateTo={'ReviewIdentityView'} />

          <View style={{
            marginLeft: DimensionManager.scale(38),
            marginRight: DimensionManager.scale(41),
            marginTop: DimensionManager.verticalScale(32),
          }}>
            {this.headerText()}
            <View style={{
              flexDirection: 'row',
              marginTop: DimensionManager.scale(12),
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {this.getIndicatorImg()}
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: DimensionManager.scale(6),
            }}>
              {this.getTextInput()}
            </View>

              <View style={{
                marginTop: DimensionManager.verticalScale(50),
                marginBottom: DimensionManager.verticalScale(43),
                alignSelf: 'center'
              }}>
                <TouchableOpacityView
                  active={true}
                  label={'Continue'}
                  invertColor={true}
                  onPress={() => {
                    var secrectCode = this.state.code;
                    const codeInt = secrectCode && parseInt(secrectCode, 10) || 0;
                    var reqPayload = this.setupPayload(codeInt);

                    dispatch(OnboardingActions.onboardingVerifyIdentity(reqPayload));
                    navigation.navigate('VerifyIdentity');
                  }} />
              </View>
            </View>
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  textField: {
    ...Fonts.style.textLightMediumGT,
    backgroundColor: Colors.transparent,
    color: Colors.reduxsagaBack,
    height: DimensionManager.verticalScale(48),
    width: DimensionManager.scale(48),
    textAlign: 'center',
    marginLeft: DimensionManager.scale(34),
    opacity: 1
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SSNView));
