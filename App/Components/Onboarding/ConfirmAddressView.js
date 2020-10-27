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
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';


class ConfirmAddressView extends Component {

  constructor(props) {
    super(props);
  }

  headerText() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(32)
      }}>
        <Text style={Fonts.style.textRegularGT}>{I18n.t('pleaseReviewAndEdit')}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.transparent,
      }}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={I18n.t('personalInfo')}
          stepValue={2}
          navigateTo={'addressStillCurrent'} />
        <View style={{
          marginLeft: DimensionManager.scale(24),
          marginRight: DimensionManager.scale(24),
        }}>
          {this.headerText()}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConfirmAddressView));
