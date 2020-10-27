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
import styles from './Styles/DashboardStyles';
import * as Analytics from '../Analytics';
import WelcomeView from '../Components/Onboarding/WelcomeView';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { onboarding } = this.props;
    const { spinner, email } = onboarding;

    Analytics.trackEvent('Signup: View');
    return (
      <View style={styles.mainContainer}>
        <WelcomeView />
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
