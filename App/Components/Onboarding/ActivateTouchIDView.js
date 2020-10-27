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
import * as Keychain from 'react-native-keychain';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { scale, verticalScale } from '../../Themes/DimensionManager';
import { loginNavigateTo } from '../../Utils/TouchIDUtils';
import { KeyChainService } from '../../Config/KeyChainConfig';
import OnboardingActions from '../../Redux/Onboarding';

class ActivateTouchIDView extends Component {
  constructor(props) {
    super(props);
  }

  touchIDOnPress = () => {
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
        // console.log('SetGenericPassword succeed',resp);
        if (res) {
          dispatch(
            OnboardingActions.onboardingLoginActivateTouchid({
            enabledTouchID: true
          }));
          navigate(loginNavigateTo);
        }
      }).catch(error => {
         // console.log('error',error);
        Alert.alert('SetGenericPassword failed,Please try again');
      });
  }

  touchIDShowPage = () => {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.touchIDShow}>
          <Image source={require('../Images/touch-id.png')} />
          <View style={styles.labelView}>
            <Text style={styles.label}>Do you want to activate Touch ID?</Text>
          </View>
          <TouchableOpacityView
            style={{
              backgroundColor: Colors.reduxsagaGreen,
              width: scale(295),
              height: scale(67)
            }}
            active={true}
            label={'Yes'}
            onPress={this.touchIDOnPress}
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
    // console.log('%c this.props','color:blue',this.props);
    return (
        <SafeAreaView style={styles.wrapper}>
          <HeaderBarOnboardingView stepValue={1} hideNextBtn={true} />
          {this.touchIDShowPage()}
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
  touchIDShow: {
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

export default connect(mapStateToProps)(withNavigation(ActivateTouchIDView));
