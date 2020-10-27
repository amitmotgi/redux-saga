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

import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderSignUpView from '../../Common/HeaderSignUpView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-code-input';
import OnboardingActions, { OnboardingSelectors } from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import {
  SetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';

class CodeVerifyView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      checked: false,
      code: 0,
      spinner: this.props.onboarding.spinner || false,
      showError: this.props.onboarding.codeError || false
    };
  }

  headerText() {
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
        ]}>{i18n.t('weJustTextedYou')}</Text>

        <Text style={[styles.label, styles.mobileLabel
        ]}>{i18n.t('enter4DigitCodeBelow')}</Text>

      </View>
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
        space={20}
        inputPosition={'center'}
        size={56}
        autoFocus={true}
        codeInputStyle={{
          ...Fonts.style.h3BoldGT,
          backgroundColor: Colors.transparent,
          color: Colors.reduxsagaBlack,
          borderColor: Colors.reduxsagaGreen,
          borderWidth: 1,
          borderRadius: 5
        }}
        onFulfill={(code) => {
          this.setState({code});
        }}
      />
    );
  }

  savereduxsagaentials(dispatch, navigation) {
    // if (this.props.user.codeVerify) {
    //   /* Settting up the reduxsagaentials */
    //   SetUserreduxsagaentials({
    //     username: this.props.onboarding.email,
    //     password: this.props.onboarding.password
    //   });
    //
    //   dispatch(UserActions.authenticateUser({
    //     codeVerify: false
    //   }));
    //   navigation.navigate('ConfirmContactInfo');
    // }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    this.savereduxsagaentials(dispatch, navigation);

    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.transparent,
        paddingBottom: DimensionManager.verticalScale(120),
      }}>
        <HeaderSignUpView
          bgColor={'transparent'}
          hideStep={true}
          bkBtnColor={Colors.reduxsagaGreen}
        />
        <View>
            <View style={{
              marginLeft: DimensionManager.scale(38),
              marginRight: DimensionManager.scale(41),
              marginTop: DimensionManager.verticalScale(32),
            }}>
              {this.headerText()}
              <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(47),
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
                  invertColor={false}
                  style={{
                    backgroundColor: Colors.reduxsagaGreen,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    var secrectCode = this.state.code;
                    const codeInt = secrectCode && parseInt(secrectCode, 10) || 0;

                    if (codeInt > 3) {
                      dispatch(
                        OnboardingActions.onboardingMobileVerify({
                          phoneNumber: this.props.onboarding.mobileNumber,
                          countryCode: this.props.onboarding.countryCode,
                          token: codeInt,
                          jToken: this.props.user.jToken
                        })
                      );
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CodeVerifyView));
