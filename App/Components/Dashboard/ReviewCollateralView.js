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

class ReviewCollateralView extends Component {

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
      <View style={{
        marginTop: DimensionManager.verticalScale(10)
      }}>
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
            currencyValue={value}
          />
        </View>
      </View>
    );
  }

  renderMonthlyPayments(mode) {
    if (mode === 'optimal') {
      return (
        <View style={{
          marginTop: DimensionManager.verticalScale(12),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={[Fonts.style.textMediumLightGT, {
            //textAlign: 'center'
          }]}>
            {I18n.t('minimumMonthlyPayment')}
          </Text>
          <Text style={[Fonts.style.textMediumLightGT, {
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }]}>
            {'\b'} $41.00, 36mo.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(12)
        }}>
          <Text style={[Fonts.style.textMediumLightGT, {
            textAlign: 'center'
          }]}>
            {I18n.t('minimumMonthlyPayment')}
          </Text>
          <Text style={[Fonts.style.textMediumLightGT, {
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            marginTop: DimensionManager.verticalScale(6)
          }]}>
            $41.00, 36mo.
          </Text>
          <Text style={[Fonts.style.textMediumLightGT, {
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(12)
          }]}>
            {I18n.t('interestRateLabel') + ':'}
          </Text>
          <Text style={[Fonts.style.textMediumLightGT, {
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            marginTop: DimensionManager.verticalScale(6)
          }]}>
            13%
          </Text>
        </View>
      );
    }
  }

  headerAssets() {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        textAlign: 'left',
        marginTop: DimensionManager.verticalScale(20),
        marginLeft: DimensionManager.scale(13),
        marginBottom: DimensionManager.verticalScale(8),
      }]}>
        {I18n.t('assetsLockedForLineOfreduxsagait')}
      </Text>
    );
  }

  renderLockedAssets(symbol, value, underline) {
    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: Colors.reduxsagaOffWhite,
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(12),
          marginBottom: DimensionManager.verticalScale(12),
          alignItems: 'center'
        }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: DimensionManager.scale(36),
              height: DimensionManager.verticalScale(36),
              marginLeft: DimensionManager.scale(23),
            }}
            source={require('../Images/lba-icon.png')} />
          <Text style={[Fonts.style.h5TextRegular, {
            marginLeft: DimensionManager.scale(12),
            fontWeight: 'normal',
            opacity: 0.6
          }]}>
            {symbol}:
          </Text>
          <Text style={[Fonts.style.h5TextRegular, {
            flex: 1,
            marginRight: DimensionManager.scale(31),
            textAlign: 'right',
            fontWeight: 'normal',
            opacity: 0.6
          }]}>
            {value}
          </Text>
        </View>
        {underline ? (
          <View style={{
            borderWidth: 0.5,
            borderColor: Colors.transparent,
            borderBottomColor: Colors.reduxsagaBlack,
            marginBottom: DimensionManager.verticalScale(7),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.scale(13),
          }} />
        ) : null}
      </View>
    );
  }

  headerLockedLBAAssets() {
    return (
      <Text style={[Fonts.style.textRegularGT, {
        textAlign: 'center',
        marginTop: DimensionManager.verticalScale(20),
        marginLeft: DimensionManager.scale(23),
        marginRight: DimensionManager.scale(24),
        marginBottom: DimensionManager.verticalScale(8),
      }]}>
        {I18n.t('lockedLBAInvestmentForReducedBestInterestRate')}
      </Text>
    );
  }

  renderLBALockedAssets(symbol, value, underline) {
    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: Colors.reduxsagaOffWhite,
      }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: DimensionManager.verticalScale(12),
          alignItems: 'center',
        }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: DimensionManager.scale(36),
              height: DimensionManager.verticalScale(36),
              marginLeft: DimensionManager.scale(23),
              alignItems: 'center'
            }}
            source={require('../Images/lba-icon.png')} />
          <Text style={[Fonts.style.h5TextRegular, {
            marginLeft: DimensionManager.scale(12),
            fontWeight: 'normal',
            opacity: 0.6,
          }]}>
            {symbol}:
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: DimensionManager.verticalScale(9),
          }}>
            <Text style={[Fonts.style.textBoldGT, {
              marginRight: DimensionManager.scale(31),
              textAlign: 'right',
              fontWeight: 'normal',
              opacity: 1
            }]}>
              ${value}
            </Text>
            <Text style={[Fonts.style.textMediumLightGT, {
              marginRight: DimensionManager.scale(31),
              textAlign: 'right',
              fontWeight: 'normal',
              opacity: 0.6
            }]}>
              90,000 LBA
            </Text>
            <Text style={[Fonts.style.textMediumLightGT, {
              marginRight: DimensionManager.scale(31),
              textAlign: 'right',
              fontWeight: 'normal',
              opacity: 0.6
            }]}>
              0 Available
            </Text>
          </View>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: DimensionManager.scale(13),
          marginRight: DimensionManager.scale(12),
          marginBottom: DimensionManager.verticalScale(8)
        }}>
          <Text style={[Fonts.style.textMediumGT, {
            fontWeight: '500'
          }]}>
            {I18n.t('deducedFromTheProceedsOfTheLoan')}
          </Text>
        </View>

        {underline ? (
          <View style={{
            borderWidth: 0.5,
            borderColor: Colors.transparent,
            borderBottomColor: Colors.reduxsagaBlack,
            marginBottom: DimensionManager.verticalScale(7),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.scale(13),
          }} />
        ) : null}
      </View>
    );
  }

  renderPayments() {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={{

        }}>
          {I18n.t('minimumMonthlyPayment')}
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
          title={I18n.t('review')}
          stepValue={3} />

        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(40)}>
          {this.header()}
          {this.renderCLOCValue(80000)}
          {this.renderMonthlyPayments('enhanced')}
          {this.headerAssets()}
          {this.renderLockedAssets('ETH', 21.45277633, true)}
          {this.renderLockedAssets('BTC', 0.453467453, false)}

          {this.headerLockedLBAAssets()}
          {this.renderLBALockedAssets('LBA', 2700, false)}
          {this.renderMonthlyPayments('optimal')}
          <View style={{
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(20),
            backgroundColor: Colors.transparent
          }}>
            <TouchableOpacityView
              active={true}
              label={I18n.t('commit')}
              onPress={() => this.props.navigation.navigate('ReviewCollateral')} />
          </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ReviewCollateralView));
