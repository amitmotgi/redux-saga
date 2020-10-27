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
import ApplicationInReviewView from '../Components/Onboarding/ApplicationInReviewView';
import ApplicationDeclinedView from '../Components/Onboarding/ApplicationDeclinedView';
import ContinueCodeVerifyView from '../Components/Onboarding/ContinueCodeVerifyView';
import AccountCreationSuccessView from '../Components/Onboarding/AccountCreationSuccessView';
import NeedYourIDInfoView from '../Components/Onboarding/NeedYourIDInfoView';

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
import CoinAddressesView from '../Components/Dashboard/CoinAddressesView';
import DashboardAssetsView from '../Components/Dashboard/DashboardAssetsView';
import LoanOriginationSuccessView from '../Components/Dashboard/LoanOriginationSuccessView';
import LoanOriginationAddDebitView from '../Components/Dashboard/LoanOriginationAddDebitView';
import BigSpenderView from '../Components/Dashboard/BigSpenderView';

import OneTimePaymentView from '../Components/Repay/OneTimePaymentView';
import EditPaymentView from '../Components/Repay/EditPaymentView';
import PaymentConfirmationView from '../Components/Repay/PaymentConfirmationView';
import ChooseAccountView from '../Components/Repay/ChooseAccountView';
import RepaySuccessView from '../Components/Repay/RepaySuccessView';

import VaultView from '../Components/Vault/VaultView';

import WalletView from '../Components/Wallet/WalletView';
import WalletAddressView from '../Components/Wallet/WalletAddressView';
import SendCoinsView from '../Components/Wallet/SendCoinsView';

import AddCollateralPageView from '../Components/AddingAssets/AddCollateralPageView';
import ReviewCollateralPageView from '../Components/AddingAssets/ReviewCollateralPageView';
import WithDrawreduxsagaitLine from '../Components/Distribution/WithDrawreduxsagaitLine';
import DistributionAccounts from '../Components/Distribution/DistributionAccounts';
import DistributionStatusView from '../Components/Distribution/DistributionStatusView';

// TODO - remove all the imports from top later
import StartSignUpView from '../Components/Signup/StartSignUpView';
import WithDrawTransferView from '../Components/Onboarding/WithDrawTransferView';

import ScanCardView from '../Components/Onboarding/ScanCardView';
import InputCardInfoView from '../Components/Onboarding/InputCardInfoView';
import CardScanSuccessView from '../Components/Onboarding/CardScanSuccessView';

import DocumentsView from '../Components/Setting/DocumentsView';
import ContactUsView from '../Components/Setting/ContactUsView';
import TermsPoliciesView from '../Components/Setting/TermsPoliciesView';
import TermsConditionsView from '../Components/Setting/TermsConditionsView';
import CloseAccountView from '../Components/Setting/CloseAccountView';
import FaqDetailView from '../Components/Setting/FaqDetailView';
import FaqView from '../Components/Setting/FaqView';
import WithDrawalResponseView from '../Components/Onboarding/WithDrawalResponseView';
import DrawerView from '../Common/DrawerView';

