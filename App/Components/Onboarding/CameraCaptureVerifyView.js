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
  CameraRoll,
  ActivityIndicator,

 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import CameraView from '../../Common/CameraView';
import CheckBox from 'react-native-checkbox';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import OnboardingActions from '../../Redux/Onboarding';
import ModalView from '../../Common/ModalView';

class CameraCaptureVerifyView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      checked: false,
      spinner: this.props.onboarding.spinner,
      showModal: false
    };

    CameraRoll.getPhotos({
      first: 1,
      assetType: 'All',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
       //Error Loading Images
       console.log(' getPhotos Error >>> ', err);
    });

  }

  getSavedImage(type) {
    return (
      <Image
        key={type === 'frontImage' ? 'frontImage' : 'backImage'}
        style={{
          alignSelf: 'center',
          width: DimensionManager.scale(289),
          height: DimensionManager.verticalScale(183),
        }}
        source={{ uri: type === 'frontImage' ?
          this.props.onboarding.frontImage : this.props.onboarding.backImage}}
      />
    );
  }

  headerText() {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        fontSize: DimensionManager.verticalScale(18),
        lineHeight: DimensionManager.verticalScale(24),
        fontWeight: 'normal',
        opacity: 1
      }]}>
        {I18n.t('pleaseDoubleCheck')}
      </Text>
    );
  }

  renderModal() {
    return (
      <View>
        <ModalView
          isVisible={this.state.showModal}
          title={I18n.t('terms&Conditions')}
          subTitle={'Posted on 8/28/2018'}
          onPress={() => this.setState({showModal: false})}
        />
      </View>
    );
  }

  getAllreduxsagaentials() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <View style={{
        flexDirection: 'row',
        marginTop: DimensionManager.verticalScale(36),
      }}>
        <CheckBox
          containerStyle={{
            //height: Math.round(40 * DimensionManager.heightScale)
          }}
          checkedImage={require('../Images/check-mark.png')}
          uncheckedImage={require('../Images/check-box.png')}
          checkboxStyle={{
            borderColor: Colors.transparent,
            color: Colors.transparent,
            backgroundColor: Colors.reduxsagaGreen,
            height: DimensionManager.verticalScale(20),
            width: DimensionManager.scale(20),
          }}
          label={''}
          checked={this.state.checked}
          onChange={() => {
            this.setState({
              checked: !this.state.checked,
              showModal: !this.state.checked ? true : false
            });
          }}
        />
        <Text style={[Fonts.style.textRegularGT, {
          justifyContent: 'center',
          alignSelf: 'flex-start',
          paddingLeft: DimensionManager.scale(2)
        }]}>{I18n.t('iPromiseAllreduxsagas')}</Text>
      </View>
    );
  }

  textTD(msg) {
    return (
      <Text style={[Fonts.style.textMediumLightGT, {
        color: Colors.reduxsagaBack,
        textAlign: 'center',
        lineHeight: DimensionManager.verticalScale(20),
        letterSpacing: 1,
        fontWeight: '500',
        marginTop: DimensionManager.verticalScale(19),
        marginBottom: DimensionManager.verticalScale(10)
      }]}>{msg}</Text>
    );
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={{
          flex: 1,
          backgroundColor: Colors.transparent,
        }}>
      <View style={styles.safeArea} />

      <HeaderBarOnboardingView
        hideNextBtn={true}
        title={I18n.t('letsBeSure')}
        hideStep={true}
        navigateTo={'ReviewIdentityView'} />
      <ScrollView
        horizontal={false}
        vertical={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{
            marginLeft: DimensionManager.scale(27),
            marginRight: DimensionManager.scale(27),
            marginTop: DimensionManager.verticalScale(32)
          }}>
            {this.headerText()}
            {this.textTD('ID FRONT')}
            {this.getSavedImage('frontImage')}
            {this.textTD('ID BACK')}
            {this.getSavedImage('backImage')}
          </View>
          <View style={{
            alignSelf: 'center'
          }}>
            <TouchableOpacity
              style={{
                marginTop: DimensionManager.verticalScale(21)
              }}
              onPress={() => {
                this.props.navigation.navigate('CameraCapture');
              }}>
              <Text style={[
                Fonts.style.textBoldGT, {
                 opacity: 1,
                 textAlign: 'center',
                 lineHeight: DimensionManager.verticalScale(21),
                 fontSize: DimensionManager.scale(14),
                 fontWeight: '500',
                 color: Colors.reduxsagaDarkBlue
               }]}>Redo capture</Text>
            </TouchableOpacity>
            <TouchableOpacityView
              style={{
                marginTop: DimensionManager.verticalScale(21)
              }}
              active={true}
              label={'Continue'}
              onPress={() => {
                let userInfo = {
                  frontImageBase64: this.props.onboarding.frontImageBase64,
                  backImageBase64: this.props.onboarding.backImageBase64,
                  spinner: true,
                  cameraAcceptAgreement: this.state.checked,
                  documentType: this.props.onboarding.documentType,
                  jToken: this.props.user.jToken,
                  uuid: this.props.user.uuid
                };

                this.setState({spinner: true});

                // unless the aggrement is tapped
                //if (userInfo && userInfo.cameraAcceptAgreement) {
                  dispatch(OnboardingActions.onboardingVerifyIdentityImages(userInfo));
                  this.props.navigation.navigate('VerifyCameraIdentity');
                //}

              }} />
          </View>
        </View>
      </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CameraCaptureVerifyView));
