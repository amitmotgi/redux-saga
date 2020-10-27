import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from 'react-native';
import {Fonts, Images, Colors, DimensionManager } from '../Themes';
import {
  withNavigation,
  NavigationEvents,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import {
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation-tabs';
import {
  createStackNavigator
} from 'react-navigation-stack';
import CLOCConfirmView from '../Components/Dashboard/CLOCConfirmView';
import OpenCLOCView from '../Components/Dashboard/OpenCLOCView';
import CLOCView from '../Components/Dashboard/CLOCView';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TabBarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      wallets: false,
      transfer: false,
      settings: false
    }
  }

  render () {
    const { navigation } = this.props;
    const { state } = navigation;
    const currentRouteKey = state.routes[state.index].key;
    const focussed = state.index;

    const TabImage = {
      dashboardImg: focussed === 1 ?
        require('./Images/dash-on.png') : require('./Images/dash-off.png'),
      walletImg: focussed === 2 ?
        require('./Images/wallet-on.png') : require('./Images/wallet-off.png'),
      transferImg: focussed === 3 ?
        require('./Images/transfer-on.png') : require('./Images/transfer-off.png'),
      settingsImg: focussed === 4 ?
        require('./Images/settings-on.png') : require('./Images/settings-off.png')
    };

    return (
      <SafeAreaView style={{
        flexDirection: 'row',
        height: DimensionManager.verticalScale(83),
      }}>
        <ImageBackground
          source={'./Images/bottomTab.png'}
          style={{
            width: '100%',
            height: DimensionManager.verticalScale(83)
        }}>

          <View style={{
            flexDirection: 'row',
            marginTop: DimensionManager.verticalScale(23),
            marginBottom: DimensionManager.verticalScale(36)
          }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: DimensionManager.scale(13),
              marginRight: DimensionManager.scale(13),
            }}>
              <TouchableOpacity
                style={{
                  alignItems:'center',
                }}
                onPress={() => {
                  this.setState({
                    dashboard: true,
                    wallets: false,
                    transfer: false,
                    settings: false
                  });
                  navigation.dispatch(NavigationActions.navigate({
                    routeName: 'Dashboard',
                    params: {
                      routeName: 'Dashboard'
                    },
                    action: NavigationActions.navigate({ routeName: 'Dashboard' }),
                  }));
                }}>
                <Image
                  style={{
                    width: DimensionManager.scale(17),
                    height: DimensionManager.scale(17),
                    resizeMode: 'contain'
                  }}
                  source={TabImage.dashboardImg} />
                <Text style={[Fonts.style.textMediumGT, {
                  color: focussed === 1 ? Colors.reduxsagaDarkBlue : Colors.reduxsagaBlack,
                  marginTop: DimensionManager.verticalScale(5)
                }]}>
                Dashboard
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <TouchableOpacity
                style={{
                  alignItems:'center'
                }}
                onPress={() => {
                  navigation.dispatch(NavigationActions.navigate({
                    routeName: 'Wallets',
                    params: {},
                    action: NavigationActions.navigate({ routeName: 'Wallets' }),
                  }));

                }}>
                <Image
                  style={{
                    width: DimensionManager.scale(22.6),
                    height: DimensionManager.verticalScale(15.4),
                    resizeMode: 'contain'
                  }}
                  source={TabImage.walletImg} />

                <Text style={[Fonts.style.textMediumGT, {
                  color: focussed === 2 ? Colors.reduxsagaDarkBlue : Colors.reduxsagaBlack,
                  marginTop: DimensionManager.verticalScale(5)
                }]}>
                  Wallets
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <TouchableOpacity
                style={{
                  alignItems:'center'
                }}
                onPress={() => {
                  this.setState({
                    dashboard: false,
                    wallets: false,
                    transfer: true,
                    settings: false
                  });
                  navigation.dispatch(NavigationActions.navigate({
                    routeName: 'Transfer',
                    params: {},
                    action: NavigationActions.navigate({ routeName: 'Transfer' }),
                  }));
                }}>
                <Image
                  style={{
                    width: DimensionManager.scale(25.3),
                    height: DimensionManager.verticalScale(16.3),
                    resizeMode: 'contain'
                  }}
                  source={TabImage.transferImg} />

                <Text style={[Fonts.style.textMediumGT, {
                  color: focussed === 3 ? Colors.reduxsagaDarkBlue : Colors.reduxsagaBlack,
                  marginTop: DimensionManager.verticalScale(5)
                }]}>
                  Transfer
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center'
            }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    dashboard: false,
                    wallets: false,
                    transfer: false,
                    settings: true
                  });
                  navigation.dispatch(NavigationActions.navigate({
                    routeName: 'Settings',
                    params: {},
                    action: NavigationActions.navigate({ routeName: 'Settings' }),
                  }));
                }}>
                <Image
                  style={{
                    width: DimensionManager.scale(25.3),
                    height: DimensionManager.verticalScale(16.3),
                    resizeMode: 'contain'
                  }}
                  source={TabImage.settingsImg} />

                <Text style={[Fonts.style.textMediumGT, {
                  color: focussed === 4 ? Colors.reduxsagaDarkBlue : Colors.reduxsagaBlack,
                  marginTop: DimensionManager.verticalScale(5)
                }]}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>

          </View>


        </ImageBackground>


      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TabBarView));
