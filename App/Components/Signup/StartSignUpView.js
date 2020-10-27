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
  NativeModules,
  SafeAreaView
} from 'react-native';

import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import PhoneInput from 'react-native-phone-input';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderSignUpView from '../../Common/HeaderSignUpView';
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

class StartSignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mobile: '',
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
      stateMachine: 0
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

  componentWillUnMount() {

  }

  headerText() {
    return (
      <Text style={
        [Fonts.style.textBoldGT, {
          lineHeight: DimensionManager.verticalScale(26),
        }]}>{i18n.t('signupMsg')}
      </Text>
    );
  }

  getEmail() {
    const { emailFocus } = this.state;

    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(8),
        }}
      >
        <Text style={[styles.label, {
            textAlign: 'center',
            fontSize: DimensionManager.scale(27),
            fontWeight: '300',
            color: Colors.reduxsagaGreen,
            opacity: 1,
            letterSpacing: DimensionManager.scale(0.1)
          }
        ]}>{i18n.t('youAreHalfWayThere')}</Text>

        <Text style={[styles.label, styles.mobileLabel
        ]}>{i18n.t('emailAddressLabel')}</Text>

        {this.renderContinue()}
        {this.renderOhMissedBtn(i18n.t('waitINeedToRedoIt'))}
      </View>
    );
  }

  renderOhMissedBtn(text) {
    return (
      <TouchableOpacity
        style={{
          marginTop: DimensionManager.verticalScale(19),
          borderRadius: DimensionManager.scale(5),
        }}
        onPress={() => {
          if (this.state.stateMachine > 0) {
            this.setState({stateMachine: this.state.stateMachine - 1})
          } else {
            this.props.navigation.navigate('Welcome')
          }
        }}
      >
        <Text style={{
          textAlign: 'center',
          fontSize: DimensionManager.scale(17),
          fontWeight: '300',
          color: Colors.reduxsagaGreen,
          opacity: 1,
          letterSpacing: DimensionManager.scale(0.1)
        }}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  getErrorMessage() {
    return (
      <View
        style={[Fonts.style.textMediumLightGT, {
          marginTop: DimensionManager.verticalScale(12),
        }]}
      >
        <Text style={[Fonts.style.textMediumLightGT, {
          color: Colors.reduxsagaRed,
          opacity: 1
        }]}>{i18n.t('emailAddressAlreadyRegistered')}</Text>
      </View>
    );
  }

  getMobile() {
    const { phoneFocus } = this.state;

    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(8),
        }}
      >
        <Text style={[styles.label, {
            textAlign: 'center',
            fontSize: DimensionManager.scale(27),
            fontWeight: '300',
            color: Colors.reduxsagaGreen,
            opacity: 1,
            letterSpacing: DimensionManager.scale(0.1)
          }
        ]}>{i18n.t('mobileHeaderText')}</Text>

        <Text style={[styles.label, styles.mobileLabel
        ]}>{i18n.t('mobileLabel')}</Text>

      </View>
    );
  }

  passwordTitleAndBorder = () => {
    const { createPasswordFocus, matchAllCondition } = this.state;

    const extraStyle =
      matchAllCondition === undefined && !createPasswordFocus
        ? { color: Colors.reduxsagaBlack }
        : matchAllCondition === undefined && createPasswordFocus
          ? { color: Colors.reduxsagaActiveBlue, opacity: 1 }
          : matchAllCondition
            ? { color: Colors.reduxsagaBlack }
            : { color: Colors.reduxsagaRed, opacity: 1 };
    return extraStyle;
  }

  confirmPasswordTitleAndBorder = () => {
    const { confirmPasswordFocus, samePassword } = this.state;

    const extraStyle =
      samePassword === undefined && !confirmPasswordFocus
        ? { color: Colors.reduxsagaBlack }
        : samePassword === undefined && confirmPasswordFocus
          ? { color: Colors.reduxsagaActiveBlue, opacity: 1 }
          : samePassword
            ? { color: Colors.reduxsagaBlack }
            : { color: Colors.reduxsagaRed, opacity: 1 };
    return extraStyle;
  }

  getCreatePassword = () => {
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(8)
        }}
      >
        <Text style={[styles.label, {
            textAlign: 'center',
            fontSize: DimensionManager.scale(27),
            fontWeight: '300',
            color: Colors.reduxsagaGreen,
            opacity: 1,
            letterSpacing: DimensionManager.scale(0.1)
          }
        ]}>{i18n.t('almostSignedUp')}</Text>

        <Text style={[styles.label, styles.mobileLabel
        ]}>{i18n.t('createYourPassword')}</Text>
        {this.getTC()}

      </View>
    );
  }

  getConfirmPassword = () => {
    const extraStyle = this.confirmPasswordTitleAndBorder();
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(33)
        }}
      >
        <Text style={[styles.label, extraStyle]}>{i18n.t('confirmPassword')}</Text>
      </View>
    );
  }

  validationAndIcon = ({ text, typeBoolean }) => {
    const color =
      typeBoolean === undefined ?
        Colors.reduxsagaBlack : typeBoolean ? Colors.reduxsagaGreen : Colors.reduxsagaRed;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Icon name="check-circle" size={11} color={color} />
        <Text style={[Fonts.style.textMediumGT, { color, marginLeft: DimensionManager.scale(8) }]}>
          {text}
        </Text>
      </View>
    );
  }

  startValidation = () => {
    const {
      hasEnoughLength,
      hasOneNumber,
      hasSpecialSymbols
    } = this.state;

    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(8)
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
  }

  confirmPasswordValidation = () => {
    const { samePassword } = this.state;

    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(8)
        }}
      >
        {this.validationAndIcon({ text: 'Same Password', typeBoolean: samePassword })}
      </View>
    );
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <View>
          <ModalView
            isVisible={this.state.showModal}
            title={i18n.t('tcModal')}
            subTitle={'Posted on 8/28/2018'}
            onPress={() => this.setState({ showModal: false })}
            showDeclineAgreeBtns={true}
            showCloseBtn={false}
          />
        </View>
      );
    }
    return null;
  }

  getTC() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(285),
        }}
      >
        <CheckBox
          checkedImage={require('../Images/check-mark.png')}
          uncheckedImage={require('../Images/check-box.png')}
          checkboxStyle={{
            borderColor: Colors.transparent,
            backgroundColor: Colors.reduxsagaGreen,
            height: DimensionManager.verticalScale(16),
            width: DimensionManager.scale(16)
          }}
          label={''}
          checked={this.state.checked}
          onChange={() => {
            this.setState({ checked: !this.state.checked })
            this.setState({ showModal: !this.state.checked });
          }}
        />
        <Text
          style={[
            Fonts.style.textRegularGT,
            {
              alignSelf: 'flex-start',
              fontSize: DimensionManager.scale(15),
              color: Colors.reduxsagaGreen,
              opacity: 1,
              paddingLeft: DimensionManager.scale(12.5),
              fontWeight: '300'
            }
          ]}
        >
          {i18n.t('terms&Conditions')}
        </Text>
      </View>
    );
  }

  getTermsAndConditions() {
    return (
      <View
        style={{
          backgroundColor: Colors.reduxsagaLightGray,
          marginTop: DimensionManager.verticalScale(33)
        }}
      >
        <Text
          style={{
            ...Fonts.style.textSmallGT,
            width: DimensionManager.verticalScale(295),
            paddingTop: DimensionManager.verticalScale(14),
            paddingLeft: DimensionManager.scale(40),
            paddingBottom: DimensionManager.scale(16),
            textAlign: 'left',
            color: Colors.reduxsagaBlack
          }}
        >
          {i18n.t('tc')}
        </Text>
      </View>
    );
  }

  hasSamePassword = (val1, val2) => {
    return { samePassword: val1 === val2 };
  }

  validatePassword = value => {
    const checkPassword = {
      ...signUpPasswordCheck(value),
      ...this.hasSamePassword(value, this.state.confirmPassword)
    };

    this.setState({
      password: value,
      ...checkPassword
    });
  }

  validateConfirmPassword = value => {
    const checkPassword = this.hasSamePassword(this.state.password, value);
    this.setState({
      confirmPassword: value,
      ...checkPassword
    });
  }

  renderPhone() {
    //https://www.npmjs.com/package/react-native-phone-input

    try {
      return (
        <View>
          {this.getMobile()}
          {this.renderContinue()}
          {this.renderOhMissedBtn(i18n.t('noItsNotRight'))}
        </View>
      );
    } catch (err) {

    }
  }

  createPasswordRightElement = type => {
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
  }

  buttonDisabled = () => {
    const { email, matchAllCondition, samePassword } = this.state;

    return this.state.checked &&
      email && matchAllCondition && samePassword;
  }

  renderContinue() {
    return (
      <TouchableOpacityView
        style={{
          backgroundColor: Colors.reduxsagaGreen,
          marginTop: DimensionManager.verticalScale(433),
          borderRadius: DimensionManager.scale(5),
        }}
        active={true}
        label={'Continue'}
        onPress={() => {
          this.setState({stateMachine: this.state.stateMachine + 1})
        }} />
    )
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    const {
      email,
      createPasswordEyes,
      confirmPassword,
      confirmPasswordEyes,
    } = this.state;

    const createPasswordColor = this.passwordTitleAndBorder().color;
    const confirmPasswordColor = this.confirmPasswordTitleAndBorder().color;

    if (this.props.user.codeVerifyStart) {
      dispatch(UserActions.authenticateUser({
        codeVerifyStart: false
      }));
      // when the Signup API response if valid
      // Navigate to next screen
      navigation.navigate('CodeVerify');
    }

    return (
      //start using the translations
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
          <HeaderSignUpView
            bgColor={'transparent'}
            hideStep={true}
            bkBtnColor={Colors.reduxsagaGreen}
          />
          <View style={{
            backgroundColor: Colors.transparent,
          }}>
            <View
              style={{
                alignSelf: 'center',
              }}
            >
              {this.state.stateMachine === 0 ? this.renderPhone() : null}
              {this.state.stateMachine === 1 ? this.getEmail() : null}
              {this.state.stateMachine === 2 ? this.getCreatePassword() : null}
              {this.state.stateMachine === 2 ? this.renderModal() : null}

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
    backgroundColor: Colors.transparent
  },
  label: {
    ...Fonts.style.textLightMediumGT
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
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.transparent
  },
  mobileLabel: {
    textAlign: 'center',
    fontSize: DimensionManager.scale(15),
    fontWeight: '300',
    color: Colors.reduxsagaDarkBlue,
    opacity: 1,
    letterSpacing: DimensionManager.scale(0.6),
    marginTop: DimensionManager.verticalScale(19),
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
)(withNavigation(StartSignUpView));
