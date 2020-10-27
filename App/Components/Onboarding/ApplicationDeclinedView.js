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
import { withNavigation } from 'react-navigation';
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

class ApplicationDeclinedView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      showModal: false
    }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          hideBackBtn={this.state.context === 'BURGER'}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-3),
          }}
          title={''} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <Image
              style={{
                marginTop: DimensionManager.verticalScale(27),
                height: DimensionManager.verticalScale(168),
                width: DimensionManager.scale(168),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('../Images/check-close.png')} />

              <Text style={{
                ...styles.transferText,
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(32),
                color: Colors.transparent,
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(63)
              }}>
                We{"'"}re! sorry!
              </Text>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: Colors.transparent,
                textAlign: 'center',
                lineHeight: DimensionManager.verticalScale(26),
                marginTop: DimensionManager.verticalScale(9),
                marginLeft: DimensionManager.scale(38),
                marginRight: DimensionManager.scale(41)
              }}>
                Your application has been declined.
              </Text>

              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  marginBottom: DimensionManager.verticalScale(20),
                  marginTop: DimensionManager.verticalScale(252),
                  backgroundColor: Colors.reduxsagaGreen,
                  alignSelf: 'center'
                }}
                label={'Close'}
                disabled={false}
                onPress={() => {
                  const { navigation } = this.props;
                  const { dispatch } = navigation;

                  dispatch(OnboardingActions.onboardingUpdate({
                    jToken: ''
                  }));
                  dispatch(UserActions.authenticateUser({
                    jToken: '',
                    isLoggedIn: false
                  }));
                  navigation.navigate('Welcome');
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                  }}>Continue</Text>
                </TouchableOpacityView>
          </ScrollView>


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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ApplicationDeclinedView));
