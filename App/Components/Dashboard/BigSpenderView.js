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
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
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

class BigSpenderView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-3),
          }}
          title={''} />

          <ScrollView>
            <Image
              style={{
                marginTop: DimensionManager.verticalScale(27),
                height: DimensionManager.verticalScale(187),
                width: DimensionManager.scale(185),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('./Images/big-spender.png')} />

              <Text style={{
                ...styles.transferText,
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(32),
                color: '#9fbafb',
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(47)
              }}>
                Hey big spender!
              </Text>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: '#9fbafb',
                textAlign: 'center',
                lineHeight: DimensionManager.verticalScale(26),
                marginTop: DimensionManager.verticalScale(9),
                marginLeft: DimensionManager.scale(30),
                marginRight: DimensionManager.scale(33)
              }}>
                Looking for a line of reduxsagait higher than $200K? We got you! Hit the button below to speak to someone directly.
              </Text>

              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  marginTop: DimensionManager.verticalScale(200),
                  backgroundColor: Colors.reduxsagaGreen,
                  alignSelf: 'center'
                }}
                label={'Talk to our loan concierge'}
                disabled={false}
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                  }}>Talk to our loan concierge</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BigSpenderView));
