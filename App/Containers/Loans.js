import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import HeaderView from '../Common/HeaderView';
import styles from './Styles/DashboardStyles';
import LoansConfiguratorView from '../Components/Loans/LoansConfiguratorView';
import * as Analytics from '../Analytics';

export default class Dashboard extends Component {
  render () {
    Analytics.trackEvent('Dashboard: View');
    return (
      <View style={styles.mainContainer}>
        <HeaderView />
          <ScrollView
            scrollEnabled={false}
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <LoansConfiguratorView />
          </ScrollView>
      </View>
    );
  }
}
