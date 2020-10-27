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

class LoanBalanceView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
  }

  renderHeader() {
    return (
      <View style={{
        alignSelf: 'center'
      }}>
        <Text style={[Fonts.style.h5TextRegular, {
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(36),
          marginBottom: DimensionManager.verticalScale(20),
          color: Colors.reduxsagaLine
        }]}>{I18n.t('loanBalance')}</Text>
      </View>
    );
  }

  renderBalance() {
    const currencyNumber = I18n.toNumber(2213.12111, { precision: 2 });
    const currencyInteger = currencyNumber.slice(0,currencyNumber.length - 3);
    const currencyDecimals = currencyNumber.slice(currencyNumber.length - 3);

    return (
      <View style={styles.currencyTitle}>
        <Text style={styles.currencyTitleFirst}>$</Text>
        <Text style={styles.currencyTitleSecond}>
          {currencyInteger}
        </Text>
        <View style={styles.currencyTitleThird}>
          <Text style={styles.currencyTitleThirdText}>{currencyDecimals}</Text>
          <Text style={styles.currencyTitleThirdText}>USD</Text>
        </View>
      </View>
    );
  }

  renderAutoPayments() {
    return (
      <View style={{
        marginBottom: DimensionManager.verticalScale(36)
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          marginTop: DimensionManager.verticalScale(5),
          opacity: 0.8,
          textAlign: 'center'
        }]}>
          Auto-payment, 36 mon., $655/mon.
        </Text>

        <View style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}>
          <Text style={[Fonts.style.textMediumGT, {
            color: Colors.reduxsagaBlack,
            marginTop: DimensionManager.verticalScale(5),
            opacity: 0.8,
            textAlign: 'center'
          }]}>
            Estimated Payoff 12/1/2019
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('EditPayment');
            }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5),
              opacity: 0.8,
              textAlign: 'center',
              fontWeight: '500',
              textDecorationLine: 'underline',
            }]}>
              {' '}Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderOneTimePayment() {
    return (
      <View style={{
        flexDirection: 'row',
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20)
      }}>
      <TouchableOpacityView
        style={{
          width: DimensionManager.scale(162),
          marginRight: DimensionManager.scale(11),
          alignSelf: 'center'
        }}
        active={true}
        label={I18n.t('oneTimePay')}
        onPress={() => {
          this.props.navigation.navigate('OneTimePayment');
        }} />
        <TouchableOpacityView
          style={{
            width: DimensionManager.scale(162),
            alignSelf: 'center'
          }}
          active={true}
          label={I18n.t('payOffLoan')}
          onPress={() => {
            this.props.navigation.navigate('PayOffLoan');
          }} />
      </View>
    )
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        marginBottom: DimensionManager.verticalScale(6.4),
        marginTop: DimensionManager.scale(9),
        opacity: 0.2
      }} />
    )
  }

  renderPaymentHistory() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(29),
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          marginTop: DimensionManager.verticalScale(5),
          opacity: 0.4,
          textAlign: 'left',
          fontWeight: '500',
        }]}>
          Payment History
        </Text>
        {this.renderLine()}

        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%'
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: 'normal',
            }]}>
              Incoming Payment
            </Text>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaGreen,
              textAlign: 'left',
              fontWeight: 'normal',
              fontSize: DimensionManager.scale(10)
            }]}>
              Aug 4th
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%'
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: 'normal',
              fontSize: DimensionManager.scale(18)
            }]}>
              $665.00 >
            </Text>
          </View>
        </View>
        {this.renderLine()}

      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
        <View style={styles.wrapper}>
          {this.renderHeader()}
          {this.renderBalance()}
          {this.renderAutoPayments()}
          {this.renderOneTimePayment()}
          {this.renderPaymentHistory()}
        </View>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaOffWhite,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  currencyTitle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currencyTitleFirst: {
    ...Fonts.style.textSmallBoldGT,
    color: Colors.reduxsagaBlack,
    marginTop: DimensionManager.verticalScale(10),
    marginRight: DimensionManager.scale(3)
  },
  currencyTitleSecond: {
    ...Fonts.style.semiTextBold,
    color: Colors.reduxsagaBlack
  },
  currencyTitleThird: {
    marginTop: DimensionManager.verticalScale(16)
  },
  currencyTitleThirdText: {
    ...Fonts.style.textSmallBoldGT,
    color: Colors.reduxsagaGray
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoanBalanceView));
