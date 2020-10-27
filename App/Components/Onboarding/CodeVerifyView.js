import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
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
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-code-input';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import {
  SetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';
import GlobalStorage from '../../Common/Helper/GlobalStorage';

class CodeVerifyView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: null,
      checked: false,
      code: 0,
      spinner: this.props.onboarding.spinner || false,
      showError: this.props.onboarding.codeError || false,
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || ''
    };
  }

  headerText() {
    return (
      <Text style={[Fonts.style.textRegularNormalGT,{
        color: Colors.transparent,
        textAlign: 'center',
        width:DimensionManager.scale(251),
        fontWeight:'500',
        letterSpacing:-0.5
      }]}>
        {I18n.t('pleaseEnter4DigitCode')}
      </Text>
    );
  }

  errorMessage() {
    return (
      <Text style={[Fonts.style.textRegularNormalGT,{
        color: Colors.reduxsagaRed,
        textAlign: 'center',
      }]}>
        Invalid code entered
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

  getTextInput() {
    return (
      <CodeInput
        secureTextEntry={false}
        borderType={'square'}
        keyboardType="numeric"
        codeLength={4}
        space={6}
        inputPosition={'full-width'}
        size={55}
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

  savereduxsagaentials(dispatch, navigation) {
    if (this.props.user.codeVerify) {
      let bindingType = Platform.OS === 'iOS' ? 'APN' : null;
      bindingType = Platform.OS === 'Android' ? 'FCM' : null;

      dispatch(UserActions.authenticateUser({
        codeVerify: false
      }));

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
          // Device is already registered
        }
      })
      .catch((err) => {

      });

      navigation.navigate('NeedYourIDInfo', {
        context: 'SIGNUP'
      });
    }
  }

  sendCodeToMobile() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    dispatch(
      OnboardingActions.onboardingCodeStartSms({
        username: this.props.onboarding.username,
        jToken: this.props.user.jToken
      })
    );
  }

  didntGetTheEmail=()=> {
    return (
      <View style={styles.didntGetEmailView}>
        <Text style={[styles.didntGetEmailText]}>Didn’t get the text?</Text>
        <TouchableOpacity onPress={() => {
          this.sendCodeToMobile();
        }}
        style={styles.resendView}>
          <Text style={[styles.didntGetEmailText,styles.resendExtraStyle,styles.resendEmailText,]}>Resend</Text>
          <Text style={[styles.didntGetEmailText,styles.resendExtraStyle]}> (0s)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderInvalidCode() {
    return (
      <View style={styles.didntGetEmailView}>
        <Text style={[styles.didntGetEmailText]}>Please enter a valid code!</Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    this.savereduxsagaentials(dispatch, navigation);

    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.reduxsagaDarkBlue,
        paddingBottom: DimensionManager.verticalScale(120),
      }}>
        <View>
          <HeaderBarOnboardingView
            hideBackBtn={true}
            hideNextBtn={true}
            title={''}
            stepValue={2}
            navigateTo={'ReviewIdentityView'}
            hideStep={true}
          />

            <View style={{
              marginHorizontal:DimensionManager.scale(20),
              marginTop: DimensionManager.verticalScale(85),
              alignItems: 'center'
            }}>
              {this.headerText()}
              <View style={{
                flexDirection: 'row',
                //alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(5),
                width:DimensionManager.scale(280)
              }}>
                {this.getTextInput()}

              </View>
              {this.didntGetTheEmail()}
              {this.props.user.invalidCode ? this.renderInvalidCode() : null}

              <View style={{
                marginTop: DimensionManager.verticalScale(115),
                marginBottom: DimensionManager.verticalScale(43),
                alignSelf: 'center',
                width:'100%'
              }}>
                <TouchableOpacityView
                  active={true}
                  label={'Continue'}
                  invertColor={false}
                  style={{backgroundColor:Colors.reduxsagaGreen,width:'100%',height: DimensionManager.verticalScale(50)}}
                  onPress={() => {
                    var secrectCode = this.state.code;
                    const codeInt = secrectCode || 0;

                    // dispatch(
                    //   UserActions.authenticateUser({
                    //     codeVerifyStart: false
                    //   })
                    // );

                    if (codeInt > 3) {

                      if (this.state.context === 'RESET-PASSWORD') {
                        dispatch(
                          OnboardingActions.onboardingUpdate({
                            resetPasswordToken: codeInt
                          })
                        );
                        this.props.navigation.navigate('ResetPassword');
                      } else {
                        dispatch(
                          OnboardingActions.onboardingMobileVerify({
                            uuid: this.props.user.uuid,
                            token: codeInt,
                            jToken: this.props.user.jToken
                          })
                        );
                      }

                    }
                  }} />
              </View>

              <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(47),
              }}>
                {this.state.showError ? this.errorMessage() : null}
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
    color: Colors.reduxsagaBlack,
    height: DimensionManager.verticalScale(40),
    width: DimensionManager.scale(40),
    textAlign: 'center',
    marginLeft: DimensionManager.scale(18),
    opacity: 1
  },
  didntGetEmailView:{
    marginTop:DimensionManager.verticalScale(18)
  },
  resendView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  didntGetEmailText:{
    ...Fonts.style.textMediumGT,
    textAlign:'center',
    color:Colors.transparent,
    fontWeight: '500',
  },
  resendEmailText:{
   // textDecorationLine:'underline'
  },
  resendExtraStyle:{
    color:Colors.reduxsagaGreen,
    marginTop:DimensionManager.verticalScale(2)
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CodeVerifyView));
