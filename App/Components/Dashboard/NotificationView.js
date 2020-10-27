import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';

class NotificationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
  }

  render() {
    const { navigation, show, type } = this.props;
    const { dispatch } = navigation;

    const notify = this.state.show ? (
        <View style={styles.wrapper}>
          <Image style={{
              marginTop: DimensionManager.verticalScale(12),
              marginLeft: DimensionManager.scale(20),
              marginBottom: DimensionManager.verticalScale(12),
              marginRight: DimensionManager.scale(8),
              resizeMode: 'contain',
              width: DimensionManager.scale(16),
              height: DimensionManager.verticalScale(16),
            }}
            source={require('../Images/check-mark-copy.png')} />
          <Text style={[Fonts.style.textSmallGT, {
            alignSelf: 'center',
            opacity: 0.8
          }]}>{I18n.t('youPaymentDidNotGoThrough')}</Text>

          <TouchableOpacity onPress={() => {
            this.setState({show: false});
          }}>
            <Image
              source={require('../../Common/Images/x-icon.png')}
              style={{
                marginTop: DimensionManager.verticalScale(14),
                marginLeft: DimensionManager.scale(24.5),
                height: DimensionManager.verticalScale(10),
                width: DimensionManager.scale(10),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
    ) : null;

    return notify;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
    height: DimensionManager.verticalScale(40),
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 2},
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NotificationView));
