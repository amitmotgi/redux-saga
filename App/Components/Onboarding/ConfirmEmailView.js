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
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';

var Mailer = require('NativeModules').RNMail;

class ConfirmEmailView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // this runs on requestAnimationFrame
      // add long waiting synchro tasks here... if any
      if (Platform.OS === 'ios') {
        LayoutAnimation.easeInEaseOut();
      } else {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    });
  }

  componentWillUnMount() {

  }

  headerMessage() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(8)
      }}>
        <Text style={{
          color: Colors.reduxsagaBlue,
          fontSize: DimensionManager.scale(Fonts.size.h4)
        }}>{I18n.t('confirmEmailHeader')}</Text>
      </View>
    );
  }

  headerText() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(45),
        marginLeft: DimensionManager.scale(40),
        marginRight: DimensionManager.scale(40)
      }}>
        <Text style={[Fonts.style.textBoldGT, {color: Colors.reduxsagaBack}]}>
          {I18n.t('confirmEmailMsg')}
        </Text>
      </View>
    );
  }

  render() {
    return (
      // start using the translations
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={I18n.t('emailVerification')}
          stepValue={1}
          navigateTo={'ConfirmContactInfo'} />
        <View style={{
          // marginLeft: Math.round(40 * DimensionManager.heightScale),
          // marginRight: Math.round(40 * DimensionManager.heightScale)
        }}>
            {this.headerText()}
        </View>

        <View style={{
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(43),
        }}>
          <TouchableOpacityView
            active={true}
            label={I18n.t('openEmailApp')}
            onPress={() => this.props.navigation.navigate('CodeVerify')} />
        </View>

        <View style={{
          marginTop: DimensionManager.verticalScale(12),
        }}>
          <Text>{I18n.t('')}</Text>
        </View>

      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConfirmEmailView));
