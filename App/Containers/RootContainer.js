import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';

// Styles
import styles from './Styles/RootContainerStyles';
import { FormattedProvider } from 'react-native-globalize';

class RootContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <FormattedProvider locale={'en'}>
          <StatusBar
            barStyle={'light-content'}
            setBarStyle={{
              backgroundColor: Colors.reduxsagaGreen
            }} />
          <ReduxNavigation />
        </FormattedProvider>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
