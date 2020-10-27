import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Slider,
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
import Slider1 from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class OpenCLOCView extends Component {

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
        textAlign: 'center'
      }]}>
        {I18n.t('lineofreduxsagait')}
      </Text>
    );
  }

  renderCLOCValue = () => {
    return (
      <View>
        <Text style={[Fonts.style.largeTextBold, {
          color: Colors.reduxsagaBack,
          textAlign: 'center',
          textDecorationLine: 'underline'
        }]}>
          $ {this.state.loanValue || '2,000.00'}
        </Text>
      </View>
    );
  }

  renderSlider = () => {
    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <Slider1
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

  renderInterestSlider = () => {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: DimensionManager.verticalScale(46)
      }}>
        <View style={{
          marginTop: DimensionManager.verticalScale(20)
        }}>
          <Text style={[Fonts.style.textSmallGT, {
            alignSelf: 'flex-start',
            marginLeft: DimensionManager.scale(36),
            color: Colors.reduxsagaBlack,
            opacity: 0.6
          }]}>
            14%
          </Text>
          <Text style={[Fonts.style.textSmallGT, {
            alignSelf: 'flex-end',
            marginTop: DimensionManager.verticalScale(74),
            color: Colors.reduxsagaBlack,
            opacity: 0.6

          }]}>
            11%
          </Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <Slider
            value={this.state.interestValue || 1400}
            step={100}
            minimumValue={1100}
            maximumValue={1400}
            minimumTrackTintColor={Colors.reduxsagaGray}
            maximumTrackTintColor={Colors.reduxsagaGreen}
            thumbTintColor={Colors.reduxsagaBlack}
            onValueChange={value => {
              if (value && value / 100 === 12) {
                this.setState({ showBuy: true });
              } else {
                this.setState({ showBuy: false });
              }
              this.setState({ interestValue: value });
            }}
            style={{
              height:DimensionManager.scale(103),
              width: DimensionManager.scale(103),
              marginLeft: DimensionManager.scale(-28),
              marginTop: DimensionManager.verticalScale(20),
              transform: [{ rotate: '270deg'}],
              marginBottom: DimensionManager.verticalScale(20),
            }}
          />
          <View style={{
            flexDirection: 'column',
          }}>
            <Text style={[Fonts.style.bodyText, {
              textAlign: 'left',
              //marginLeft: DimensionManager.scale(36),
              marginTop: DimensionManager.verticalScale(18)
            }]}>
              Interest Rate / LBA Owned
            </Text>
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(12)
            }}>
              <Text style={[Fonts.style.largeTextBold, {
                textAlign: 'left',
                marginTop: DimensionManager.verticalScale(-6)
              }]}>
                {(this.state.interestValue) / 100}% /
              </Text>
              <Text style={[Fonts.style.h5TextBold, {
                textAlign: 'left',
                marginTop: DimensionManager.verticalScale(22)

              }]}>
                52K
              </Text>
              <Text style={[Fonts.style.bodyText, {
                textAlign: 'left',
                marginTop: DimensionManager.verticalScale(32)
              }]}>
                LBA
              </Text>
            </View>
          </View>

        </View>
      </View>
    );
  }

  renderComputedCollateral() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(20),
        backgroundColor: Colors.transparent
      }}>
        <Text style={[Fonts.style.textBoldGT, {
          textAlign: 'center'
        }]}>
          {I18n.t('collateralRequired')}
        </Text>
        <View>
          <Text style={[Fonts.style.largeTextBold, {
            color: Colors.reduxsagaBack,
            textAlign: 'center',
            textDecorationLine: 'underline',
            marginTop: DimensionManager.verticalScale(12),
          }]}>
            $ {4 * this.state.loanValue || '8,000.00'}
          </Text>
        </View>
      </View>
    );
  }

  renderCollaternalRequired() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(20),
        backgroundColor: Colors.transparent
      }}>
        <Text style={[Fonts.style.textBoldGT, {
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(12),
        }]}>
        $200,000.00 {'\n'} {I18n.t('availableInWallet')}
        </Text>
        <Text style={[Fonts.style.textSmallNormalGT, {
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(12),
        }]}>
        {I18n.t('minimumMonthlyPayment')}: $41.00{'\n'}
        14% {I18n.t('interestRate')}
        </Text>

        <View style={{
          alignSelf: 'center',
          marginTop: DimensionManager.verticalScale(36)
        }}>
          <TouchableOpacityView
            active={true}
            label={I18n.t('confirmCollateral')}
            onPress={() => this.props.navigation.navigate('ConfirmCollateral')} />
        </View>
      );
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
          {this.renderCLOCValue()}
          {this.renderSlider()}
          {this.renderComputedCollateral()}
          {this.renderInterestSlider()}

          {this.state.showBuy ? (
            <View style={{
              marginTop: DimensionManager.verticalScale(36),

            }}>
              <Text style={[Fonts.style.textMediumGT, {
                color: Colors.reduxsagaRed,
                textAlign: 'center',
                opacity: 1,
                fontWeight: '500',
                marginLeft: DimensionManager.scale(33),
                marginRight: DimensionManager.scale(31),
              }]}>
                {I18n.t('toGetInterestRate')}
              </Text>
              <TouchableOpacityView
                style={{
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(43),
                }}
                active={true}
                label={I18n.t('buyToken')}
                onPress={() => {

                }} />
            </View>
          ) : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(OpenCLOCView));
