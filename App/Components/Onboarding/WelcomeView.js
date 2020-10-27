import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  PanResponder,
  UIManager,
  InteractionManager,
  StatusBar
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import I18n from '../../I18n';
import {
  withNavigation,
  StackActions,
  NavigationActions,
  SafeAreaView
} from 'react-navigation';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import * as Analytics from '../../Analytics';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import WalletActions from '../../Redux/Wallet';
import LanguageSelect from '../../Common/LanguageSelect';
import {
  SetUserreduxsagaentials,
  GetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';
import AppIntroSlider from 'react-native-app-intro-slider';
import GlobalStorage from '../../Common/Helper/GlobalStorage';
import DeviceInfo from 'react-native-device-info';
import {
  BiometryDetection
} from '../../Common/Helper/Biometry';

class WelcomeView extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.state = {
      hideMarketing: true,
      biometry: this.props.onboarding && this.props.onboarding.biometry || {},
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
    };
  }

  languageSelectView() {
    return (
      <View style={styles.languageSelect}>
        {/*<LanguageSelect/>*/}
      </View>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(UserActions.authenticateUser({
      codeSent: null
    }));

    BiometryDetection(navigation);

    GlobalStorage.get('reduxsagaAppFirstLoad')
    .then((val) => {
      if (val === null) {
        GlobalStorage.save('reduxsagaAppFirstLoad', true);
        this.setState({hideMarketing: false});
      } else {
        this.setState({hideMarketing: true});
      }
    })
    .catch((err) => {

    });

    dispatch(OnboardingActions.onboardingFetchCountries({}));
    Analytics.trackEvent('Welcome: Screen: viewed');

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

  renderFaceidAnimation() {
    return null;
  }

  renderWelcome() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: Colors.reduxsagaDarkBlue
      }}>
      <StatusBar
        barStyle="light-content"
      />
      <Image style={{
          marginTop: DimensionManager.verticalScale(98),
          marginLeft: DimensionManager.scale(88),
          marginRight: DimensionManager.scale(137),
          resizeMode: 'contain',
          alignSelf: 'center',
          width: DimensionManager.scale(150),
          height: DimensionManager.verticalScale(137),
        }}
        source={require('../Images/reduxsaga-logo.png')} />
      <ScrollView style={styles.wrapper}>
        <Text style={[styles.headerText, {
          marginTop: DimensionManager.verticalScale(45),
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(32),
          textAlign: 'center',
          lineHeight: DimensionManager.verticalScale(36),
          letterSpacing: DimensionManager.scale(-0.5),
          color: '#9fbafb',
        }]}>
          {I18n.t('welcomeText')}
        </Text>
        <View>
          <View style={{
            alignSelf: 'center',
          }}>

            <TouchableOpacity
              onPress={() => {
                const { navigation } = this.props;
                const { dispatch } = navigation;

                Analytics.trackEvent('Welcome: Login button: Tapped');
                //GetUserreduxsagaentials(navigation);
                navigation.navigate('Login', {
                  context: 'LOGIN'
                });
              }}
              style={[styles.loginBtn, {
                marginTop: DimensionManager.verticalScale(218),
                width: DimensionManager.scale(335),
                height: DimensionManager.verticalScale(50),
                borderColor: Colors.reduxsagaGreen,
                borderWidth: 1,
                marginBottom: DimensionManager.verticalScale(20),
                justifyContent: 'center'
              }]}>
              <Text style={{
                ...Fonts.style.inputBoldGT,
                fontWeight: '500',
                color: Colors.reduxsagaGreen,
                textAlign: 'center',
              }}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacityView
              style={{
                backgroundColor: Colors.reduxsagaGreen,
                height:DimensionManager.verticalScale(50)
              }}
              active={true}
              label={'Sign me up!'}
              onPress={() => {
                Analytics.trackEvent('Welcome: Signup button: Tapped');

                navigation.navigate('Signup', {
                  context: 'SIGNUP'
                });
                // navigation.navigate('Dashboard');
                // navigation.navigate('CameraCapture');
                // navigation.navigate('PersonalInfoResidentVerify');
                // navigation.navigate('Congratulation');
                // navigation.navigate('Wallet');
                // navigation.navigate('ApplicationInReview');
                // navigation.navigate('StartCLOC');
                // navigation.navigate('BigSpender');
                // navigation.navigate('BigSpender');
                // navigation.navigate('WithDrawTransfer');
                // navigation.navigate('InputCardInfo');
                // navigation.navigate('Vault')
                // navigation.navigate('OneTimePayment');
                // navigation.navigate('WithDrawTransfer');
                // navigation.navigate('ApplicationDeclined');
                // navigation.navigate('RepaySuccess');
                // navigation.navigate('Scanning');
                // navigation.navigate('NeedYourIDInfo')
                 dispatch(WalletActions.walletGetAddresses({
                   uuid: this.props.user.uuid,
                   jToken: this.props.user.jToken
                 }))
                 //navigation.navigate('Congratulation');

              }} />
          </View>

          <View style={{
            flexDirection: 'column'
          }}>
            <Text style={{
              ...styles.titleStyle,
              fontSize: DimensionManager.scale(12),
              fontWeight: '200',
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(40),
              opacity: 0.5
            }}>
              V{DeviceInfo.getVersion()}-{DeviceInfo.getBuildNumber()}
            </Text>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }

  onDone() {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    return this.renderWelcome();
  }

  renderAppMarketing() {
    const slides = [
      {
        key: 'screen-1',
        title: 'Single digit \ninterest rates',
        titleStyle: styles.titleStyle,
        text: 'Stop getting hit with high intererst rates on your cards and at the bank. Get single-digit rates when you use your LBA and crypto as collateral.',
        textStyle: [styles.textStyle, {
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }],
        image: require('../Images/app-explainer-02.png'),
        imageStyle: {
          height: DimensionManager.verticalScale(243),
          width: DimensionManager.scale(201)
        },
        backgroundColor: Colors.reduxsagaDarkBlue,
      },
      {
        key: 'screen-2',
        title: 'Keep your crypto \nand get cash now',
        titleStyle: styles.titleStyle,
        text: 'Get the best of both worlds! Hold on to the value of your crypto while gaining access to liquidity through your crypto reduxsagait line.',
        textStyle: [styles.textStyle, {
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }],
        image: require('../Images/app-explainer-01.png'),
        imageStyle: {
          height: DimensionManager.verticalScale(227),
          width: DimensionManager.scale(244)
        },
        backgroundColor: Colors.reduxsagaDarkBlue,
      },
      {
        key: 'screen-3',
        title: 'No reduxsagait check\nrequired',
        titleStyle: styles.titleStyle,
        text: 'Concerned about reduxsagait checks? \nreduxsaga allows you to access a reduxsagait line without a reduxsagait check, all you have to do is own crypto.',
        textStyle: [styles.textStyle, {
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }],
        image: require('../Images/app-explainer-03.png'),
        imageStyle: {
          height: DimensionManager.verticalScale(249),
          width: DimensionManager.scale(204)
        },
        backgroundColor: Colors.reduxsagaDarkBlue,
      }
    ];

    if (!this.state.hideMarketing) {
      return  (
        <AppIntroSlider
          bottomButton={true}
          buttonStyle={{
            //backgroundColor: Colors.reduxsagaGreen,
          }}
          dotStyle={{
            borderColor: Colors.reduxsagaGreen,
            borderWidth: 1,
          }}
          activeDotStyle={{
            backgroundColor: Colors.reduxsagaGreen
          }}
          slides={slides}
          renderDoneButton={() => {
            return(
              <TouchableOpacityView
                style={{
                  backgroundColor: Colors.reduxsagaGreen,
                  height:DimensionManager.verticalScale(50),
                  alignSelf: 'center'
                }}
                active={true}
                label={'Continue'}
                onPress={() => {
                  GlobalStorage.save('reduxsagaAppFirstLoad', true);
                  this.setState({hideMarketing: true});
                }}
              />
            )
          }} />
        );
      } else {
        return this.renderWelcome();
      }

  }

  loginUser(dispatch, navigation) {
console.log("this.state.context >>> WELCOME ", this.state.context);

    if (this.props.user.isLoggedIn) {

      if (this.props.user && this.props.user.mobileVerified === false &&
        this.props.user.codeSent === null && this.state.context !== 'SIGNUP' &&
        this.state.context !== 'LOGIN' && this.state.context !== '') {
        //navigation.navigate('Dashboard');
        // Must trigger an SMS based on the User email
        dispatch(OnboardingActions.onboardingCodeStartSms({
          username: this.props.onboarding.username
        }));

        dispatch(UserActions.authenticateUser({
          codeVerifyStart: true,
          codeSent: true
        }));

        const resetCodeVerify = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'CodeVerify',
            params: {
              context: 'BURGER'
            }
          })],
        });
        navigation.dispatch(resetCodeVerify);

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
                routeName: 'PersonalInfoResidentVerify',
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

  render() {
    const { onboarding, navigation } = this.props;
    const { dispatch } = navigation;
    const { biometry } = onboarding;
    const { user } = this.props;
    const dashboardView = user || false;
    const isLoggedIn = this.props.user &&
      this.props.user.isLoggedIn;
    const biometryStatus = this.props.user &&
      this.props.user.biometryStatus;

    if (this.state.hideMarketing) {
      if (!isLoggedIn && biometry && !biometryStatus
        && biometry.type === 'NoID') {
        // At this point force the user to login
        return this.renderWelcome();
      } else if (isLoggedIn) {

        this.props.user.validateNow ? this.loginUser(dispatch, navigation) : null;

      }
      return this.renderWelcome();
    } else {
      return this.renderAppMarketing();
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  languageSelect:{
    flexDirection: 'column',
    marginTop:DimensionManager.verticalScale(18),
    marginRight: DimensionManager.scale(40),
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  headerText: {
    ...Fonts.style.textRegularNormalGT,
    textAlign: 'center',
    color: Colors.transparent,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  signupBtn: {
    backgroundColor: Colors.reduxsagaGreen,
    borderRadius: 5,
    width: DimensionManager.scale(220),
    height: DimensionManager.verticalScale(40)
  },
  loginBtn: {
    marginTop: DimensionManager.verticalScale(20)
  },
  login: {
    ...Fonts.style.inputBoldGT,
    color: Colors.transparent,
    textAlign: 'center',
    fontSize: 14,
    fontWeight:'300'
  },
  titleStyle: {
    ...Fonts.style.textRegularNormalGT,
    fontSize: DimensionManager.scale(32),
    color: '#9fbafb',
    fontWeight: '500',
    lineHeight: DimensionManager.verticalScale(36),
    letterSpacing: DimensionManager.scale(0.14),
    textAlign: 'center',
    marginTop: DimensionManager.verticalScale(-22)
  },
  textStyle: {
    ...Fonts.style.textRegularNormalGT,
    fontSize: DimensionManager.scale(18),
    color: '#9fbafb',
    fontWeight: 'normal',
    lineHeight: DimensionManager.verticalScale(24),
    textAlign: 'center',
  }
});

WelcomeView.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WelcomeView));
