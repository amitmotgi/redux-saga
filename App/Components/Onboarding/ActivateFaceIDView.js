import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { scale, verticalScale } from '../../Themes/DimensionManager';
import { loginNavigateTo } from '../../Utils/TouchIDUtils';
import * as Keychain from 'react-native-keychain';
import { KeyChainService } from '../../Config/KeyChainConfig';
import OnboardingActions from '../../Redux/Onboarding';

class ActivateFaceIDView extends Component {

  constructor(props) {
    super(props);
  }

  faceIDOnPress = () => {
    const {
      navigation,
      userInfo: {
        username,
        password
      },
      dispatch
    } = this.props;

    const { navigate } = navigation;
    Keychain.setGenericPassword(username, password, {
        service: KeyChainService.login
      }).then(res => {
        if (res) {
          dispatch(
            OnboardingActions.onboardingLoginActivateTouchid({
              enabledTouchID: true
            }));
          navigate(loginNavigateTo);
        }
      }).catch(error => {
        Alert.alert('SetGenericPassword failed, Please try again');
      });
  }

  faceIDShowPage = () => {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.faceIDShow}>
          <Image source={require('../Images/face-id.png')} />
          <View style={styles.labelView}>
            <Text style={styles.label}>Do you want to activate Face ID?</Text>
          </View>
          <TouchableOpacityView
            style={{
              backgroundColor: Colors.reduxsagaGreen,
              width: scale(295),
              height: verticalScale(67)
            }}
            active={true}
            label={'Yes'}
            onPress={this.faceIDOnPress}
          />
          <TouchableOpacity
            style={styles.laterLabelView}
            onPress={() => {
              navigate(loginNavigateTo);
            }}
          >
            <Text style={styles.laterLabel}>I will do it later.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    // console.log('%c FACEID','color:red');
    return (
      <SafeAreaView style={styles.wrapper}>
        <HeaderBarOnboardingView
          stepValue={1}
          hideNextBtn={true}
        />
        {this.faceIDShowPage()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  faceIDShow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  labelView: {
    marginTop: verticalScale(57.3),
    marginBottom: verticalScale(67)
  },
  label: {
    ...Fonts.style.h3BoldGT,
    color: Colors.transparent,
    // lineHeight: Math.round(44 * heightScale),
    letterSpacing: scale(0.1),
    textAlign: 'center',
    width: scale(285),
    height: verticalScale(88)
  },
  laterLabelView: {
    marginTop: verticalScale(67),
    marginBottom: verticalScale(115),
    borderBottomColor: Colors.transparent,
    borderBottomWidth: verticalScale(1)
  },
  laterLabel: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    color: Colors.transparent,
    textAlign: 'center',
    width: scale(97),
    height: verticalScale(18)
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  }
});

const mapStateToProps = state=>{
  const {email,password} = state.onboarding;
  return {
    userInfo: {
      username: !email ? ' ' : email,
      password: !password ? ' ' : password
    }
  };
};

export default connect(mapStateToProps)(withNavigation(ActivateFaceIDView));
