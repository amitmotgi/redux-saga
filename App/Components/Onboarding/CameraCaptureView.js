import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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

 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import CameraView from '../../Common/CameraView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import OnboardingActions from '../../Redux/Onboarding';

class CameraCaptureView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bgColor: Colors.transparent
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(OnboardingActions.onboardingUpdate({
      frontImage: '',
      frontImageBase64: ''
    }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const {nav:{routes}} = this.props;
    const length = routes[0].routes.length;
    const lastRouteName = routes[0].routes[length - 1].routeName;
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: Colors.transparent
        }}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          cameraText={'front'}
          hideNextBtn={true}
          title={I18n.t('cameraCapture')}
          hideStep={true}
          navigateTo={'ConfirmContactInfo'} />
        {
          // this page route is CameraCapture,
          // if not , mandatory uninstall
          lastRouteName !== 'CameraCapture' ? null :
            <CameraView capture={'front'} />
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CameraCaptureView));
