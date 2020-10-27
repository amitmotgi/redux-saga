import { createStackNavigator } from 'react-navigation-stack';
import { Fonts, Images, Colors, DimensionManager } from '../Themes';

import Welcome from '../Containers/Welcome';
import Onboarding from '../Containers/Onboarding';
import Dashboard from '../Containers/Dashboard';
import SignupView from '../Components/Onboarding/SignupView';
import LoginView from '../Components/Onboarding/LoginView';
import ResetPasswordEmailView from '../Components/Onboarding/ResetPasswordEmailView';
import ResetPasswordView from '../Components/Onboarding/ResetPasswordView';
import ResetPasswordSuccessView from '../Components/Onboarding/ResetPasswordSuccessView';
import ConfirmEmailView from '../Components/Onboarding/ConfirmEmailView';
import ConfirmContactInfoView from '../Components/Onboarding/ConfirmContactInfoView';
import CameraCaptureView from '../Components/Onboarding/CameraCaptureView';
import CameraCaptureBackView from '../Components/Onboarding/CameraCaptureBackView';
import CameraCaptureVerifyView from '../Components/Onboarding/CameraCaptureVerifyView';
import ConfirmAddressView from '../Components/Onboarding/ConfirmAddressView';
import ReviewIdentityView from '../Components/Onboarding/ReviewIdentityView';
import SSNView from '../Components/Onboarding/SSNView';
import VerifyIdentityView from '../Components/Onboarding/VerifyIdentityView';
import VerifyIdentityResultsView from '../Components/Onboarding/VerifyIdentityResultsView';
import VerifyCameraIdentityView from '../Components/Onboarding/VerifyCameraIdentityView';

import Loans from '../Containers/Loans';
import styles from './Styles/NavigationStyles';
import ActivateFaceIDView from '../Components/Onboarding/ActivateFaceIDView';
import ActivateTouchIDView from '../Components/Onboarding/ActivateTouchIDView';
import ActivatePageView from '../Components/Onboarding/ActivatePageView';
import CodeVerifyView from '../Components/Onboarding/CodeVerifyView';

import OpenCLOCView from '../Components/Dashboard/OpenCLOCView';
import NewCLOCView from '../Components/Dashboard/NewCLOCView';
import AddCollateralView from '../Components/Dashboard/AddCollateralView';
import ReviewCollateralView from '../Components/Dashboard/ReviewCollateralView';
import ConfirmCollateralView from '../Components/Dashboard/ConfirmCollateralView';
import CLOCConfirmView from '../Components/Dashboard/CLOCConfirmView';
import CLOCDistributionView from '../Components/Dashboard/CLOCDistributionView';
import StartCLOCView from '../Components/Dashboard/StartCLOCView';
import GetYourLoanView from '../Components/Dashboard/GetYourLoanView';
import PersonalInfoResidentVerifyView from '../Components/Onboarding/PersonalInfoResidentVerifyView';
import PersonalInfoWhereDoYouLive from '../Components/Onboarding/PersonalInfoWhereDoYouLive';
import PersonalInfoRequireInfo from '../Components/Onboarding/PersonalInfoRequireInfo';
import CongratulationView from '../Components/Onboarding/CongratulationView';
import ShareView from '../Components/Onboarding/ShareView';
import LBAStackedView from '../Components/Dashboard/LBAStackedView';
import LoanConfirmationView from '../Components/Dashboard/LoanConfirmationView';
import LoanAgreementView from '../Components/Dashboard/LoanAgreementView';


import OneTimePaymentView from '../Components/Repay/OneTimePaymentView';
import EditPaymentView from '../Components/Repay/EditPaymentView';
import PaymentConfirmationView from '../Components/Repay/PaymentConfirmationView';
import ChooseAccountView from '../Components/Repay/ChooseAccountView';


// TODO - remove all the imports from top later
import StartSignUpView from '../Components/Signup/StartSignUpView';

import ScanCardView from '../Components/Onboarding/ScanCardView';
import InputCardInfoView from '../Components/Onboarding/InputCardInfoView';
import CardScanSuccessView from '../Components/Onboarding/CardScanSuccessView';

import TabBarView from '../Common/TabBarView';
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
import AddCollateralPageView from '../Components/AddingAssets/AddCollateralPageView';
import ReviewCollateralPageView from '../Components/AddingAssets/ReviewCollateralPageView';



