import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Images } from '../Themes';
import HeaderView from '../Common/HeaderView';
import TabBarOnboardingView from '../Common/TabBarOnboardingView';
import styles from './Styles/DashboardStyles';
import PortfolioView from '../Components/Dashboard/PortfolioView';
import AssetsView from '../Components/Dashboard/AssetsView';
import LoansView from '../Components/Dashboard/LoansView';
import * as Analytics from '../Analytics';
import OnboardingActions, { OnboardingSelectors } from '../Redux/Onboarding';
import SignupView from '../Components/Onboarding/SignupView';

class Onboarding extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { onboarding } = this.props;
    const { spinner, email } = onboarding;

    Analytics.trackEvent('Signup: View');
    return (
      <View style={styles.mainContainer}>
        <HeaderView />
          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SignupView />
          </ScrollView>
        <TabBarOnboardingView />
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
