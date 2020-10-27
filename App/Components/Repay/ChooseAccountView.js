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

class ChooseAccountView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoPaySwitch: false
    };
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        opacity: 0.2
      }} />
    )
  }

  renderHeader() {
    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(27),
          marginBottom: DimensionManager.verticalScale(16),
        }}>
          <Text style={{
            ...Fonts.style.normal,
            opacity: 0.6,
            fontSize: DimensionManager.scale(12),
            fontWeight: 'bold',
            fontStyle: 'normal',
            marginLeft: DimensionManager.scale(20),
          }}>
            REPAY FROM ACCOUNT
          </Text>
        </View>

        <View style={{
        }}>
          {this.renderLine()}
        </View>
      </View>
    )
  }

  renderBankAccounts() {
    return (
      <View style={{
        flexDirection: 'column',
        height: DimensionManager.verticalScale(69.9)
      }}>
        <TouchableOpacity style={{
          flexDirection: 'column',
        }}
        onPress={(data) => {
          this.props.navigation.navigate('OneTimePayment');
        }}>

        <View style={{
          flexDirection: 'row',
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }}>
          <View style={{
            height: DimensionManager.verticalScale(45),
            width: DimensionManager.scale(67),
            marginTop: DimensionManager.verticalScale(12.9),
            backgroundColor: Colors.reduxsagaGray,
            alignSelf: 'flex-start'
          }}>
          </View>

          <View style={{
            marginLeft: DimensionManager.scale(8),
            marginTop: DimensionManager.verticalScale(24.9),
            width: DimensionManager.scale(112)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: '#787e8b',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              lineHeight: DimensionManager.scale(21),
            }]}>
              Visa Debit Debit
            </Text>
          </View>

          <View style={{
            marginLeft: DimensionManager.scale(89),
          }}>
            <View style={{
              flexDirection: 'row',
              marginTop: DimensionManager.verticalScale(39.4)
            }}>
              <Image
                style={{
                  width: DimensionManager.scale(4),
                  height: DimensionManager.verticalScale(4),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(4)
                }}
                source={require('../Images/oval.png')} />
              <Image
                style={{
                  width: DimensionManager.scale(4),
                  height: DimensionManager.verticalScale(4),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(4)
                }}
                source={require('../Images/oval.png')} />
              <Image
                style={{
                  width: DimensionManager.scale(4),
                  height: DimensionManager.verticalScale(4),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(4)
                }}
                source={require('../Images/oval.png')} />
            </View>
          </View>
          <View style={{
            marginTop: DimensionManager.verticalScale(28.5)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: '#0a0f13',
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              lineHeight: DimensionManager.scale(21),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'
            }]}>
              8744
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={{
          marginTop: DimensionManager.verticalScale(12)
        }}>
          {this.renderLine()}
        </View>
      </View>
    );
  }

  renderAddAccount() {
    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <TouchableOpacity style={{
          marginTop: DimensionManager.verticalScale(26.9),
          marginLeft: DimensionManager.scale(18),
          marginBottom: DimensionManager.verticalScale(25),
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaDarkBlue,
              textAlign: 'left',
              fontWeight: 'bold',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(14),
              lineHeight: DimensionManager.scale(26),
            }]}>
              Add account
            </Text>

            <View style={{
              marginRight: DimensionManager.scale(21),
              marginLeft: DimensionManager.scale(248),
              alignSelf: 'center'
            }}>
              <Image
                style={{
                  resizeMode: 'contain'
                }}
                source={require('../Images/arrow.png')} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{
        }}>
          {this.renderLine()}
        </View>
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
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('chooseAccount')} />

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          >

            {this.renderHeader()}

            {this.renderBankAccounts()}
            {this.renderBankAccounts()}
            {this.renderBankAccounts()}
            {this.renderBankAccounts()}

            {this.renderAddAccount()}

            <View style={{
              backgroundColor: Colors.transparent
            }}>
              <TouchableOpacityView
                style={{
                  width: DimensionManager.scale(335),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(179.6),
                  marginBottom: DimensionManager.verticalScale(20),
                }}
                active={true}
                label={I18n.t('Continue')}
                onPress={() => {

                }} />
            </View>

          </ScrollView>
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
  },
  loanBalance: {
    height: DimensionManager.verticalScale(127),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginTop: DimensionManager.verticalScale(-14),

  },
  loanContentView: {
    marginTop: DimensionManager.verticalScale(5),
    marginBottom: DimensionManager.verticalScale(18),
  },
  loanFooterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loanFooterTitle: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginRight: DimensionManager.scale(7)
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ChooseAccountView));
