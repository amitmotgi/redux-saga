import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
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
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import I18n from '../../I18n';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import TextField from '../../Common/TextField';
import { signUpPasswordCheck } from '../../Utils/PasswordCheck';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextFieldSides from '../../Common/TextFieldSides';
import OnboardingActions from '../../Redux/Onboarding';

class ResetPasswordView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createPassword: '',
      confirmPassword: '',
      isSamePassword: undefined,
      // hasEnoughLength: false,
      // hasOneNumber: false,
      // hasSpecialSymbols: false,
    };
  }

  validationAndIcon = ({ text, typeBoolean }) => {
    const color = typeBoolean === undefined ? Colors.reduxsagaBlack : typeBoolean ? Colors.reduxsagaGreen : Colors.reduxsagaRed;
    return  (
      <View style={{flexDirection:'row',
        alignItems: 'center'}}>
        <Icon name="check-circle" size={11}  color={color}/>
        <Text style={[
          Fonts.style.textMediumGT,
          {color, marginLeft:  DimensionManager.scale(8)}]}>
          {text}
        </Text>
      </View>
    );
  }

  startValidation = () => {
    const  {
      hasEnoughLength,
      hasOneNumber,
      hasSpecialSymbols
    } = this.state;

    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(9)
      }}>
        {this.validationAndIcon({text: I18n.t('8Characters'), typeBoolean: hasEnoughLength})}
        {this.validationAndIcon({text: I18n.t('1number'), typeBoolean: hasOneNumber})}
        {this.validationAndIcon({text: I18n.t('1SpecialCharacter'), typeBoolean: hasSpecialSymbols})}
      </View>
    );
  }

  validateSamePassword = () => {
    const { isSamePassword } = this.state;

    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(8)
      }}>
        {this.validationAndIcon({text: I18n.t('Same password'), typeBoolean: isSamePassword})}
      </View>
    );
  }

  onConfirmPasswordChangeText = (value) => {
    const { createPassword } = this.state;
    this.setState({
      confirmPassword: value,
      isSamePassword: value === createPassword
    });
  }

  onCreatePasswordChangeText =  (value)=> {
    const { confirmPassword } = this.state;
    const checkPassword = signUpPasswordCheck(value);
    this.setState({
      createPassword: value,
      isSamePassword: value === confirmPassword,
      ...checkPassword
    });
  }

  renderMainPart = () => {
    const  { createPassword, confirmPassword } = this.state;

    return (
      <View style={{
          marginTop: DimensionManager.verticalScale(33)
      }}>
        <View>
          <Text style={[styles.label, {

          }]}>
            {I18n.t('createNewPassword')}
          </Text>

          <TextField
            borderColor={'#b5b9c0'}
            onChangeText={this.onCreatePasswordChangeText}
            value={ createPassword || ''}
            secureTextEntry={true}
          />
          {/* this.startValidation() */}
        </View>
        <View style={{
          marginTop: DimensionManager.verticalScale(30)
        }}>
          <Text style={[styles.label, {

          }]}>
            {I18n.t('confirmNewPassword')}
          </Text>
          <TextField
            borderColor={'#b5b9c0'}
            onChangeText={this.onConfirmPasswordChangeText}
            value={ confirmPassword || ''}
            secureTextEntry={true}
          />
          {/* this.validateSamePassword() */}
        </View>
      </View>
    );
  }

  renderSuccess() {
    if (this.props.user && this.props.user.resetPasswordStatus) {
      this.props.navigation.navigate('ResetPasswordSuccess');
    }
  }

  renderButton = () => {
    const {
      isSamePassword,
      hasEnoughLength,
      hasOneNumber,
      hasSpecialSymbols,
      createPassword,
      confirmPassword
    } = this.state;

    const isPasswordCorrect = hasEnoughLength && hasOneNumber && hasSpecialSymbols;
    const isButtonActive = isPasswordCorrect && isSamePassword;

    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(80),
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(152)
        }}
      >
        <TouchableOpacityView
          invertColor={false}
          active={isButtonActive}
          label={I18n.t('resetPasswordSubmitLabel')}
          onPress={() => {
            const { navigation } = this.props;
            const { dispatch } = navigation;

            if (!isButtonActive) {
              return;
            }

            if (this.state.confirmPassword === this.state.createPassword) {
              dispatch(OnboardingActions.onboardingUpdate({
                resetPassword: this.state.createPassword || '',
                token: this.props.onboarding.resetPasswordToken || ''
              }));

              dispatch(OnboardingActions.onboardingPasswordReset({
                username: this.props.onboarding.username || '',
                resetPassword: this.state.createPassword || '',
                token: this.props.onboarding.resetPasswordToken || ''
              }));
            }
          }}
        />
      </View>
    );
  }

  render() {
    this.renderSuccess();

    return (
      <SafeAreaView
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          title={I18n.t('resetPassword')}
          hideNextBtn={true}
          hideStep={true}
        />
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(100)}
        >
          <View style={styles.container}>
            {this.renderMainPart()}
            {this.renderButton()}
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
    backgroundColor: Colors.transparent,
  },
  container: {
    marginLeft: DimensionManager.scale(40),
    marginRight: DimensionManager.scale(40)
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBack
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ResetPasswordView));
