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
  SafeAreaView,
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
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { Switch } from 'react-native-switch';
import { Dropdown } from 'react-native-material-dropdown';
import DistributionActions from '../../Redux/Distribution';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import CountDownView from '../../Common/CountDownView'
import CheckBox from 'react-native-checkbox';
import { EventRegister } from 'react-native-event-listeners';

class LoanOriginationSuccessView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  renderModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.showModal}
        >
          <View style={{
            height: DimensionManager.verticalScale(487),
            width: DimensionManager.scale(335),
            backgroundColor: Colors.transparent
          }}>
            <TouchableOpacity onPress={() => {
              this.setState({showModal: false});
            }}>
              <Image
                style={{
                  width: DimensionManager.scale(18),
                  height: DimensionManager.verticalScale(52),
                  marginRight: DimensionManager.scale(18),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(8.7),
                  alignSelf: 'flex-end'
                }}
                source={require('./Images/x-close-modal.png')} />
              </TouchableOpacity>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(28),
                color: Colors.reduxsagaDarkBlue,
                textAlign: 'center',
                lineHeight: DimensionManager.scale(44)
              }}>
                Adding a card
              </Text>
              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: '#787e8b',
                textAlign: 'center',
                lineHeight: DimensionManager.scale(26),
                marginLeft: DimensionManager.scale(18),
                marginRight: DimensionManager.scale(21),
                marginTop: DimensionManager.verticalScale(5)
              }}>
                It’s important to add a card soon. Feel free to do so whenever you choose, but know that fees and interest will accrue if you don’t.
              </Text>

              <Image
                style={{
                  width: DimensionManager.scale(184),
                  height: DimensionManager.verticalScale(184),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(37)
                }}
                source={require('./Images/debit-card-art.png')} />

          </View>
        </Modal>
      </View>
    );
  }


  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={false}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-3),
          }}
          title={''} />

          <ScrollView>
            {this.state.showModal ? this.renderModal() : null}
            <Image
              style={{
                marginTop: DimensionManager.verticalScale(27),
                height: DimensionManager.verticalScale(168),
                width: DimensionManager.scale(168),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('./Images/check-mark.png')} />

              <Text style={{
                ...styles.transferText,
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(32),
                color: Colors.transparent,
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(63)
              }}>
                Almost there!
              </Text>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: Colors.transparent,
                textAlign: 'center',
                lineHeight: DimensionManager.verticalScale(26),
                marginTop: DimensionManager.verticalScale(9),
                marginLeft: DimensionManager.scale(63),
                marginRight: DimensionManager.scale(66)
              }}>
                Add your debit card so you can take full advantage of your new reduxsagait line.
              </Text>

              <TouchableOpacity style={{
                color: Colors.transparent,
              }}
              onPress={() => {
                this.setState({showModal: true})
              }}
              >
                <Text style={{
                  ...styles.transferText,
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: DimensionManager.scale(14),
                  color: Colors.transparent,
                  textAlign: 'center',
                  marginTop: DimensionManager.verticalScale(156)
                }}>
                  Skip for now
                </Text>
              </TouchableOpacity>
              <TouchableOpacityView
                active={true}
                style={{
                  width: DimensionManager.scale(335),
                  height: DimensionManager.verticalScale(50),
                  marginBottom: DimensionManager.verticalScale(20),
                  marginTop: DimensionManager.verticalScale(24),
                  backgroundColor: Colors.reduxsagaGreen,
                  alignSelf: 'center'
                }}
                label={'Continue'}
                disabled={false}
                onPress={() => {
                  if (this.props.payment && this.props.payment.id) {
                    this.props.navigation.navigate('Dashboard');
                  } else {
                    this.props.navigation.navigate('ScanCard');
                  }
                }}>
                  <Text style={{
                    ...Fonts.style.inputBoldGT,
                    fontWeight: '500',
                    color: Colors.transparent,
                    textAlign: 'center',
                  }}>Continue</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoanOriginationSuccessView));
