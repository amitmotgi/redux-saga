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
  ActivityIndicator
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Progress from 'react-native-progress';
import { EventRegister } from 'react-native-event-listeners';
import OnboardingActions from '../../Redux/Onboarding';

class VerifyCameraIdentityView extends Component {

  constructor(props) {
    super(props);

    /* Resetting the I18N Internationalization language */
    EventRegister.addEventListener('documentsVerify', (data) => {
      const { navigation } = this.props;
      const { dispatch } = navigation;

      if (data.status) {
        this.props.navigation.navigate('ReviewIdentity');
      } else {
        this.props.navigation.navigate('VerifyIdentityResults', {
          success: false
        });
      }
    });
  }

  headerText() {
    return (
      <Text style={[Fonts.style.h4BoldGT,{
        color: Colors.transparent,
        textAlign: 'center'
      }]}>
        {I18n.t('verifyYourDocuments')}
      </Text>
    );
  }

  getSpinner() {
    return (
      <ActivityIndicator animating={true} size="large" color={Colors.transparent} />
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

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.reduxsagaDarkBlue,
      }}>
        <View style={{
          marginTop: DimensionManager.verticalScale(211)
        }}>
          {this.headerText()}
          <View style={{
            marginTop: DimensionManager.verticalScale(22),
            alignSelf: 'center'
          }}>
            {this.getSpinner()}
          </View>
          <Text style={[Fonts.style.textMediumGT, {
            color: Colors.transparent,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(14)
          }]}>
          {I18n.t('itMaytakeUpTo1Min')}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: Colors.transparent,
  }

});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(VerifyCameraIdentityView));
