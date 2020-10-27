import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView,
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { Switch } from 'react-native-switch';
import { Dropdown } from 'react-native-material-dropdown';
import DistributionActions from '../../Redux/Distribution';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import CountDownView from '../../Common/CountDownView'
import CheckBox from 'react-native-checkbox';
import { EventRegister } from 'react-native-event-listeners';
import UserActions from '../../Redux/User';
import OnboardingActions from '../../Redux/Onboarding';

class ContinueCodeVerifyView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      showModal: false
    }
  }

  componentDidMount() {
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      showModal: false
    };
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          hideBackBtn={true}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-3),
          }}
          title={''} />

          <View>
            <Image
              style={{
                marginTop: DimensionManager.verticalScale(27),
                height: DimensionManager.verticalScale(183),
                width: DimensionManager.scale(185),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('../Images/check-mark-code.png')} />

              <Text style={{
                ...styles.transferText,
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(32),
                color: '#9db9ff',
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(50)
              }}>
                Welcome back!
              </Text>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color:'#9db9ff',
                textAlign: 'center',
                lineHeight: DimensionManager.verticalScale(26),
                marginTop: DimensionManager.verticalScale(9),
                marginLeft: DimensionManager.scale(38),
                marginRight: DimensionManager.scale(41)
              }}>
                Let’s move forward in verifying your Mobile Number. We’re doing this as required by law.
              </Text>

              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  marginBottom: DimensionManager.verticalScale(20),
                  marginTop: DimensionManager.verticalScale(174),
                  backgroundColor: Colors.reduxsagaGreen,
                  alignSelf: 'center'
                }}
                label={'Continue'}
                disabled={false}
                onPress={() => {
                  const { navigation } = this.props;
                  const { dispatch } = navigation;

                  const resetCodeVerify = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                      routeName: 'CodeVerify',
                      params: {
                        context: 'LOGIN'
                      }
                    })],
                  });
                  navigation.dispatch(resetCodeVerify);

                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                  }}>Continue</Text>
                </TouchableOpacityView>
          </View>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  transferText: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center'
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ContinueCodeVerifyView));