// Manifest of possible screens
const onBoardingScreens = createStackNavigator({
  Dashboard: { screen: Dashboard },
  Welcome: {screen: Welcome},
  Signup: {screen: SignupView},
  Login: {screen: LoginView},
  ResetPasswordEmail: {screen: ResetPasswordEmailView},
  ResetPassword: {screen: ResetPasswordView},
  ResetPasswordSuccess: {screen: ResetPasswordSuccessView},
  ConfirmEmail: {screen: ConfirmEmailView},
  ConfirmContactInfo: {screen: ConfirmContactInfoView},
  CameraCapture: {screen: CameraCaptureView},
  CameraCaptureBack: {screen: CameraCaptureBackView},
  CameraCaptureVerify: {screen: CameraCaptureVerifyView},
  ConfirmAddress: {screen: ConfirmAddressView},
  ReviewIdentity: {screen: ReviewIdentityView},
  VerifyIdentityResults: {screen: VerifyIdentityResultsView},
  VerifyCameraIdentity: {screen: VerifyCameraIdentityView},
  SSN: {screen: SSNView},
  CodeVerify: {screen: CodeVerifyView},
  VerifyIdentity: {screen: VerifyIdentityView},
  Onboarding: {screen: Onboarding },
  ActivatePage: { screen: ActivatePageView },
  ActivateFaceID: { screen: ActivateFaceIDView },
  ActivateTouchID: { screen: ActivateTouchIDView },
  PersonalInfoResidentVerifyView:{screen:PersonalInfoResidentVerifyView},
  PersonalInfoWhereDoYouLive:{screen:PersonalInfoWhereDoYouLive},
  PersonalInfoRequireInfo:{screen:PersonalInfoRequireInfo},
  CongratulationView:{screen:CongratulationView},
  ShareView:{screen:ShareView},

  StartSignUp: { screen: StartSignUpView},

  ScanCard:{screen:ScanCardView},
  InputCardInfo:{screen:InputCardInfoView},
  CardScanSuccess:{screen:CardScanSuccessView},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Welcome',
});

const dashboardScreens = createStackNavigator({
  Dashboard: { screen: Dashboard },
  ReviewCollateral: {screen: ReviewCollateralPageView},
  AddCollateral: {screen: AddCollateralPageView},
  NewCLOC: {screen: NewCLOCView},
  OpenCLOC: {screen: OpenCLOCView},
  ConfirmCollateral: {screen: ConfirmCollateralView},
  CLOCConfirmed: {screen: CLOCConfirmView},
  Loans: { screen: Loans },
  EditPayment: { screen: EditPaymentView },
  ChooseAccount: { screen: ChooseAccountView },
  OneTimePayment: { screen: OneTimePaymentView },
  PaymentConfirmation: { screen: PaymentConfirmationView },
  CLOCDistribution: { screen: CLOCDistributionView },
  StartCLOC: { screen: StartCLOCView },
  GetYourLoan: { screen: GetYourLoanView },
  LBAStacked: { screen: LBAStackedView },
  LoanConfirmation: { screen: LoanConfirmationView},
  LoanAgreement: { screen: LoanAgreementView }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Dashboard',
  navigationOptions: {
    headerStyle: styles.header,
    tabBarVisible: true
  }
});

const walletScreens = createStackNavigator({
  CLOCDistribution: { screen: CLOCDistributionView },
  }, {
    // Default config for all screens
    headerMode: 'none',
});

const transferScreens = createStackNavigator({
  CLOCDistribution: { screen: CLOCDistributionView }
}, {
  // Default config for all screens
  headerMode: 'none',
});

const settingsScreens = createStackNavigator({
  CLOCDistribution: { screen: CLOCDistributionView }
}, {
  // Default config for all screens
  headerMode: 'none',
});

const PrimaryNavigation = createBottomTabNavigator({
  Onboarding: {
    screen: onBoardingScreens,
    navigationOptions: ({ navigation }) => {
      if (navigation.state.routes[0].routeName === 'Dashboard') {
        return {
          tabBarVisible: true,
          showLabel: false,
          tabBarLabel: '',
        };
      } else {
        return {
          tabBarVisible: false,
          showLabel: false,
          tabBarLabel: ''
        };
      }
    },
  },
  Dashboard: {
    screen: dashboardScreens,
    headerMode: 'none',
    navigationOptions: ({ navigation }) => {
      return {
        tabBarVisible: true,
        showLabel: false,
        tabBarLabel: '',
        activeTintColor: Colors.reduxsagaDarkBlue,
        inactiveTintColor: Colors.reduxsagaGray,
      };
    }
  },
  Wallets: {
    screen: walletScreens,
  },
  Transfer: {
    screen: transferScreens,
  },
  Settings: {
    screen: settingsScreens,
  },
}, {
  //order: ['Onboarding', 'Dashboard', 'Wallets', 'Transfer', 'Settings'],
  tabBarComponent: TabBarView,
  allowFontScaling: true,
  lazy: true,
  showLabel: false,
  showIcon: false,
  activeTintColor: Colors.reduxsagaDarkBlue,
  activeBackgroundColor: Colors.reduxsagaFooter,
  inactiveTintColor: Colors.reduxsagaGray,
  inactiveBackgroundColor: Colors.reduxsagaFooter,
  labelStyle: {
    fontSize: DimensionManager.scale(12)
  },
});

export default PrimaryNavigation;

// TODO: remove the below commented code for reference later
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
// });
// navigation.dispatch(resetAction);

// return NavigationActions.reset(
//   {
//     index: 0,
//     actions: [
//       NavigationActions.navigate({ routeName: 'Welcome'})
//     ]
//   }
// );
