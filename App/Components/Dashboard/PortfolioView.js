import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated
 } from 'react-native';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import styles from './Styles/Portfolio';
import I18n from '../../I18n';
import { EventRegister } from 'react-native-event-listeners';

export default class PortfolioView extends Component {

  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      LayoutAnimation.easeInEaseOut();
    }
    this._mounted = true;
    /* TODO fix this dirty hack */
    EventRegister.addEventListener('languageLoaded', () => {
      this.setState({newLang: null});
    });
  }

  componentWillUnMount(){
    this._mounted = false;
  }

  renderPortfolios() {
    var dataSet = ['426,210', '44,289', '100,389', '628,333'];
    var results = [];

    dataSet.forEach((data) => {
      results.push(
        <View style={{
          width: Math.round(320 * DimensionManager.widthScale),
          marginBottom: Math.round(2 * DimensionManager.heightScale),
          marginRight: Math.round(4 * DimensionManager.widthScale),
          marginLeft: Math.round(4 * DimensionManager.widthScale),
          justifyContent: 'center',
          alignItems: 'center'
        }} key={data}>
          <Text style={[{
            fontSize: Math.round(36 * DimensionManager.heightScale),
            textAlign: 'center'
          }, styles.portfolioValue]}>${data}</Text>
        </View>
      );
    }, this);
    return results;
  }

  renderDetails() {
    return (
      <View style={{
        flex: 1,
      }}>
        <Text style={{
          textAlign: 'center',
          color: Colors.gray,
          marginTop: Math.round(-20 * DimensionManager.heightScale)
        }}>Details{' >'}</Text>
      </View>
    );
  }

  render () {
    const xOffset = new Animated.Value(20);
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: -xOffset } } }],
      { useNativeDriver: true }
    );

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{I18n.t('totalPortFolioValue')}</Text>
        <Animated.ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Math.round(50 * DimensionManager.heightScale),
            contentInset: {top: 0, left: 0, bottom: 0, right: 0}
          }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'center',
          }}>
            {this.renderPortfolios()}
          </View>
        </Animated.ScrollView>
        {this.renderDetails()}
      </View>
    );
  }
}