import {
  withNavigation,
  NavigationEvents,
  StackActions,
  NavigationActions,
  createDrawerNavigator
} from 'react-navigation';
import {
  createBottomTabNavigator,
  BottomTabBar,

} from 'react-navigation-tabs';




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
  PersonalInfoResidentVerify: { screen:PersonalInfoResidentVerifyView },
  PersonalInfoWhereDoYouLive: { screen:PersonalInfoWhereDoYouLive },
  PersonalInfoRequireInfo: { screen:PersonalInfoRequireInfo },
  Congratulation: { screen: CongratulationView },
  Wallet: { screen: WalletView },
  WalletAddress: { screen: WalletAddressView },
  ShareView: { screen:ShareView },
  StartSignUp: { screen: StartSignUpView },
  ScanCard: { screen:ScanCardView },
  InputCardInfo: { screen:InputCardInfoView },
  CardScanSuccess: { screen:CardScanSuccessView },
  WithDrawreduxsagaitLine: { screen:WithDrawreduxsagaitLine },
  DistributionAccounts: { screen: DistributionAccounts },
  DistributionStatusView: { screen: DistributionStatusView },
  SendCoins: { screen: SendCoinsView },
  DistributionStatus: { screen: DistributionStatusView },
  ApplicationInReview: { screen: ApplicationInReviewView },
  ApplicationDeclined: { screen: ApplicationDeclinedView },
  ContinueCodeVerify: { screen: ContinueCodeVerifyView },
  AccountCreationSuccess: { screen: AccountCreationSuccessView },
  NeedYourIDInfo: { screen: NeedYourIDInfoView },
  WithDrawalResponse: { screen: WithDrawalResponseView },
  Documents: { screen: DocumentsView },
  Contact: { screen: ContactUsView },
  TermsPolicies: { screen: TermsPoliciesView },
  TermsConditions: { screen: TermsConditionsView },
  CloseAccount: { screen: CloseAccountView },
  FaqDetail: { screen: FaqDetailView },
  Faq: { screen: FaqView },

  // Dashboard
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
  RepaySuccess: { screen: RepaySuccessView },
  PaymentConfirmation: { screen: PaymentConfirmationView },
  CLOCDistribution: { screen: CLOCDistributionView },
  StartCLOC: { screen: StartCLOCView },
  GetYourLoan: { screen: GetYourLoanView },
  LBAStacked: { screen: LBAStackedView },
  LoanConfirmation: { screen: LoanConfirmationView},
  LoanAgreement: { screen: LoanAgreementView },
  CoinAddresses: { screen: CoinAddressesView },
  DashboardAssets: { screen: DashboardAssetsView },
  Vault: { screen: VaultView },
  LoanOriginationSuccess: { screen: LoanOriginationSuccessView },
  LoanOriginationAddDebit: { screen: LoanOriginationAddDebitView },
  BigSpender: { screen: BigSpenderView },
  WithDrawTransfer: { screen: WithDrawTransferView },

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Welcome',
});

// const dashboardScreens = createStackNavigator({
//
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'DashboardAssets',
//   navigationOptions: {
//     headerStyle: styles.header,
//     tabBarVisible: true
//   }
// });

const PrimaryNavigation = createDrawerNavigator({
  Onboarding: {
    screen: onBoardingScreens,
    navigationOptions: ({ navigation }) => {

      let drawerLockMode = 'unlocked';
      // 'unlocked', 'locked-closed', 'locked-open'
      // https://facebook.github.io/react-native/docs/drawerlayoutandroid.html#drawerlockmode
      if (navigation.state.index === 0) {
        drawerLockMode = 'locked-closed';
      }
      return {drawerLockMode};
    },
  },
  // Dashboard: {
  //   screen: dashboardScreens,
  //   headerMode: 'none',
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       tabBarVisible: true,
  //       showLabel: false,
  //       tabBarLabel: '',
  //       activeTintColor: Colors.reduxsagaDarkBlue,
  //       inactiveTintColor: Colors.reduxsagaGray,
  //     };
  //   }
  // }
}, {
    initialRouteName: 'Onboarding',
    contentComponent: DrawerView,
    drawerWidth: DimensionManager.scale(335),
    drawerBackgroundColor: '#002178',
    order: ['Onboarding'],
    drawerPosition: 'left'
  // tabBarComponent: TabBarView,
  // allowFontScaling: true,
  // lazy: true,
  // showLabel: false,
  // showIcon: false,
  // activeTintColor: Colors.reduxsagaDarkBlue,
  // activeBackgroundColor: Colors.reduxsagaFooter,
  // inactiveTintColor: Colors.reduxsagaGray,
  // inactiveBackgroundColor: Colors.reduxsagaFooter,
  // labelStyle: {
  //   fontSize: DimensionManager.scale(12)
  // },
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
