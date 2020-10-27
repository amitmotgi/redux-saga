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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import I18n from '../../I18n';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { verifyEmail } from '../../Utils/Verify';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';

class ResetPasswordEmailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isButtonActive: false,
      isEmailInputFocus: false
    };
  }

  handleSubmit = () => {

  }

  onEmailChangeText = (text) => {
    const result = verifyEmail(text);

    this.setState({
      email: text,
      isButtonActive: result,
    });
  }

  onEmailFocus = () => {
    this.setState({
      isEmailInputFocus: true,
    });
  }

  onEmailBlur = () => {
    this.setState({
      isEmailInputFocus: false,
    });
  }

  validateEmail = (email) => {
    return verifyEmail(email);
  }

  renderHeaderText = () => {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(32),
      }}>
        <Text style={[Fonts.style.textRegularGT, {color: Colors.reduxsagaBlack}]}>
          {I18n.t('resetPasswordEmaiMsg')}
        </Text>
      </View>
    );
  }

  renderEmailAddress() {
    const { email, isEmailInputFocus } = this.state;

    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(66)
      }}>
        <Text style={[
          styles.label,
          isEmailInputFocus && styles.foucusEmail, {
            fontSize: DimensionManager.scale(12),
            letterSpacing: DimensionManager.scale(1)
          }
        ]}>
            USER ID
        </Text>
        <TextField
          borderColor={'#b5b9c0'}

          placeholder={I18n.t('resetPasswordEmaiEx')}
          secureTextEntry={false}
          validation={this.validateEmail}
          onChangeText={this.onEmailChangeText}
          onFocus={this.onEmailFocus}
          onBlur={this.onEmailBlur}
          value={email || ''}
          keyboardType="email-address"
        />

      </View>
    );
  }

  renderButton() {
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(84),
          alignSelf: 'center'
        }}>
        <TouchableOpacityView
          invertColor={false}
          disabled={this.state.isButtonActiv}
          active={this.state.isButtonActive}
          label={'Send Code'}
          onPress={() => {
            const { email } = this.state;
            const { navigation } = this.props;
            const { dispatch } = navigation;

            dispatch(OnboardingActions.onboardingCodeStartSms({
              username: email || '',
            }));

            dispatch(UserActions.authenticateUser({
              username: email || '',
            }));

            navigation.navigate('CodeVerify', {
              context: 'RESET-PASSWORD'
            });
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
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
            {this.renderHeaderText()}
            {this.renderEmailAddress()}
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
    marginLeft: DimensionManager.scale(20),
    marginRight: DimensionManager.scale(20)
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBack
  },
  foucusEmail: {
    color: Colors.reduxsagaDarkBlue,
    opacity: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ResetPasswordEmailView));
