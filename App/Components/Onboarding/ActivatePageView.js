import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import TouchID from 'react-native-touch-id';
import ActivateTouchIDView from './ActivateTouchIDView';
import ActivateFaceIDView from './ActivateFaceIDView';
import LoginView from './LoginView';
import { scale, verticalScale } from '../../Themes/DimensionManager';
import Colors from '../../Themes/Colors';

class ActivatePageView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: ''
    };
  }

  componentDidMount() {
    this.getIDType();
  }

  getIDType = () => {
    const { replace } = this.props.navigation;
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          this.setState({
            type: biometryType
          });
        } else {
          this.setState({
            type: 'TouchID'
          });
        }
      })
      .catch(error => {
        console.warn('TOUCHIDERROR', error);
        // if (error&&error.name === 'RCTTouchIDNotSupported') {
        //   // then we do not show any touchID enabling setting
        // }
        this.setState({
          type: 'error'
        });
        // replace({routeName:"Login"})
      });
  }

  checkTouchIdOrFaceID = () => {
    const { type } = this.state;

    return (
      <View style={styles.container}>

        {type === 'TouchID' ? (
          <ActivateTouchIDView />
        ) : type === 'FaceID' ? (
          <ActivateFaceIDView />
        ) : type === 'error' ? (
          <LoginView />
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.safeAreaTop} />
        {this.checkTouchIdOrFaceID()}
        <View style={styles.safeAreaBottom} />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  safeAreaBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    height: verticalScale(44),
    backgroundColor: Colors.transparent
  }
});
export default ActivatePageView;
