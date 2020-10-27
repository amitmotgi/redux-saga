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

class NewCLOCView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanValue: 2000,
      interestValue: 1400,
      showBuy: false
    };
  }

  header() {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        textAlign: 'center',
        marginTop: DimensionManager.verticalScale(20)
      }]}>
        {I18n.t('lineofreduxsagait')}
      </Text>
    );
  }

  renderCLOCValue(value) {
    return (
      <View>
        <Text style={[Fonts.style.largeTextBold, {
          color: Colors.reduxsagaBack,
          textAlign: 'center',
          textDecorationLine: 'underline'
        }]}>
          $ {value || '2,000.00'}
        </Text>
      </View>
    );
  }

  renderSlider = () => {
    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <Slider
          value={this.state.loanValue}
          step={100}
          minimumValue={2000}
          maximumValue={200000}
          minimumTrackTintColor={Colors.reduxsagaDarkBlue}
          thumbTintColor={Colors.reduxsagaGray}
          onValueChange={value => this.setState({ loanValue: value })}
          trackStyle={{
            height: DimensionManager.verticalScale(2),
          }}
          style={{
            marginLeft: DimensionManager.scale(38),
            marginRight: DimensionManager.scale(41),
            marginTop: DimensionManager.verticalScale(20)

          }}
        />
        <View style={{
          flexDirection: 'row'
        }}>
            <Text style={[Fonts.style.textSmallGT, {
              textAlign: 'left',
              marginLeft: DimensionManager.scale(36),
              marginTop: DimensionManager.verticalScale(-6)
            }]}>
              $2,000.00
            </Text>
            <Text style={[Fonts.style.textSmallGT, {
              textAlign: 'right',
              marginLeft: DimensionManager.scale(170),
              marginTop: DimensionManager.verticalScale(-6)
            }]}>
              $200,000.00
            </Text>
        </View>
      </View>
    );
  }

  renderComputedCollateral(collateral, underline) {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(20),
        backgroundColor: Colors.transparent
      }}>
        <View style={{
          flexDirection: 'row',
          marginLeft: DimensionManager.scale(20),
          alignSelf: 'center'
        }}>
          <Text style={[Fonts.style.textBoldGT, {
            textAlign: 'center'
          }]}>
            {I18n.t('collateralRequired')}
          </Text>
        </View>

        <View style={{
          alignSelf: 'center'
        }}>
          <CurrencyView
            minimumFractionDigits={0}
            size={'medium'}
            style={[Fonts.style.largeTextBold, {
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: Colors.reduxsagaBlack,
            }]}
            currencyType={'USD'}
            currencyValue={collateral}
          />
        </View>

        <View style={{
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(20)
        }}>
          <Text style={[Fonts.style.textMediumGT, {
            textAlign: 'center',
            opacity: 0.6,
            fontWeight: 'bold'
          }]}>
            $0.00 {'\b'}
          </Text>
          <Text style={[Fonts.style.textMediumGT, {
            textAlign: 'center',
            opacity: 0.6
          }]}>
            {I18n.t('availableInWallet')}
          </Text>
        </View>
        {underline ? this.renderUnderline() : null}
      </View>
    );
  }

  renderCollaternalRequired() {
    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: Colors.transparent
      }}>
        <View style={{
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(36)
        }}>
          <TouchableOpacityView
            active={true}
            label={I18n.t('confirmreduxsagaitLine') + ' >'}
            onPress={() => this.props.navigation.navigate('AddCollateral')} />
        </View>
      </View>
    );
  }

  renderUnderline() {
    return (
      <View style={{
        flexDirection: 'row',
        width: '100%',
        marginTop: DimensionManager.verticalScale(20)
      }}>
        <View style={{
          width: '46%',
          borderWidth: 0.5,
          borderColor: Colors.transparent,
          borderBottomColor: Colors.reduxsagaBlack,
          marginBottom: DimensionManager.verticalScale(7)
        }} />
        <Text style={{
          width: '8%',
          color: Colors.reduxsagaBlack,
          textAlign: 'center',
        }}>or</Text>
        <View style={{
          width: '46%',
          borderWidth: 0.5,
          borderColor: Colors.transparent,
          borderBottomColor: Colors.reduxsagaBlack,
          marginBottom: DimensionManager.verticalScale(7)
        }} />
      </View>
    );
  }

  renderInterestRate() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(57),
        marginLeft: DimensionManager.scale(34),
        marginRight: DimensionManager.scale(34)

      }}>
        <Text style={[Fonts.style.textRegularGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'center',
          opacity: 0.8
        }]}>
          {I18n.t('interestRateLabel')}
        </Text>
        <Text style={[Fonts.style.largeTextBold, {
          color: Colors.reduxsagaBlack,
          textAlign: 'center',
        }]}>
          12%
        </Text>
        <Text style={[Fonts.style.textMediumLightGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'center',
          fontWeight: '500'
        }]}>
          {I18n.t('bestPossibleRateBasedOnAnAdded')}
        </Text>
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
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={false}
          title={I18n.t('selectreduxsagaitLimit')}
          stepValue={1} />

        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(40)}>
          {this.header()}
          {this.renderCLOCValue(this.state.loanValue)}
          {this.renderSlider()}
          {this.renderComputedCollateral(this.state.loanValue * 4, false)}
          {this.renderInterestRate()}

          {this.renderCollaternalRequired()}
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewCLOCView));
