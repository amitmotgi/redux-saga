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

class EditPaymentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoPaySwitch: false
    };
  }

  renderLoanBalance() {
    return (
      <View style={styles.loanBalance}>
        <View>
          <Text style={styles.loanHeadText}>
            {I18n.t('loanBalance').toUpperCase()}
          </Text>
        </View>
        <View style={styles.loanContentView}>
          <CurrencyFormatView
            currencyValue={200000.111}
          />
        </View>

      </View>
    );
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

  renderPaymentHistory() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Monthly Payment
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(24),
            marginBottom: DimensionManager.verticalScale(24)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
              textDecorationLine: 'underline'
            }]}>
              $665.00
            </Text>
          </View>
        </View>
        {this.renderLine()}

      </View>
    );
  }

  renderPaymentTimeFrame() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(26)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Payoff Timeframe
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(11),
            marginBottom: DimensionManager.verticalScale(11)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
              textDecorationLine: 'underline'
            }]}>
              3 months left
            </Text>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              lineHeight: DimensionManager.scale(26),
              opacity: 0.4,
            }]}>
              36 months in total
            </Text>
          </View>
        </View>
        {this.renderLine()}
      </View>
    );
  }

  renderPaymentDate() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Payment Date
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(11),
            marginBottom: DimensionManager.verticalScale(11)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
              textDecorationLine: 'underline'
            }]}>
              4th of every month
            </Text>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              lineHeight: DimensionManager.scale(26),
              opacity: 0.4,
            }]}>
              Next payment Aug. 4th
            </Text>
          </View>
        </View>
        {this.renderLine()}
      </View>
    );
  }

  renderAutoPay() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Autopay
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(30),
            marginBottom: DimensionManager.verticalScale(24),
            alignItems: 'flex-end'
          }}>
            <Switch
              value={this.state.autoPaySwitch}
              onValueChange={(val) => {
                this.setState({
                  autoPaySwitch: val
                })
              }}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={22}
              barHeight={8}
              circleBorderWidth={0}
              backgroundActive={Colors.reduxsagaLightGreen}
              backgroundInactive={Colors.reduxsagaGray}
              circleActiveColor={Colors.reduxsagaGreen}
              circleInActiveColor={Colors.reduxsagaGreen}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center'
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
            />

          </View>
        </View>
        {this.renderLine()}
      </View>
    );
  }

  renderInterestRate() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Interest Rate
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(24),
            marginBottom: DimensionManager.verticalScale(24)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
              textDecorationLine: 'underline'
            }]}>
              11%
            </Text>
          </View>
        </View>
        {this.renderLine()}
      </View>
    );
  }

  renderInterest() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Interest
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(13),
            marginBottom: DimensionManager.verticalScale(13)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
            }]}>
              $3,570
            </Text>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              opacity: 0.4
            }]}>
              10.51%
            </Text>
          </View>
        </View>
        {this.renderLine()}
      </View>
    );
  }

  renderPrincipal() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(27),
            marginBottom: DimensionManager.verticalScale(27)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
            }]}>
              Principal
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(13),
            marginBottom: DimensionManager.verticalScale(13)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
            }]}>
              $20,010
            </Text>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              opacity: 0.4
            }]}>
              89.49%
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
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('editPaymentSection')} />
          {this.renderLoanBalance()}

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          >
            {this.renderPaymentHistory()}
            {this.renderPaymentTimeFrame()}
            {this.renderPaymentDate()}
            {this.renderAutoPay()}
            <View style={{
              width: '100%',
              backgroundColor: Colors.reduxsagaGrayBG,
              height: DimensionManager.verticalScale(20)
            }} />

            {this.renderInterestRate()}
            {this.renderInterest()}
            {this.renderPrincipal()}

            <View style={{
              backgroundColor: Colors.reduxsagaGrayBG
            }}>
              <TouchableOpacityView
                style={{
                  width: DimensionManager.scale(335),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(20),
                  marginBottom: DimensionManager.verticalScale(20),
                }}
                active={true}
                label={I18n.t('Confirm')}
                onPress={() => {
                  this.props.navigation.navigate('ChooseAccount');
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditPaymentView));
