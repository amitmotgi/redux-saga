import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  PanResponder,
  UIManager,
  InteractionManager,
  Dimensions,
  NativeModules
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import TextField from '../../Common/TextField';
import PhoneInput from 'react-native-phone-input';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import { signUpPasswordCheck } from '../../Utils/PasswordCheck';
import Modal from 'react-native-modal';
import TextFieldSides from '../../Common/TextFieldSides';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalView from '../../Common/ModalView';
import { MaskService } from 'react-native-masked-text';
import { PageStyleConfig } from '../../Config/PageStyleConfig';
import {
  SetUserreduxsagaentials,
  GetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mobile: '',
      mobileFormat: '',
      createPasswordFocus: false,
      createPasswordEyes: false,
      confirmPassword: '',
      confirmPasswordEyes: false,
      confirmPasswordFocus: false,
      samePassword: undefined,
      checked: false,
      validToContine: false,
      showModal: false,
      emailFocus: false,
      phoneFocus: false,
      codeVerifyStart: this.props.user.codeVerifyStart,
      errorMessage: this.props.user.errorMessage || '',
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
    };
  }

  componentDidMount() {
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
  }

  componentWillUnMount() {}

  headerText() {
    const { navigation } = this.props;
    return (
      <View style={{}}>
        <Text
          style={[
            Fonts.style.textBoldGT,
            {
              opacity: 1,
              lineHeight: DimensionManager.verticalScale(27),
              fontSize: DimensionManager.scale(18),
              fontWeight: 'normal',
              color: '#0a0f13'
            }
          ]}
        >
          {i18n.t('signupMsg')}
        </Text>
      </View>
    );
  }

  getEmail() {
    const { emailFocus } = this.state;

    const extraStyle = emailFocus
      ? { color: Colors.reduxsagaDarkBlue, opacity: 1 }
      : this.props.user.showError
        ? { ...styles.showErrorLabel, opacity: 1 }
        : { color: '#9ca5b5', opacity: 1 };

    return (
      <View
        style={[
          {
            marginTop: DimensionManager.verticalScale(37)
          },
          styles.TitleAndInputMargin
        ]}
      >
        <Text
          style={[
            styles.label,
            extraStyle,
            {
              fontWeight: 'bold',
              fontSize: DimensionManager.scale(12),
              letterSpacing: 1
            }
          ]}
        >
          {i18n.t('UserID')}
        </Text>
      </View>
    );
  }

  // TODO add changePassword logic
  getErrorMessage() {
    return (
      <View
        style={[
          {
            // marginTop: DimensionManager.verticalScale(12),
            flexDirection: 'row',
            justifyContent: 'space-between'
          }
        ]}
      >
        <Text
          style={[
            Fonts.style.textMediumLightGT,
            styles.showErrorLabel,
            { fontSize: 12,lineHeight:12 * 1.5 ,fontWeight:'normal'}
          ]}
        >
          Please enter a valid email address
        </Text>
        <TouchableOpacity
          onPress={() => {
            // TODO add logic
          }}
        >
          <Text
            style={[
              Fonts.style.textMediumLightGT,
              { color: Colors.reduxsagaDarkBlue, opacity: 1 },
              { fontSize: 12,  lineHeight:12 * 1.5,fontWeight:'bold'}
            ]}
          >
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  getMobile() {
    const { phoneFocus } = this.state;

    const extraStyle = phoneFocus
      ? { color: Colors.reduxsagaDarkBlue, opacity: 1 }
      : { color: '#9ca5b5', opacity: 1 };

    return (
      <View
        style={[
          {
            marginTop: DimensionManager.verticalScale(46),
            marginBottom: DimensionManager.verticalScale(8)
          }
        ]}
      >
        <Text
          style={[
            styles.label,
            extraStyle,
            {
              fontWeight: 'bold',
              fontSize: DimensionManager.scale(12),
              letterSpacing: 1
            }
          ]}
        >
          PHONE NUMBER
        </Text>
      </View>
    );
  }

  labelInputColor = (type, showError = false) => {
    return type
      ? { color: Colors.reduxsagaCornflowerBlue }
      : showError
        ? styles.showErrorLabel
        : { color: Colors.reduxsagaConcreteGray };
  };

  passwordTitleAndBorder = () => {
    const { createPasswordFocus, matchAllCondition } = this.state;

    const extraStyle =
      matchAllCondition === undefined && !createPasswordFocus
        ? { color: Colors.reduxsagaExtraDarkGray, opacity: 1, borderColor: Colors.reduxsagaConcreteGray }
        : matchAllCondition === undefined && createPasswordFocus
          ? { color: Colors.reduxsagaDarkBlue, opacity: 1, borderColor: Colors.reduxsagaCornflowerBlue }
          : matchAllCondition
            ? { color: Colors.reduxsagaDarkBlue, opacity: 1, borderColor: Colors.reduxsagaCornflowerBlue }
            : { color: Colors.reduxsagaExtraRed, opacity: 1, borderColor: Colors.reduxsagaExtraRed };
    return extraStyle;
  };

  confirmPasswordTitleAndBorder = () => {
    const { confirmPasswordFocus, samePassword } = this.state;

    const extraStyle =
      samePassword === undefined && !confirmPasswordFocus
        ? { color: Colors.reduxsagaExtraDarkGray, opacity: 1, borderColor: Colors.reduxsagaConcreteGray }
        : samePassword === undefined && confirmPasswordFocus
          ? { color: Colors.reduxsagaDarkBlue, opacity: 1, borderColor: Colors.reduxsagaCornflowerBlue }
          : samePassword
            ? { color: Colors.reduxsagaDarkBlue, opacity: 1, borderColor: Colors.reduxsagaCornflowerBlue }
            : { color: Colors.reduxsagaCornflowerBlue, opacity: 1, borderColor: Colors.reduxsagaCornflowerBlue };
    return extraStyle;
  };

  getCreatePassword = () => {
    const extraStyle = this.passwordTitleAndBorder();
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(60),
          marginBottom: DimensionManager.verticalScale(6)
        }}
      >
        <Text
          style={[
            styles.label,
            extraStyle,
            {
              fontWeight: 'bold',
              fontSize: DimensionManager.scale(12),
              letterSpacing: 1
            }
          ]}
        >
          PASSWORD
        </Text>
      </View>
    );
  };

  getConfirmPassword = () => {
    const extraStyle = this.confirmPasswordTitleAndBorder();
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(45),
          marginBottom: DimensionManager.verticalScale(6)
        }}
      >
        <Text
          style={[
            styles.label,
            extraStyle,
            {
              fontWeight: 'bold',
              fontSize: DimensionManager.scale(12),
              letterSpacing: 1
            }
          ]}
        >
          REENTER PASSWORD
        </Text>
      </View>
    );
  };

  validationAndIcon = ({ text, typeBoolean, fontSize = 15 }) => {
    const color =
      typeBoolean === undefined
        ? Colors.reduxsagaBlack
        : typeBoolean
          ? Colors.reduxsagaDarkBlue
          : Colors.reduxsagaRed;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {/*<Icon name="check-circle" size={11} color={color} />*/}
        <Text
          style={[
            Fonts.style.textMediumGT,
            {
              fontSize,
              color // marginLeft: DimensionManager.scale(8)
            }
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };

  startValidation = () => {
    const { hasEnoughLength, hasOneNumber, hasSpecialSymbols } = this.state;

    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(11)
        }}
      >
        {/*<Text style={Fonts.style.textMediumGT}>{I18n.t('8Characters')}</Text>*/}
        {/*<Text style={Fonts.style.textMediumGT}>{I18n.t('1number')}</Text>*/}
        {/*<Text style={Fonts.style.textMediumGT}>{I18n.t('1SpecialCharacter')}</Text>*/}

        {this.validationAndIcon({ text: i18n.t('8Characters'), typeBoolean: hasEnoughLength })}
        {this.validationAndIcon({ text: i18n.t('1number'), typeBoolean: hasOneNumber })}
        {this.validationAndIcon({
          text: i18n.t('1SpecialCharacter'),
          typeBoolean: hasSpecialSymbols
        })}
      </View>
    );
  };

  confirmPasswordValidation = () => {
    const { samePassword } = this.state;

    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(8)
        }}
      />
    );
  };

  getBiometryType() {
    return null;

    // console.log(" TouchID", TouchID);
    //     //https://github.com/naoufal/react-native-touch-id#example
    //     if (TouchID) {
    //       TouchID.isSupported()
    //       .then(biometryType => {
    //         // Success code
    //         if (biometryType === 'FaceID') {
    //           console.log('FaceID is supported.');
    //           return (
    //             <View style={{
    //
    //             }}>
    //               <Text style={{
    //                 fontSize: Math.round(Fonts.size.tiny * DimensionManager.widthScale),
    //
    //               }}>
    //               {i18n.t('activateFaceID')}
    //               </Text>
    //             </View>
    //           );
    //         } else {
    //             console.log('TouchID is supported.');
    //           return (
    //             <View style={{
    //
    //             }}>
    //               <Text style={{
    //                 fontSize: Math.round(Fonts.size.tiny * DimensionManager.widthScale),
    //
    //               }}>
    //               {i18n.t('activateFingerPrint')}
    //               </Text>
    //             </View>
    //           );
    //         }
    //       })
    //       .catch(error => {
    //         // Failure code
    //         console.log(error);
    //         if (error == 'RCTTouchIDNotSupported') {
    //           // then we do not show any touchID enabling setting
    //         }
    //       });
    //
    //     }
  }

  renderModal() {
    return (
      <View>
        <ModalView
          isVisible={this.state.showModal}
          title={'Terms & Conditions'}
          subTitle={'Posted on 8/28/2018'}
          onPress={() => this.setState({ showModal: false })}
          showCloseBtn={true}
        />
      </View>
    );
  }

  getTC() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(45)
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
          label={i18n.t('reduxsagaTermsAndConditions')}
          labelStyle={[Fonts.style.textMediumGT,{ marginLeft: DimensionManager.scale(2)}]}
          checked={this.state.checked}
          onChange={() => this.setState({ checked: !this.state.checked })}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ showModal: true });
          }}
        >
          <Text
            style={[
              Fonts.style.textMediumGT,
              {
                // textDecorationLine: 'underline',
                opacity: 1,
                color: Colors.reduxsagaDarkBlue,
                fontWeight: '500',
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                left: DimensionManager.verticalScale(-5),
                bottom: DimensionManager.verticalScale(4),
                lineHeight: DimensionManager.verticalScale(18)
              }
            ]}
          >
            {i18n.t('terms&Conditions')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  getTermsAndConditions() {
    return (
      <View
        style={{
          backgroundColor: Colors.reduxsagaExtraLightGrayTC,
          marginTop: DimensionManager.verticalScale(25),
          paddingHorizontal: DimensionManager.scale(20),
          paddingTop: DimensionManager.scale(36),
          paddingBottom: DimensionManager.scale(53 - 44)
        }}
      >
        <Text
          style={{
            ...Fonts.style.textSmallGT,
            width: '100%',
            textAlign: 'left',
            color: Colors.reduxsagaExtraDarkGray,
            opacity: 1,
            fontSize: 13,
            lineHeight: 1.38 * 13
          }}
        >
          {i18n.t('tc')}
        </Text>
      </View>
    );
  }

  hasSamePassword = (val1, val2) => {
    return { samePassword: val1 === val2 };
  };

  validatePassword = value => {
    const checkPassword = {
      ...signUpPasswordCheck(value),
      ...this.hasSamePassword(value, this.state.confirmPassword)
    };

    this.setState({
      password: value,
      ...checkPassword
    });
  };

  validateConfirmPassword = value => {
    const checkPassword = this.hasSamePassword(this.state.password, value);
    this.setState({
      confirmPassword: value,
      ...checkPassword
    });
  };

  renderPhone() {
    const { phoneFocus } = this.state;
    //https://www.npmjs.com/package/react-native-phone-input

    try {
      return (
        <View>
          {this.getMobile()}
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry={'us'}
            flagStyle={{
              height: DimensionManager.verticalScale(28),
              width: DimensionManager.scale(28),
              borderRadius: 5
            }}
            style={{
              borderBottomWidth: 1,
              borderColor: this.labelInputColor(phoneFocus).color,
              // width: DimensionManager.scale(295),
              paddingBottom: DimensionManager.verticalScale(2)
            }}
            textStyle={{
              ...Fonts.style.textLightGT,
              fontWeight: '500',
              color: this.labelInputColor(phoneFocus).color
            }}
            value={this.state.mobileFormat || ''}
            getValue={text => {
              //never called
              this.setState({ mobile: text });
            }}
            onChangePhoneNumber={code => {
              var disPlayMobile = MaskService.toMask('cel-phone', code, {
                withDDD: true,
                /**
                 * 9 - accept digit.
                 * A - accept alpha.
                 * S - accept alphanumeric.
                 * * - accept all, EXCEPT white space.
                 */
                dddMask: '+9 (999)-999-9999'
              });
              this.setState({ mobileFormat: disPlayMobile });

              var saveMobile = MaskService.toMask('cel-phone', code, {
                withDDD: true,
                dddMask: '+99999999999' //+14088136222
              });
              this.setState({ mobile: code });
              this.setState({ phoneFocus: true });
            }}
            textProps={{
              onFocus: () =>
                this.setState({
                  phoneFocus: true
                }),
              onBlur: () =>
                this.setState({
                  phoneFocus: false
                })
            }}
          />
        </View>
      );
    } catch (err) {}
  }

  createPasswordRightElement = type => {
    return null;
    return (
      <TouchableOpacity
        style={styles.passwordRight}
        onPress={() => {
          this.setState(preState => ({ [type]: !preState[type] }));
        }}
      >
        <Icon size={20} name={!this.state[type] ? 'eye-slash' : 'eye'} />
      </TouchableOpacity>
    );
  };

  buttonDisabled = () => {
    const { email, matchAllCondition, samePassword } = this.state;

    return this.state.checked && email && matchAllCondition && samePassword;
  };

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    const {
      email,
      password,
      createPasswordEyes,
      confirmPassword,
      confirmPasswordEyes,
      emailFocus
    } = this.state;

    const createPasswordColor = this.passwordTitleAndBorder().borderColor;
    const confirmPasswordColor = this.confirmPasswordTitleAndBorder().borderColor;
    // console.log('render',this.state,createPasswordColor);

    if (this.props.user.codeVerifyStart && this.state.context === 'SIGNUP') {
      // saving the user reduxsagaentials in secured keychain
      SetUserreduxsagaentials({
        username: this.props.onboarding.username,
        password: this.props.onboarding.password
      });

      dispatch(UserActions.authenticateUser({
        codeVerifyStart: false,
      }));
      // when the Signup API response if valid
      // Navigate to next screen
      //navigation.navigate('CodeVerify');
      navigation.navigate('AccountCreationSuccess', {
        context: 'SIGNUP'
      });
    }

    return (
      //start using the translations
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          title={i18n.t('signupHeader')}
          stepValue={1}
          hideNextBtn={true}
          navigateTo={'ConfirmContactInfo'}
          hideStep={true}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(20)}
        >
          <View
            style={{
              backgroundColor: Colors.transparent
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                marginHorizontal: DimensionManager.scale(PageStyleConfig.leftNumber),
                marginTop: DimensionManager.verticalScale(34)
              }}
            >
              {this.headerText()}
              {this.getEmail('Email Address')}
              <TextField
                borderColor={this.labelInputColor(emailFocus, this.props.user.showError).color}
                // textColor={Colors.reduxsagaCornflowerBlue}
                label={'Email Address'}
                placeholder={'Email address'}
                keyboardType={'email-address'}
                errorMessage={'Enter a valid email address'}
                autoCorrect={false}
                onFocus={() =>
                  this.setState({
                    emailFocus: true
                  })
                }
                onBlur={() =>
                  this.setState({
                    emailFocus: false
                  })
                }
                onChangeText={text => {
                  this.setState({ email: text });
                }}
                value={email}
              />
              {this.props.user.showError ? this.getErrorMessage() : null}

              {this.renderPhone()}

              {this.getCreatePassword()}
              <TextFieldSides
                borderColor={createPasswordColor}
                //textColor={Colors.reduxsagaCornflowerBlue}
                placeholder={'1 number, 8 character, 1 special char'}
                label={'Create Password'}
                secureTextEntry={!createPasswordEyes}
                errorMessage={'Must be at least 8 characters'}
                autoCorrect={false}
                onChangeText={this.validatePassword}
                value={password}
                onFocus={() =>
                  this.setState({
                    createPasswordFocus: true
                  })
                }
                onBlur={() =>
                  this.setState({
                    createPasswordFocus: false
                  })
                }
                rightElement={this.createPasswordRightElement('createPasswordEyes')}
                textFieldViewStyle={{ width: '100%' }}
                rightViewStyle={{
                  width: '0%',
                  borderBottomColor: createPasswordColor,
                  marginLeft: DimensionManager.verticalScale(-1)
                }}
              />

              {this.getConfirmPassword()}
              <TextFieldSides
                borderColor={confirmPasswordColor}
                //textColor={Colors.reduxsagaCornflowerBlue}
                placeholder={'Same password'}
                label={'Confirm Password'}
                secureTextEntry={!confirmPasswordEyes}
                errorMessage={'Password does not match'}
                autoCorrect={false}
                onChangeText={this.validateConfirmPassword}
                value={confirmPassword}
                onFocus={() =>
                  this.setState({
                    confirmPasswordFocus: true,
                    phoneFocus: false
                  })
                }
                onBlur={() =>
                  this.setState({
                    confirmPasswordFocus: false,
                    phoneFocus: false
                  })
                }
                rightElement={this.createPasswordRightElement('confirmPasswordEyes')}
                textFieldViewStyle={{ width: '100%' }}
                rightViewStyle={{
                  width: '0%',
                  borderBottomColor: confirmPasswordColor,
                  marginLeft: DimensionManager.verticalScale(-1)
                }}
              />
              {this.confirmPasswordValidation()}
              {this.getTC()}

              <View
                style={{
                  marginTop: DimensionManager.verticalScale(17),
                  alignSelf: 'center'
                }}
              >
                <TouchableOpacityView
                  active={this.buttonDisabled()}
                  label={'Continue'}
                  onPress={() => {
                    var numberClean = this.phone.getValue();
                    var countryCode = this.phone.getCountryCode();

                    numberClean = numberClean.replace('+', '');
                    var phoneNumber = [],
                      j = 0;
                    for (var idx = 0; idx < numberClean.length; idx++) {
                      if (idx > countryCode.length - 1) {
                        if (
                          numberClean[idx] !== ' ' &&
                          numberClean[idx] !== '-' &&
                          numberClean[idx] !== '(' &&
                          numberClean[idx] !== ')'
                        ) {
                          phoneNumber[j++] = numberClean[idx];
                        }
                      }
                    }
                    phoneNumber = phoneNumber.join([]);

                    // request the backend for the code based on the emailaddress
                    dispatch(
                      OnboardingActions.onboardingRegisterUser({
                        email: this.state.email,
                        username: this.state.email,
                        mobileNumber: phoneNumber,
                        password: this.state.password,
                        countryCode: countryCode,
                        tcEnabled: this.state.checked || true
                      })
                    );

                    dispatch(
                      UserActions.authenticateUser({
                        errorMessage: null,
                        invalidCode: false
                      })
                    );
                  }}
                />
              </View>

              {this.getBiometryType()}
            </View>
            {this.state.showModal ? this.renderModal() : null}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaExtraDarkGray
  },
  passwordRight: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: DimensionManager.verticalScale(45),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  showErrorLabel: {
    color: Colors.reduxsagaExtraRed,
    opacity: 1
  },
  TitleAndInputMargin: {
    marginBottom: DimensionManager.verticalScale(5)
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(SignupView));
