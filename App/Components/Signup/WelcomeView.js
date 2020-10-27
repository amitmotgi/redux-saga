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
  SafeAreaView,
  PixelRatio
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import I18n from '../../I18n';
import {
  withNavigation,
  StackActions,
  NavigationActions
} from 'react-navigation';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import * as Analytics from '../../Analytics';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import LanguageSelect from '../../Common/LanguageSelect';

class WelcomeView extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.state = {
      biometry: this.props.onboarding && this.props.onboarding.biometry || {},
    };
  }

  languageSelectView() {
    return (
      <View style={styles.languageSelect}>
        <LanguageSelect/>
      </View>
    );
  }

  componentDidMount() {

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

  renderWelcome() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.transparent,
      }}>

      <ScrollView style={styles.wrapper}>
        <Image style={{
            marginTop: DimensionManager.verticalScale(44),
            marginLeft: DimensionManager.scale(102),
            marginRight: DimensionManager.scale(144),
            resizeMode: 'contain',
            alignSelf: 'center',
            width: DimensionManager.scale(129),
            height: DimensionManager.verticalScale(117),
          }}
          source={require('./Images/reduxsagaLogo.png')} />

        <View style={{
          height: DimensionManager.verticalScale(405),
        }}>
        </View>

        <Text style={styles.headerText}>
          {I18n.t('welcomeText')}
        </Text>
        <Text style={styles.headerText}>
          {I18n.t('toYourPotential')}
        </Text>

        <View>
          <View style={{
            alignSelf: 'center',
          }}>
            <TouchableOpacityView
              style={{
                backgroundColor: Colors.reduxsagaGreen,
                marginTop: DimensionManager.verticalScale(24),
                borderRadius: DimensionManager.scale(5),
              }}
              active={true}
              label={'Sign me up'}
              onPress={() => {
                Analytics.trackEvent('Welcome: Signup button: Tapped');

                 navigation.navigate('StartSignUp');
                // navigation.navigate('Dashboard');
                // navigation.navigate('CameraCapture');
                // navigation.navigate('Dashboard');
              }}>
              </TouchableOpacityView>
          </View>

          <TouchableOpacity
            onPress={() => {
              Analytics.trackEvent('Welcome: Login button: Tapped');
              this.props.navigation.navigate('Login');
            }}
            style={styles.loginBtn}>
            <Text style={styles.login}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
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

    if (!isLoggedIn && biometry && !biometryStatus
      && biometry.type === 'NoID') {
      // At this point force the user to login
      return this.renderWelcome();
    } else if (isLoggedIn) {
      const resetFaceIDAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Dashboard'
        })],
      });
      this.props.navigation.dispatch(resetFaceIDAction);
    }
    return this.renderWelcome();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  languageSelect:{
    flexDirection: 'column',
    marginTop: DimensionManager.verticalScale(18),
    marginRight: DimensionManager.scale(40),
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  headerText: {
    ...Fonts.style.textRegularNormalGT,
    textAlign: 'center',
    color: Colors.reduxsagaLightBlue,
    fontSize: DimensionManager.scale(21),
    lineHeight: DimensionManager.scale(26),
    letterSpacing: DimensionManager.scale(0.1),
    fontWeight: '300',
    fontStyle: 'normal',
  },
  signupBtn: {
    backgroundColor: Colors.reduxsagaGreen,
    borderRadius: 5,
    width: DimensionManager.scale(220),
    height: DimensionManager.verticalScale(40),
    alignSelf: 'center',
  },
  loginBtn: {
    marginTop: DimensionManager.verticalScale(19),
    alignSelf: 'center'
  },
  login: {
    ...Fonts.style.inputBoldGT,
    color: Colors.reduxsagaGreen,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: DimensionManager.scale(17),
    letterSpacing: DimensionManager.scale(0.1),
    fontStyle: 'normal',
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
