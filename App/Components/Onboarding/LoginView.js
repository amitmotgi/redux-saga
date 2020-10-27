import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  StatusBar,
  PixelRatio
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import {
  withNavigation,
  SafeAreaView,
  StackActions,
  NavigationActions
} from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import WalletActions from '../../Redux/Wallet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginNavigateTo, TouchIDIsSupported } from '../../Utils/TouchIDUtils';
import LoginWithTouchID from './LoginWithTouchID';
import {
  SetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';
import GlobalStorage from '../../Common/Helper/GlobalStorage';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isActive: false,
      loginError: null,
      isPending: false,
      username: '',
      password: '',
      justSavedreduxsagaentials: false,
      useSavedreduxsagaentials: true,
      spinner: this.props.onboarding.spinner,
      hideBackButtonOnLogin: false,
      hasSavedreduxsagaentials: false,
      emailFocus: false,
      passwordFocus: false,
      rememberMe: true,
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.state = {
      ...this.state,
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
    };

    dispatch(UserActions.authenticateUser({
      loginErrorMsg: '',
      loginError: '',
      codeSentLogin: null
    }));

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

    if (this.state.context === 'LOGIN') {
      GlobalStorage.get('reduxsagaAppRegisterPushNotification')
      .then((val) => {
        if (val === null) {
          GlobalStorage.save('reduxsagaAppRegisterPushNotification', true);
          // Register the user for PushNotification
          if (this.props.user.deviceToken &&
            this.props.user.deviceToken.token) {
            dispatch(
              OnboardingActions.onboardingRegisterPushNotification({
                jToken: this.props.user.jToken,
                uuid: this.props.user.uuid,
                payload: {
                  device_id: this.props.user.deviceToken.token,
                  platform: Platform.OS.toUpperCase()
                }
              })
            );
            dispatch(OnboardingActions.onboardingUpdate({
              deviceRegistered: true
            }));
          }
        } else {
          // Device is already registered, no action is required
        }
      })
      .catch((err) => {

      });
    }
  }

  getErrorMessage() {
    return (
      <View
        style={[
          Fonts.style.textMediumLightGT,
          {
            marginTop: DimensionManager.verticalScale(12),
          }
        ]}
      >
        <Text
          style={[
            Fonts.style.textMediumLightGT,
            {
              color: Colors.transparent,
              opacity: 1,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(16)
            }
          ]}
        >
          {I18n.t('invalidLoginOrPassword')}
        </Text>
      </View>
    );
  }

  getEmail() {
    const { emailFocus } = this.state;

    const extraStyle = emailFocus
      ? { color: Colors.transparent, opacity: 1 }
      : { color: Colors.reduxsagaLightBlue, opacity: 1 };

    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(40),
          marginBottom: DimensionManager.verticalScale(1),
        }}
      >
        <Text style={[
          styles.label,
          extraStyle, {
            fontWeight: 'bold',
            fontSize: DimensionManager.scale(12),
            letterSpacing: DimensionManager.scale(1),
          }
        ]}>{I18n.t('UserID')}</Text>
      </View>
    );
  }

  getPassword() {
    const { passwordFocus } = this.state;

    const extraStyle = passwordFocus
      ? { color: Colors.transparent, opacity: 1 }
      : { color: Colors.reduxsagaLightBlue, opacity: 1 };

    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(45),
          marginBottom: DimensionManager.verticalScale(5),
        }}
      >
        <Text style={[
          styles.label,
          extraStyle, {
            fontWeight: 'bold',
            fontSize: DimensionManager.scale(12),
            letterSpacing: DimensionManager.scale(1),
          }
        ]}>{I18n.t('passwordLabel')}</Text>
      </View>
    );
  }

  login() {
    return null;
  }

  rememberAndTouchID = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: DimensionManager.verticalScale(20)
        }}
      >
        <LoginWithTouchID />
      </View>
    );
  };

  loginUser(dispatch, navigation) {
console.log(" loginUser loginUser >>>>")

    if (this.props.user.isLoggedIn) {

      SetUserreduxsagaentials({
        username: this.props.onboarding.username,
        password: this.props.onboarding.password
      });
      if (this.props.user && this.props.user.mobileVerified === false &&
        this.props.user.codeSentLogin === null && this.state.context === 'LOGIN') {

        //navigation.navigate('Dashboard');
        // Must trigger an SMS based on the User email
        dispatch(OnboardingActions.onboardingCodeStartSms({
          username: this.props.onboarding.username
        }));
        dispatch(UserActions.authenticateUser({
          codeVerifyStart: true,
          codeSentLogin: true
        }));

        navigation.navigate('ContinueCodeVerify', {
          context: 'LOGIN'
        });

      } else if (this.props.user && this.props.user.mobileVerified) {

        // check KYC status
        switch(this.props.user.kycStatus) {
          case 'SUCCESS':
            const resetActionDashboard = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({
                routeName: 'Dashboard',
                params: {
                  context: 'BURGER'
                }
              })],
            });
            navigation.dispatch(resetActionDashboard);
          break;

          case 'PENDING':
            const resetActionPersonal = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({
                routeName: 'NeedYourIDInfo',
                params: {
                  context: 'BURGER'
                }
              })],
            });
            navigation.dispatch(resetActionPersonal);
          break;

          case 'REVIEW':
            const resetActionInReview = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({
                routeName: 'ApplicationInReview',
                params: {
                  context: 'BURGER'
                }
              })],
            });
            navigation.dispatch(resetActionInReview);
          break;

          case 'FAIL':
            const resetActionDeclined = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({
                routeName: 'ApplicationDeclined',
                params: {
                  context: 'BURGER'
                }
              })],
            });
            navigation.dispatch(resetActionDeclined);
          break;

          default:
          break;
        }
      }
    } else {
      return null;
    }
  }

  labelInputColor = (type, showError = false) => {
    return type
      ? { color: Colors.transparent }
      : showError
        ? styles.showErrorLabel
        : { color: Colors.reduxsagaLightBlue };
  };

  loginIsActive = () => {
    const { password, email } = this.state;
    return email && password;
  };

  rememberMeCheck = () => {
    const { rememberMe } = this.state;
    return (
      <View style={{ marginTop: DimensionManager.verticalScale(20),marginLeft:DimensionManager.scale(-2) }}>
        <CheckBox
          rightText="Remember me"
          isChecked={rememberMe}
          rightTextStyle={{
            color: Colors.transparent,
            marginLeft: DimensionManager.scale(5)
          }}
          checkBoxColor={Colors.transparent}
          checkedCheckBoxColor={Colors.transparent}
          onClick={() => {
            this.setState({ rememberMe: !rememberMe });
          }}
        />
      </View>
    );
  };

  render() {
    const {
      navigation,
      onboarding: { enabledTouchID }
    } = this.props;
    const { emailFocus, passwordFocus } = this.state;
    const { dispatch } = navigation;

    {this.props.user.validateNow ? this.loginUser(dispatch, navigation) : null};

    return (
      // start using the translations
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.container}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          cameraText={'front'}
          hideNextBtn={true}
          hideStep={true}
          title={''}
          navigateTo={'Welcome'}
        />

        <Image
          style={{
            marginTop: DimensionManager.verticalScale(-50),
            resizeMode: 'contain',
            width: DimensionManager.scale(150),
            height: DimensionManager.verticalScale(137),
            marginRight: DimensionManager.scale(137),
            marginLeft: DimensionManager.scale(88),
          }}
          source={require('../Images/reduxsaga-logo.png')}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(130)}
        >
          <View
            style={{
              marginHorizontal: DimensionManager.scale(20),
              alignItems: 'center'
            }}
          >


            <View
              style={{
                width: '100%'
                // marginLeft: DimensionManager.scale(38)
              }}
            >
              {this.getEmail()}
              <View>
                <TextField
                  borderColor={this.labelInputColor(emailFocus).color}
                  //ref={'emailAddressTextField'} // eslint-disable-line react/no-string-refs
                  secureTextEntry={false}
                  placeholder={'Email address'}
                  placeholderTextColor={Colors.reduxsagaLightBlue}
                  errorMessage={'Must be at least 8 characters'}
                  autoCorrect={false}
                  //validation={() => this.validateEmail()}
                  blurOnSubmit={true}
                  value={this.state.email || ''}
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
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
                />
              </View>

              {this.getPassword()}
              <View>
                <TextField
                  borderColor={this.labelInputColor(passwordFocus).color}
                  //ref={'passwordTextField'} // eslint-disable-line react/no-string-refs
                  placeholder={'Case sensitive'}
                  placeholderTextColor={Colors.reduxsagaLightBlue}
                  label={'Password'}
                  secureTextEntry={true}
                  errorMessage={'Must be at least 8 characters'}
                  autoCorrect={false}
                  //validation={() => this.validatePassword()}
                  onSubmitEditing={() => this.login()}
                  onChangeText={text => {
                    this.setState({ password: text });
                  }}
                  blurOnSubmit={true}
                  value={this.state.password || ''}
                  onFocus={() =>
                    this.setState({
                      passwordFocus: true
                    })
                  }
                  onBlur={() =>
                    this.setState({
                      passwordFocus: false
                    })
                  }
                />
              </View>
              {/*{this.rememberAndTouchID()}*/}
              {this.props.user.loginError ? this.getErrorMessage() : null}

              <View
                style={{
                  marginTop: DimensionManager.verticalScale(175.5)
                }}
              >
                <TouchableOpacityView
                  invertColor={false}
                  active={
                    this.loginIsActive()
                    //this.state && this.state.isActive
                  }
                  style={{
                    alignSelf: 'center',
                    backgroundColor: this.loginIsActive()
                      ? Colors.reduxsagaGreen
                      : Colors.reduxsagaExtraDarkGray,
                    width: '100%',
                    height:DimensionManager.verticalScale(50),
                  }}
                  label={'Continue'}
                  onPress={() => {
                    this.setState({ spinner: true });
                    var userInfo = {
                      username: this.state.email,
                      password: this.state.password,
                      spinner: true
                    };

                    dispatch(OnboardingActions.onboardingLogin(userInfo));

                    // dispatch(OnboardingActions.onboardingGetUser({
                    //   uuid: this.props.user.uuid || '',
                    //   jToken: this.props.user.jToken,
                    // }));

                    // const touchIDNavigateNext = (navigateTo, enabledTouch = false) => {
                    //  // user.info enabled Touchid
                    //   const shouldNavigateTo = enabledTouch ? loginNavigateTo : navigateTo;
                    //   navigation.navigate(shouldNavigateTo);
                    // };

                    // TouchIDIsSupported({
                    //     TouchIDCallBack: () => {
                    //       touchIDNavigateNext('ActivateTouchID', enabledTouchID);
                    //     },
                    //     FaceIDCallBack: () => {
                    //       touchIDNavigateNext('ActivateFaceID',enabledTouchID);
                    //     },
                    //     NotSupportedCallBack: () => {
                    //       navigation.navigate(loginNavigateTo);
                    //     }
                    // });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ResetPasswordEmail');
                  }}
                >
                  <Text style={styles.forgotUsername}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  logoImage: {
    height: DimensionManager.verticalScale(56),
    width: DimensionManager.scale(70)
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBlack
  },
  forgotUsername: {
    ...Fonts.style.textMediumGT,
    textAlign: 'center',
    color: Colors.transparent,
    fontSize: DimensionManager.scale(16),
    marginTop: DimensionManager.verticalScale(12),
    lineHeight: DimensionManager.verticalScale(27)
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  showErrorLabel: {
    color: Colors.reduxsagaCoralRed,
    opacity: 1
  }
});

// TODO - should start using the Redux Selectors
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LoginView));
