import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity
 } from 'react-native';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import styles from './Styles/Loans';
import * as Progress from 'react-native-progress';
import TriangleDown from '../../Common/TriangleDown';
import PopoverTooltip from 'react-native-popover-tooltip';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconEntypo from 'react-native-vector-icons/Entypo';

export default class LoansView extends Component {

  constructor(props) {
    super(props);
    this.state = {showTile: true};
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      LayoutAnimation.easeInEaseOut();
    }
  }

  getProgressBar(height) {
    var setHeight = this.state.showTile ? 60 : 0;
    return (
      <View style={{
        marginTop: Math.round(setHeight * DimensionManager.heightScale),
        height: Math.round(40 * DimensionManager.heightScale),
      }}>
        <View style={{
          zIndex: 1
        }}>
          <Progress.Bar
            animated={false}
            progress={0.5}
            borderRadius={0}
            borderWidth={1}
            width={290}
            color={Colors.gray}
            unfilledColor={Colors.white}
            height={height} />
        </View>
        <View style={{
          zIndex: 0,
          position: 'absolute',
          top: 0
        }}>
          <Progress.Bar
            animated={false}
            progress={0.8}
            borderRadius={0}
            borderWidth={1}
            width={290}
            color={Colors.green}
            unfilledColor={Colors.white}
            height={height} />
        </View>
      </View>
    );
  }

  getProgressBarInfo() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <Text style={{
          color: Colors.gray,
          marginTop: Math.round(-2 * DimensionManager.heightScale),
          marginRight: Math.round(16 * DimensionManager.widthScale)
        }}>
        Initial 100,000,000 DAI
        </Text>
        <Text style={{
          color: Colors.green,
          marginTop: Math.round(-2 * DimensionManager.heightScale),
        }}>
        +400,000 DAI
        </Text>
      </View>
    );
  }

  getWarningMessage() {
    return (
      <View style={{
        flexDirection: 'column',
      }}>
        <Text style={{
          color: Colors.gray,
          marginTop: Math.round(16 * DimensionManager.heightScale),
          marginRight: Math.round(16 * DimensionManager.widthScale),
        }}>
          Your CTL is over warning line, do you want to borrow more?
        </Text>
        <TouchableOpacity>
          <Text style={{
            color: Colors.darkGray
          }}>Borrow More></Text>
        </TouchableOpacity>
      </View>
    );
  }

  getLatestActivity() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          marginTop: Math.round(16 * DimensionManager.heightScale),
        }}>
          <Text style={{
            color: Colors.gray,
            fontSize: Math.round(14 * DimensionManager.widthScale),
            textAlign: 'left'
          }}>
          Latest Activities
          </Text>
        </View>
        <View style={{
          marginTop: Math.round(16 * DimensionManager.heightScale),
          marginLeft: Math.round(24 * DimensionManager.widthScale),
        }}>
          <Text style={{
            color: Colors.darkGray,
            fontSize: Math.round(16 * DimensionManager.widthScale),
            textAlign: 'right',
          }}>
            -$350.12
          </Text>
          <Text style={{
            color: Colors.gray,
            fontSize: Math.round(12 * DimensionManager.widthScale),
            textAlign: 'right',
          }}>
            Payment Received 6/1
          </Text>
        </View>
      </View>
    );
  }

  getProgressBarInfoList() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <Text style={{
          color: Colors.gray,
          marginTop: Math.round(-2 * DimensionManager.heightScale),
          marginRight: Math.round(16 * DimensionManager.widthScale)
        }}>
        Initial 100,000,000 DAI
        </Text>
        <Text style={{
          color: Colors.green,
          marginTop: Math.round(-2 * DimensionManager.heightScale),
        }}>
        +400,000 DAI
        </Text>
      </View>
    );
  }

  getLoanBalance() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          marginTop: Math.round(16 * DimensionManager.heightScale),
        }}>
          <Text style={{
            color: Colors.gray,
            fontSize: Math.round(14 * DimensionManager.widthScale),
            textAlign: 'left'
          }}>
          Loan Balance
          </Text>
        </View>
        <View style={{
          marginTop: Math.round(16 * DimensionManager.heightScale),
          marginLeft: Math.round(38 * DimensionManager.widthScale),
        }}>
          <Text style={{
            color: Colors.darkGray,
            fontSize: Math.round(16 * DimensionManager.widthScale),
            textAlign: 'right'
          }}>
            $2,031.56
          </Text>
          <Text style={{
            color: Colors.gray,
            fontSize: Math.round(12 * DimensionManager.widthScale),
            textAlign: 'right'
          }}>
            Payment Received 6/1
          </Text>
        </View>
      </View>
    );
  }

  renderLoans() {
    var dataSet = [{
      assetPrice: '30.04438788484',
      name: 'Bitcoin',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'BTC'
    },
    {
      assetPrice: '30.048484',
      name: 'Libra',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'LBA'
    },
    {
      assetPrice: '30.048484',
      name: 'Litecoin',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'LTC'
    }];

    var results = [];

    dataSet.forEach((data) => {
      results.push(
        <View style={{
          height: Math.round(320 * DimensionManager.heightScale),
          width: Math.round(288 * DimensionManager.widthScale),
          marginBottom: Math.round(12 * DimensionManager.heightScale),
          marginRight: Math.round(4 * DimensionManager.widthScale),
          marginLeft: Math.round(4 * DimensionManager.widthScale),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.lightGray,
          borderRadius: 5,
          shadowOpacity: 0.2,
        }} key={data}>
          <View style={{
            flexDirection: 'column',
          }}>
            <View style={{
              position: 'absolute',
              top: Math.round(-10 * DimensionManager.widthScale),
              right: 0,
            }}>
              <Icon name="star" size={36} color={Colors.gray} />
            </View>

            {this.getProgressBar(36)}
            {this.getProgressBarInfo()}
            {this.getWarningMessage()}
            {this.getLatestActivity()}
            {this.getLoanBalance()}
          </View>

          <View style={{
            position: 'absolute',
            top: Math.round(62 * DimensionManager.heightScale),
            zIndex: 2
          }} />

        </View>
      );
    }, this);
    return results;

  }

  renderLoansList() {
    var dataSet = [{
      assetPrice: '30.04438788484',
      name: 'Bitcoin',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'BTC'
    },
    {
      assetPrice: '30.048484',
      name: 'Libra',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'LBA'
    },
    {
      assetPrice: '30.048484',
      name: 'Litecoin',
      marketValue: '21232562.12',
      available: '18.015223232',
      lockedCollateral: '16.26723673',
      symbol: 'LTC'
    }];

    var results = [];

    dataSet.forEach((data) => {
      results.push(
        <View style={{
          height: Math.round(40 * DimensionManager.heightScale),
          width: Math.round(288 * DimensionManager.widthScale),
          marginBottom: Math.round(20 * DimensionManager.heightScale),
          marginRight: Math.round(4 * DimensionManager.widthScale),
          marginLeft: Math.round(4 * DimensionManager.widthScale),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.lightGray,
          borderRadius: 5,
          shadowOpacity: 0.2,
        }} key={data}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              marginBottom: Math.round(12 * DimensionManager.heightScale)
            }}>
              <View>
                <Text style={{
                  color: Colors.gray,
                  marginTop: Math.round(6 * DimensionManager.heightScale),
                  marginRight: Math.round(16 * DimensionManager.widthScale)
                }}>
                Updated 11/2/2018 100.00 DIA LOAN
                </Text>
              </View>
              <View style={{
                marginTop: Math.round(4 * DimensionManager.heightScale)
              }}>
                {this.getProgressBar(10)}
              </View>
            </View>
        </View>
      );
    }, this);
    return results;

  }


  onPressTile(tile) {
    this.setState(previousState => {
      return tile ? {showTile: true} : {showTile: false};
    });
  }

  render() {
    var dataSet = [{
      updated: '11/2/2018 100.000 DAI LOAN',
      CTL: 200,
      initial: 10000000,
      increased: 4000000,
      latestActivity: -350.12,
      loanBalance: 2031.32
    },
    {
      updated: '01/6/2018 100.000 DAI LOAN',
      CTL: 200,
      initial: 10000000,
      increased: 4000000,
      latestActivity: -350.12,
      loanBalance: 2031.32
    },
    {
      updated: '6/9/2012 100.000 DAI LOAN',
      CTL: 200,
      initial: 10000000,
      increased: 4000000,
      latestActivity: -350.12,
      loanBalance: 2031.32
    }];

    return (
      <View style={styles.container}>
        <View style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          width: Math.round(288 * DimensionManager.widthScale),
        }}>
          <TouchableOpacity onPress={this.onPressTile.bind(this, true)}>
            <IconEntypo
              name="grid"
              size={36}
              color={this.state.showTile ? Colors.gray : Colors.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressTile.bind(this, false)}>
            <IconFoundation
              name="list"
              size={36}
              color={!this.state.showTile ? Colors.gray : Colors.lightGray} />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Your Loans</Text>
        <Text style={{
          color: Colors.gray,
          marginBottom: Math.round(12 * DimensionManager.heightScale)
        }}>Updated {dataSet[0].updated}</Text>
        {this.state.showTile ? this.renderLoans() : this.renderLoansList()}
      </View>
    );
  }
}
