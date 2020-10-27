import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert,Image,StyleSheet } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { withNavigation } from 'react-navigation';
import { KeyChainService } from '../../Config/KeyChainConfig';
import { loginNavigateTo, TouchIDAuthenticate } from '../../Utils/TouchIDUtils';
import { scale, verticalScale } from '../../Themes/DimensionManager';

class LoginWithTouchID extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    Keychain.getGenericPassword({
      service: KeyChainService.login
    }).then(reduxsagaentials => {
        //console.log('>>>>>>>> reduxsagaentials', reduxsagaentials);
        if (!reduxsagaentials) {
          Alert.alert('GetGenericPassword Failed，Please activate TouchID or FaceID');
          return;
        }
        const { username, password } = reduxsagaentials;
        TouchIDAuthenticate({
          tips:`to login with username "${username}"`,
        }).then(resp=>{
          // TODO If Touch ID authentication is successful, call the `login` api
          //  login({username, password,})
          //   .then(() => {
          //     // Handle login success
          //   })
          // Alert.alert('Authenticated Successfully');
          navigate(loginNavigateTo);
        }).catch(error => {
          // console.log('err',error);
          Alert.alert('Authenticated failed,try again');
        });
      })
      .catch(error=>{
        // console.log('error',error);
        Alert.alert('GetGenericPassword Failed(error)');
      });
  }

  loginWithIDShowPage() {
    return (
      <TouchableOpacity
        onPress={() => this.handlePress()}
      >
        <Image source={require('../Images/login-face-id.png')} style={styles.images}/>
      </TouchableOpacity>
    );
  }
  render() {
    return <View>{this.loginWithIDShowPage()}</View>;
  }
}

const styles = StyleSheet.create({
  images:{
    width:scale(20),
    height:verticalScale(20),
    resizeMode: 'contain'
  }
});

export default withNavigation(LoginWithTouchID);
