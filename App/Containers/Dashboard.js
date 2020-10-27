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
import { Images, DimensionManager, Colors } from '../Themes';
import HeaderView from '../Common/HeaderView';
import TabBarView from '../Common/TabBarView';
import styles from './Styles/DashboardStyles';
import PortfolioView from '../Components/Dashboard/PortfolioView';
import AssetsView from '../Components/Dashboard/AssetsView';
import LoansView from '../Components/Dashboard/LoansView';
import * as Analytics from '../Analytics';
import OnboardingActions, { OnboardingSelectors } from '../Redux/Onboarding';
import CLOCView from '../Components/Dashboard/CLOCView';
import DashboardAssetsView from '../Components/Dashboard/DashboardAssetsView';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { onboarding, navigation } = this.props;
    const { spinner, email } = onboarding;

    Analytics.trackEvent('Loan: View');
    return (
      <View>
        <DashboardAssetsView />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
