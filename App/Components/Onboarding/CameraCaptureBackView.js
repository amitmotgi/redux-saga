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

class CameraCaptureBackView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(OnboardingActions.onboardingUpdate({
      backImage: '',
      backImageBase64: ''
    }));
  }

  render() {
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
        cameraText={'back'}
        hideNextBtn={true}
        title={I18n.t('cameraCapture')}
        hideStep={true}
        navigateTo={'ConfirmContactInfo'} />
        <CameraView capture={'back'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CameraCaptureBackView));
