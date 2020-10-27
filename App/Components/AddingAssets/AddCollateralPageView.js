import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Colors from '../../Themes/Colors';
import I18n from '../../I18n';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Fonts from '../../Themes/Fonts';
import CollateralCardView from './CollateralCardView';
import ReceiveCoinStatusModal from './ReceiveCoinStatusModal';
import CurrencyFormatView from '../../Common/CurrencyFormatView';

class AddCollateralPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletData: [
        {
          collateralName: 'BTC',
          collateralUrl: require('../Images/wallet.png'),
          availableDollar: 1200066,
          walletDollar: 150001.3456,
          collateralValue: 15.234,
          minSliderCount: 1110,
          maxSliderCount: 150000,
          sliderValue: 100000
        },
        {
          collateralName: 'ETH',
          collateralUrl: require('../Images/wallet.png')
        }
      ],
      receiveModalData: {
        currencyName: '',
        currencyUrl: require('../Images/wallet.png'),
        currencyAmountDollar: 0,
        currencyAmount: 0,
        receiveModalVisible: true, //false
        receiveCoinStatus: 'receiving'
      }
    };
  }

  collateralPage = () => {
    return (
      <View style={styles.collateralPage}>
        <View>
          <Text style={styles.collateralHeadText}>COLLATERAL</Text>
        </View>
        <View style={styles.collateralContentView}>
          <CurrencyFormatView
            currencyValue={200000.111}
          />
          {/*<Text style={[styles.collateralContentText, styles.collateralContentTextInt]}>*/}
            {/*$200,000*/}
          {/*</Text>*/}
          {/*<View style={styles.collateralContentPrecisionView}>*/}
            {/*<Text style={[styles.collateralContentText, styles.collateralContentTextPrecision]}>*/}
              {/*.00*/}
            {/*</Text>*/}
          {/*</View>*/}
        </View>
        <View style={styles.collateralFooterView}>
          <Text style={styles.collateralFooterTitle}>Line of reduxsagait:</Text>
          <CurrencyFormatView
            currencyValue={80000}
            currencyStyle={{
              currencyContentText: { fontSize: Fonts.size.medium },
              currencyContentFullText: { textDecorationLine: 'underline' }
            }}
            type={'full'}
          />
          {/*<View style={styles.collateralFooterContentView}>*/}
            {/*<Text style={styles.collateralFooterContent}>$</Text>*/}
            {/*<Text style={[styles.collateralFooterContent, styles.collateralFooterContentExtra]}>*/}
              {/*80,000.00*/}
            {/*</Text>*/}
          {/*</View>*/}
        </View>
      </View>
    );
  }
  notificationPage = () => {
    return (
      <View style={styles.notificationPage}>
        <View style={styles.notificationPageContent}>
          <Image
            source={require('../Images/check-mark-copy.png')}
            style={styles.notificationPageHeadMark}
          />
          <Text style={styles.notificationPageNoteText}>
            Please add asstes or change C-LOC amount
          </Text>
        </View>
      </View>
    );
  }
  distributeCollateralCard = () => {
    const { walletData } = this.state;
    return (
      <View style={styles.distributeCollateralPageCard}>
        {walletData.map(data => {
          return (
            <View key={data.collateralName} style={styles.distributeCollateralPageSingleCard}>
              <CollateralCardView {...data} />
            </View>
          );
        })}
      </View>
    );
  }
  distributeCollateralPage = () => {
    const {navigation} = this.props;
    return (
      <View style={styles.distributeCollateralPage}>
        <ScrollView>
          <View style={styles.distributeCollateralPageContent}>
            <Text style={styles.distributeCollateralPageTitle}>
              How do you want to distribute your collateral?
            </Text>
            {this.distributeCollateralCard()}
            <TouchableOpacity
              style={styles.distributeCollateralButton}
              onPress={() => navigation.navigate('ReviewCollateral')}
            >
              <Text style={styles.distributeCollateralButtonText}>Confirm Collateral</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  receiveModalOnCancel = () => {
    this.setState(preState => ({
      receiveModalData: { ...preState.receiveModalData, receiveModalVisible: false }
    }));
  }

  receiveModal = () => {
    const {
      receiveModalData: {
        receiveModalVisible,
        receiveCoinStatus,
        currencyName,
        currencyUrl,
        currencyAmountDollar,
        currencyAmount
      }
    } = this.state;
    return (
      <ReceiveCoinStatusModal
        currencyName={currencyName}
        currencyUrl={currencyUrl}
        currencyAmountDollar={currencyAmountDollar}
        currencyAmount={currencyAmount}
        onCancel={this.receiveModalOnCancel}
        isVisible={receiveModalVisible}
        receiveCoinStatus={receiveCoinStatus}
      />
    );
  }

  render() {
    /* TODO use CurrencyFormatView*/
    return (
      <SafeAreaView style={styles.addingCollateralSafeAreaView}>
        <View style={styles.addingCollateralView}>
          <HeaderBarOnboardingView
            hideNextBtn={true}
            hideStep={true}
            title={I18n.t('addCollateral')}
          />
          {this.collateralPage()}
          {this.notificationPage()}
          {this.distributeCollateralPage()}
          {this.receiveModal()}
        </View>
      </SafeAreaView>
    );
  }
}

const paddingLeft = 20;
const styles = StyleSheet.create({
  addingCollateralSafeAreaView: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  addingCollateralView: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  collateralPage: {
    height: verticalScale(173),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  collateralHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent
  },
  collateralContentView: {
    // flexDirection: 'row',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(18),
    // alignItems: 'baseline'
  },
  // collateralContentText: {
  //   ...Fonts.style.largeTextBold,
  //   color: Colors.transparent
  // },
  // collateralContentPrecisionView: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end'
  // },
  // collateralContentTextInt: {},
  // collateralContentTextPrecision: {
  //   fontSize: Fonts.size.medium
  // },
  collateralFooterView: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  collateralFooterTitle: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginRight: scale(7)
  },
  // collateralFooterContentView: {
  //   flexDirection: 'row'
  // },
  // collateralFooterContent: {
  //   ...Fonts.style.textMediumGT,
  //   fontWeight: '500',
  //   color: Colors.transparent
  // },
  // collateralFooterContentExtra: {
  //   textDecorationLine: 'underline'
  // },
  notificationPage: {
    height: verticalScale(60),
    backgroundColor: Colors.reduxsagaExtraLightRed,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  notificationPageContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: scale(paddingLeft)
  },
  notificationPageHeadMark: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain'
  },
  notificationPageNoteText: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack,
    marginLeft: scale(16)
  },
  distributeCollateralPage: {
    flex: 1
  },
  distributeCollateralPageContent: {
    paddingHorizontal: scale(paddingLeft),
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(30)
    // backgroundColor:'green',
  },
  distributeCollateralPageTitle: {
    ...Fonts.style.textLightGT,
    color: Colors.reduxsagaBlack,
    // lineHeight:1.33,
    opacity: 0.6
  },
  distributeCollateralPageCard: {
    marginTop: verticalScale(34)
  },
  distributeCollateralButton: {
    height: 50,
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  distributeCollateralButtonText: {
    ...Fonts.style.textBoldNormalGT,
    textAlign: 'center',
    color: Colors.transparent
  },
  distributeCollateralPageSingleCard: {
    marginBottom: verticalScale(20)
  }
});

const mapsStateToProps = state => ({});

export default connect(mapsStateToProps)(withNavigation(AddCollateralPageView));
