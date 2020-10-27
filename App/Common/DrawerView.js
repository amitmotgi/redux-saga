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
  StyleSheet,
  ScrollView
} from 'react-native';
import {Fonts, Images, Colors, DimensionManager } from '../Themes';
import {
  withNavigation,
  NavigationEvents,
  StackActions,
  NavigationActions,
  DrawerActions
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
import OnboardingActions from '../Redux/Onboarding';
import UserActions from '../Redux/User';
import DeviceInfo from 'react-native-device-info';
import {
  ResetUserreduxsagaentials,
  SetUserreduxsagaentials
} from './Helper/reduxsagaentials';

class DrawerView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      wallets: false,
      transfer: false,
      settings: false,
      account: false
    };
  }

  componentDidMount() {
    this.state = {
      dashboard: true,
      wallets: false,
      transfer: false,
      settings: false,
      account: false
    };
  }

  renderLoginName(name, marginTop) {
    var firstName = this.props.user.firstName || '';

    firstName = firstName && firstName.split(" ")[0] || '';

    return (
      <View style={{
        flexDirection: 'column',
        marginTop: marginTop
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(16),
          color: Colors.transparent,
          letterSpacing: DimensionManager.scale(0.14),
          marginBottom: 2
        }}>
          Hi {firstName}!
        </Text>
      </View>
    );
  }

  renderDrawerTitle(name, marginTop) {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: marginTop
      }}>
        <Text style={{
          ...styles.transferText,
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: DimensionManager.scale(14),
          color: '#4673df',
        }}>
          {name}
        </Text>
        {this.renderUnderline()}
      </View>
    );
  }

  renderItemAccount(name, color) {
    const {account} = this.state;
    return (
      <View
        style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(17)
      }}>
        <TouchableOpacity
          onPress={() => {
            this.setState(preState => ({
              account : !preState.account
            }));
          }}
          style={{
            flexDirection: 'row'
          }}>
          <View style={{
            width: '70%'
          }}>
            <Text style={{
              ...styles.transferText,
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: DimensionManager.scale(18),
              color: color,
              textAlign: 'left'
            }}>
              {name}
            </Text>
          </View>
          {}
          <Image style={{
            resizeMode: 'contain',
            alignSelf: 'center',
            transform: [{ rotate: account ? '270deg' : '90deg'}],
            marginLeft: DimensionManager.scale(80),
          }}
            source={account ? require('./Images/blue-arrow.png') : require('./Images/blue-arrow.png')} />

        </TouchableOpacity>
        {this.renderDrawerItemChild('Profile', '', '#b5d1ff', account)}
        {this.renderDrawerItemChild('Notifications', '', '#b5d1ff', account)}
        {this.renderDrawerItemChild('Documents', 'Documents', '#b5d1ff', account)}
        {this.renderDrawerItemChild('Autopayment', '', '#b5d1ff', account)}
        {this.renderUnderline()}
      </View>
    );
  }

  renderDrawerItemChild(name, screen, color, account) {
    if (account) {
      return (
        <View style={{
          flexDirection: 'column',
          marginTop: DimensionManager.verticalScale(29)
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(screen);
            }}
            style={{
              flexDirection: 'row'
            }}>
            <View style={{
              width: '70%'
            }}>
              <Text style={{
                ...styles.transferText,
                fontWeight: '300',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(16),
                color: color,
                textAlign: 'left',
                letterSpacing: 0.3
              }}>
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderDrawerItem(name, screen, color) {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(17)
      }}>
        <TouchableOpacity
          onPress={() => {
            const { navigation } = this.props;
            const { dispatch } = navigation;

            if (name === 'Sign out') {
              // Clear the jToken and isLoggedIn
              dispatch(OnboardingActions.onboardingUpdate({
                jToken: ''
              }));
              dispatch(UserActions.authenticateUser({
                jToken: '',
                isLoggedIn: false
              }));

              SetUserreduxsagaentials({
                username: '',
                password: ''
              })
              ResetUserreduxsagaentials(dispatch);
            }

            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({
                routeName: screen,
                params: {
                  context: 'BURGER'
                }
              })],
            });
            this.props.navigation.dispatch(resetAction)

          }}
          style={{
            flexDirection: 'row'
          }}>
          <View style={{
            width: '70%'
          }}>
          <Text style={{
            ...styles.transferText,
            fontWeight: '500',
            fontStyle: 'normal',
            fontSize: DimensionManager.scale(18),
            color: color,
            textAlign: 'left'
          }}>
            {name}
          </Text>
          </View>
          <Image style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              marginLeft: DimensionManager.scale(80),
            }}
            source={require('./Images/blue-arrow.png')} />

        </TouchableOpacity>
        {this.renderUnderline()}
      </View>
    );
  }

  renderUnderline() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: '#d6dbe6',
        borderBottomColor: Colors.reduxsagaDarkBlue,
        marginTop: DimensionManager.verticalScale(17)
      }} />
    )
  }

  render () {
    const { navigation } = this.props;
    const { state } = navigation;
    const currentRouteKey = state.routes[state.index].key;
    const focussed = state.index;

    return (
      <SafeAreaView styles={styles.wrapper}>
      <View style={styles.safeArea} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={true}
          style={{
            flexDirection: 'column',
            marginLeft: DimensionManager.scale(25),
            marginRight: DimensionManager.scale(20)
          }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.dispatch(DrawerActions.closeDrawer())
          }}>
          <Image style={{
              marginTop: DimensionManager.verticalScale(12),
              marginBottom: DimensionManager.verticalScale(12),
              marginRight: DimensionManager.scale(20),
              resizeMode: 'contain',
              width: DimensionManager.scale(23),
              height: DimensionManager.verticalScale(22),
              alignSelf: 'flex-end'
            }}
            source={require('./Images/x-close-modal.png')} />
          </TouchableOpacity>

          {/*this.renderLoginName()*/}

          {this.renderDrawerTitle('SECTIONS', 22)}
          {this.renderDrawerItem('Dashboard', 'DashboardAssets', '#ffab00')}
          {this.renderDrawerItem('Wallets', 'Wallet', '#ffab00')}
          {this.renderDrawerItem('Vault', 'Vault', '#ffab00')}

          {this.renderDrawerTitle('ACTIONS', 52)}
          {this.renderDrawerItem('Withdraw cash', 'WithDrawTransfer', '#0dc9ba')}
          {this.renderDrawerItem('Transfer crypto', 'Wallet', '#0dc9ba')}
          {this.renderDrawerItem('Make a payment', 'OneTimePayment', '#0dc9ba')}
          {this.renderDrawerItem('Setup & edit debit card', 'ScanCard', '#0dc9ba')}

          {this.renderDrawerTitle('SETTINGS', 52)}
          {this.renderItemAccount('Account', '#9fbafb')}
          {this.renderDrawerItem('FAQ', 'DashboardAssets', '#9fbafb')}
          {this.renderDrawerItem('Contact us', 'DashboardAssets', '#9fbafb')}
          {this.renderDrawerItem('Terms & policies', 'DashboardAssets', '#9fbafb')}
          {this.renderDrawerItem('Close reduxsaga account', 'DashboardAssets', '#9fbafb')}
          {this.renderDrawerItem('Sign out', 'Welcome', '#9fbafb')}

          <View style={{
            flexDirection: 'column'
          }}>
            <Text style={{
              ...styles.titleStyle,
              fontSize: DimensionManager.scale(12),
              fontWeight: '200',
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(20),
              opacity: 0.5
            }}>
              V{DeviceInfo.getVersion()}-{DeviceInfo.getBuildNumber()}
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#002178',
    width: DimensionManager.scale(335)
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaExtraDarkGray
  },
  passwordRight: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: '#002178'
  },
  safeAreaBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    width: '100%',

    // position: 'absolute',
    // bottom: 0,
    // //right: 0,
    // left: 0,
    // height: DimensionManager.verticalScale(44),
    // backgroundColor: 'red'
  },
  showErrorLabel: {
    color: Colors.reduxsagaCoralRed,
    opacity: 1
  },
  titleStyle: {
    ...Fonts.style.textRegularNormalGT,
    fontSize: DimensionManager.scale(32),
    color: '#9fbafb',
    fontWeight: '500',
    lineHeight: DimensionManager.verticalScale(36),
    letterSpacing: DimensionManager.scale(0.14),
    textAlign: 'center',
    marginTop: DimensionManager.verticalScale(-22)
  },
});


const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DrawerView));
