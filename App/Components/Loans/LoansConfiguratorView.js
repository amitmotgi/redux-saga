import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TextInput
 } from 'react-native';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import styles from './Styles/LoansConfigurator';
import PieChart from 'react-native-pie-chart';
import Slider from 'react-native-slider';
import I18n from '../../I18n';
import { EventRegister } from 'react-native-event-listeners';

export default class LoansConfiguratorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanValue: 50,
      collateral: 10,
      equalPayments: 12,
      interest: 4,
      monthlyPayment: '1,041'
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      LayoutAnimation.easeInEaseOut();
    }
    /* TODO fix this dirty hack */
    EventRegister.addEventListener('languageLoaded', () => {
      this.setState({newLang: null});
    });
  }

  renderLoanValue() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          width: Math.round(80 * DimensionManager.widthScale),
          marginTop: Math.round(-16 * DimensionManager.heightScale),
        }}>
          <Text style={{
            color: Colors.darkGray
          }}>Loan Value</Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: Math.round(208 * DimensionManager.widthScale),
        }}>
          <View style={{
            marginTop: Math.round(-16 * DimensionManager.heightScale),
            alignItems: 'flex-end',
          }}>
            <Text style={{
              color: Colors.darkGray
            }}>{this.state.loanValue.toFixed(9)} DAI</Text>
          </View>
          <Slider
            value={this.state.loanValue}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={Colors.blue}
            thumbTintColor={Colors.gray}
            onValueChange={value => this.setState({ loanValue: value })}
            trackStyle={{
              height: Math.round(2 * DimensionManager.heightScale),
            }}
            style={{
              marginBottom: Math.round(16 * DimensionManager.heightScale)
            }}
          />
        </View>
      </View>
    );
  }

  renderCollateralOffered() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            color: Colors.darkGray,
          }}>Collateral Offered</Text>
        </View>
        <View style={{
          flex: 1,
          marginRight: Math.round(8 * DimensionManager.widthScale)
        }}>
          <Text style={{
            color: Colors.darkGray,
            textAlign: 'right',
          }}>{this.state.collateral.toFixed(9)} Bitcoin</Text>
        </View>
      </View>
    );
  }

  renderEqualPayments(){
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            color: Colors.darkGray,
          }}>Equal Payments</Text>
        </View>
        <View style={{
          flex: 1,
          marginRight: Math.round(8 * DimensionManager.widthScale)
        }}>
          <Text style={{
            color: Colors.darkGray,
            textAlign: 'right',
          }}>{Math.round(this.state.equalPayments)} Months</Text>
        </View>
      </View>
    );
  }

  render() {
    const chart_wh = 200;
    const series = [this.state.loanValue, this.state.interest];
    const sliceColor = [Colors.blue, Colors.orange];

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.headerText}>{I18n.t('yourLoan')}</Text>
          <View style={{
            alignItems: 'center',
            transform: [
              {rotate: '60deg'}
            ]
          }}>
            <PieChart
              chart_wh={chart_wh}
              series={series}
              doughnut={true}
              sliceColor={sliceColor}
              coverFill={Colors.darkBlue}
              coverRadius={0.55}
            />
          </View>
          <View style={{
            position: 'absolute',
            top: Math.round(106 * DimensionManager.heightScale),
            left: Math.round(136 * DimensionManager.widthScale)
          }}>
            <Text style={{
              position: 'absolute',
              top: Math.round(-40 * DimensionManager.heightScale),
              left: Math.round(100 * DimensionManager.widthScale),
              color: Colors.orange,
              textAlign: 'center',
              fontSize: Math.round(10 * DimensionManager.widthScale),
            }}>{this.state.loanValue.toFixed(0)} DAI/MO {'\n'}INTEREST</Text>
            <Text style={{
              color: Colors.blue,
              fontSize: Math.round(10 * DimensionManager.widthScale),
              textAlign: 'center'
            }}>MONTHLY {'\n'}PAYMENT</Text>
            <Text style={{
              color: Colors.transparent,
              fontSize: Math.round(24 * DimensionManager.widthScale),
              textAlign: 'center'
            }}>{(this.state.loanValue * 20).toFixed(0)}</Text>
            <Text style={{
              color: Colors.blue,
              fontSize: Math.round(10 * DimensionManager.widthScale),
              textAlign: 'center',
              marginTop: Math.round(4 * DimensionManager.heightScale)
            }}>DAI/MO</Text>
            <Text style={{
              width: Math.round(90 * DimensionManager.widthScale),
              position: 'absolute',
              top: Math.round(104 * DimensionManager.heightScale),
              left: Math.round(80 * DimensionManager.widthScale),
              color: Colors.transparent,
              fontSize: Math.round(10 * DimensionManager.widthScale),
            }}>*Interest Rate: 4%</Text>
            <Text style={{
              width: Math.round(90 * DimensionManager.widthScale),
              position: 'absolute',
              top: Math.round(96 * DimensionManager.heightScale),
              left: Math.round(-126 * DimensionManager.widthScale),
              color: Colors.blue,
              fontSize: Math.round(10 * DimensionManager.widthScale),
              textAlign: 'center'
            }}>{(this.state.loanValue * 20).toFixed(0)} DAI/MO {'\n'}PRINCIPAL</Text>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          {this.renderLoanValue()}
          {this.renderCollateralOffered()}

          <Slider
            value={this.state.collateral}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={Colors.blue}
            thumbTintColor={Colors.gray}
            onValueChange={value => this.setState({ collateral: value })}
            trackStyle={{
              height: Math.round(2 * DimensionManager.heightScale)
            }}
            style={{
              marginBottom: Math.round(16 * DimensionManager.heightScale)
            }}
          />

          {this.renderEqualPayments()}
          <Slider
            value={this.state.equalPayments}
            minimumValue={0}
            maximumValue={360}
            onValueChange={value => this.setState({ equalPayments: value })}
            minimumTrackTintColor={Colors.blue}
            thumbTintColor={Colors.gray}
            trackStyle={{
              height: Math.round(2 * DimensionManager.heightScale)
            }}
            style={{
              marginBottom: Math.round(16 * DimensionManager.heightScale)
            }}
          />
        </View>
      </View>
    );
  }

}
