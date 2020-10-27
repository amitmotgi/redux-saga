import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  PanResponder
 } from 'react-native';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import styles from './Styles/Assets';
import I18n from '../../I18n';
import { EventRegister } from 'react-native-event-listeners';

export default class PortfolioView extends Component {

  constructor(props) {
    super(props);
    this.state = {showNews: false, scrollEnabled: true};

    /* TODO fix this dirty hack */
    EventRegister.addEventListener('languageLoaded', () => {
      this.setState({newLang: null});
    });

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({scrollEnabled: false});
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({scrollEnabled: true});
      }
    });
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      LayoutAnimation.easeInEaseOut();
    }
  }

  onPressNews = () => {
    this.setState(previousState => {
      return {showNews: previousState && !previousState.showNews};
    });
  }

  getNews() {
    var results = [];
    var dataSet = [
      {
        title: 'Ukraine’s Financial Stability Council Supports Crypto Regulatory Concept',
        url: 'https://news.bitcoin.com/ukraines-financial-stability-council-supports-crypto-regulatory-concept/',
        source: 'Forbes',
        time: '2 hours ago'
      },
      {
        title: 'British Police Seize £1.25 Million in Bitcoin from Criminal',
        url: 'https://www.coinspeaker.com/2018/07/20/british-police-seize-1-25-million-in-bitcoin-from-criminal/',
        source: 'CNBC',
        time: '6 hours ago'
      },
      {
        title: 'CME Report: Bitcoin Futures Average Daily Volume up 93% in Second Quarter',
        url: 'https://cointelegraph.com/news/cme-report-bitcoin-futures-average-daily-volume-up-93-in-second-quarter',
        source: 'Forbes',
        time: '4 hours ago'
      },
      {
        title: 'Cloud Mining Platform HashFlare Stops Services, Disables Equipment on SHA-256 Contracts',
        url: 'https://cointelegraph.com/news/cloud-mining-platform-hashflare-stops-services-disables-equipment-on-sha-256-contracts',
        source: 'CNBC',
        time: '3 hours ago'
      },
      {
        title: 'India’s Supreme Court to Issue Final Ruling on RBI Cryptocurrency Ban in September',
        url: 'https://bitcoinist.com/indias-supreme-court-to-issue-final-ruling-on-rbi-cryptocurrency-ban-in-september/',
        source: 'Forbes',
        time: '1 hours ago'
      }
    ];

    dataSet.map((data) => {
      results.push(
        <View style={{
          color: Colors.gray,
          fontSize: Math.round(14 * DimensionManager.widthScale)
        }}>
          <TouchableOpacity>
            <Text style={{
              marginLeft: Math.round(16 * DimensionManager.widthScale),
              marginRight: Math.round(16 * DimensionManager.widthScale),
              fontSize: Math.round(12 * DimensionManager.widthScale),
              color: Colors.darkGray,
            }}>{data.title}</Text>
            <Text style={{
              marginLeft: Math.round(16 * DimensionManager.widthScale),
              marginRight: Math.round(16 * DimensionManager.widthScale),
              fontSize: Math.round(10 * DimensionManager.widthScale),
              color: Colors.gray,
              marginBottom: Math.round(10 * DimensionManager.heightScale)
            }}>{data.source} {data.time}</Text>
          </TouchableOpacity>
        </View>
      );
    }, this);

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onPressNews()}>
          <Text style={{
            textAlign: 'center',
            color: Colors.darkGray,
            marginBottom: Math.round(16 * DimensionManager.heightScale),
            marginTop: Math.round(20 * DimensionManager.heightScale)
          }}>Market News</Text>
        </TouchableOpacity>
        {this.state.showNews ?
          <ScrollView
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: Math.round(10 * DimensionManager.heightScale)
            }}>
          <View style={{
            flex: 0,
            backgroundColor: Colors.transparent,
            marginTop: Math.round(10 * DimensionManager.heightScale)
          }}>
            {results}
          </View>
          </ScrollView>
        : null}
      </View>
    );
  }

  getAssets(data) {
    return (
      <View>
        <Text style={{
          textAlign: 'center',
          color: Colors.gray,
          fontSize: Math.round(12 * DimensionManager.widthScale),
          marginTop: Math.round(8 * DimensionManager.heightScale)
        }}>{data.name}</Text>
          <View style={{
            flexDirection: 'row',
            height: Math.round(70 * DimensionManager.heightScale),
          }}>
            <View style={{
              width: Math.round(144 * DimensionManager.widthScale),
            }}>
              <Text style={{
                textAlign: 'center',
                color: Colors.gray,
                fontSize: Math.round(12 * DimensionManager.widthScale),
                marginTop: Math.round(8 * DimensionManager.heightScale)
              }}>TOTAL ASSETS</Text>
              <Text style={{
                textAlign: 'center',
                color: Colors.darkGray,
                fontSize: Math.round(12 * DimensionManager.widthScale),
                marginTop: Math.round(8 * DimensionManager.heightScale)
              }}>{data.assetPrice}</Text>
            </View>
            <View style={{
              width: Math.round(144 * DimensionManager.widthScale),
            }}>
              <Text style={{
                textAlign: 'center',
                color: Colors.gray,
                fontSize: Math.round(12 * DimensionManager.widthScale),
                marginTop: Math.round(8 * DimensionManager.heightScale)
              }}>MARKET VALUE</Text>
              <Text style={{
                textAlign: 'center',
                color: Colors.darkGray,
                fontSize: Math.round(12 * DimensionManager.widthScale),
                marginTop: Math.round(8 * DimensionManager.heightScale)
              }}>{data.marketValue}</Text>
            </View>
        </View>
        <View style={{
          borderBottomWidth: 0.2,
          borderColor: Colors.gray
        }} />

        <View style={{
          height: Math.round(100 * DimensionManager.heightScale)
        }}>
          <Text style={{
            textAlign: 'center',
            color: Colors.gray,
            fontSize: Math.round(24 * DimensionManager.widthScale),
            alignItems: 'center'
          }} />
          <Image
            style={{width: 340, height: 100}}
            source={Images.graphs} />
        </View>

        <View style={{
          flexDirection: 'row',
          height: Math.round(70 * DimensionManager.heightScale),
        }}>
          <View style={{
            width: Math.round(144 * DimensionManager.widthScale),
          }}>
            <Text style={{
              textAlign: 'center',
              color: Colors.gray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>AVAILABLE</Text>
            <Text style={{
              textAlign: 'center',
              color: Colors.darkGray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>{data.available}</Text>
            <Text style={{
              textAlign: 'center',
              color: Colors.gray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>{data.symbol}</Text>
          </View>
          <View style={{
            width: Math.round(144 * DimensionManager.widthScale),
          }}>
            <Text style={{
              textAlign: 'center',
              color: Colors.gray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>LOCKED COLLATERAL</Text>
            <Text style={{
              textAlign: 'center',
              color: Colors.darkGray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>{data.lockedCollateral}</Text>
            <Text style={{
              textAlign: 'center',
              color: Colors.gray,
              fontSize: Math.round(12 * DimensionManager.widthScale),
              marginTop: Math.round(8 * DimensionManager.heightScale)
            }}>{data.symbol}</Text>
          </View>
        </View>
        <View style={{
          borderBottomWidth: 0.2,
          borderColor: Colors.gray
        }} />

        {this.getNews()}
      </View>
    );
  }

  renderAssets() {
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
          marginBottom: Math.round(2 * DimensionManager.heightScale),
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
          }}>
            {this.getAssets(data)}
          </View>
        </View>
      );
    }, this);
    return results;

  }

  render () {
    PanResponder.create({
      onStartShouldSetPanResponder:  function () {
        return false;
      },
      onStartShouldSetPanResponderCapture: function () {
        return false;
      },
      onMoveShouldSetPanResponder:  function () {
        return false;
      },
      onMoveShouldSetPanResponderCapture: function () {
        return false;
      },
      onPanResponderTerminationRequest: function () {
        return false;
      }
    });

    const xOffset = new Animated.Value(20);
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: -xOffset } } }],
      { useNativeDriver: true }
    );
    let computeHeight = this.state.showNews ? 640 : 440;
    return (
      <View style={[styles.container, {height: computeHeight}]} {...this._panResponder.panHandlers}>
        <Text style={styles.headerText}>{I18n.t('yourAssets')}</Text>
        <Animated.ScrollView
          scrollEnabled={this.state.scrollEnabled}
          overScrollMode={'never'}
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={false}
          directionalLockEnabled={true}
          horizontal={true}
          vertical={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            marginLeft: Math.round(10 * DimensionManager.widthScale),
            height: Math.round(360 * DimensionManager.heightScale)
          }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
            {this.renderAssets()}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
