import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import { scale, verticalScale } from '../../Themes/DimensionManager';
import Fonts from '../../Themes/Fonts';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { toFormatCurrency, toFormatNumber } from '../../Utils/CurrencyUtils';
import Icon from 'react-native-vector-icons/Entypo';

class ReviewCollateralPageView extends Component {
  constructor(props) {
    super(props);
  }
  reviewHeadCollateralPage = () => {
    return (
      <View style={styles.reviewHeadCollateralPage}>
        <View>
          <Text style={styles.reviewCollateralHeadText}>LINE OF reduxsagaIT</Text>
        </View>
        <CurrencyFormatView
          currencyValue={1233545.989}
          currencyStyle={{ currencyContentIntText: { textDecorationLine: 'underline' } }}
        />
        <View style={styles.reviewHeadCollateralFooterView}>
          <Text style={styles.reviewHeadCollateralFooterTitle}>Minimum Monthly Payment</Text>
          <CurrencyFormatView
            currencyValue={2488.8888}
            currencyStyle={{
              currencyContentText: { fontSize: Fonts.size.medium },
              currencyContentFullText: { textDecorationLine: 'underline' }
            }}
            type={'full'}
          />
        </View>
      </View>
    );
  }
  currencyWallet = (data, key = 0) => {
    const { currencyName, url, walletDollar = 0, walletCoin = 0 } = data;
    return (
      <View key={key} style={styles.currencyWalletView}>
        <View style={styles.currencyWalletContentView}>
          <View style={styles.currencyWalletContentBegin}>
            <Image source={url} style={styles.currencyWalletContentImg} />
            <Text style={styles.coinWalletText}>{currencyName} Wallet</Text>
          </View>
          <View>
            <Text style={styles.walletDollarText}>{toFormatCurrency({ val: walletDollar })}</Text>
            <Text style={styles.walletCoin}>
              {toFormatNumber({ val: walletCoin })} {currencyName}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  buyNowView = () => {
    return (
      <View style={styles.buyNowView}>
        <View style={styles.buyNowContentView}>
          <View>
            <Text style={styles.buyNowContentText}>Your current interest rate is 12%.</Text>
            <Text style={styles.buyNowContentText}>Buy LBA Tokens to bring it down!</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('icon')}>
            {/* TODO add ICON logic*/}
            <Icon name="chevron-small-right" size={30} color={Colors.reduxsagaBlack} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  confirmView = () => {
    // TODO add confirm logic
    return (
      <TouchableOpacity style={styles.confirmButton} onPress={() => console.log('confirm')}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    );
  }

  reviewContent = () => {
    const data = [
      {
        currencyName: 'BTC',
        url: require('../Images/wallet.png'),
        walletDollar: 10000,
        walletCoin: 12.345
      }
    ];
    return (
      <View style={styles.reviewContent}>
        <ScrollView>
          <View>
            <Text style={styles.lockedAssetsText}>Locked as assets:</Text>
            {data.map((i, index) => this.currencyWallet(i, index))}
            {this.buyNowView()}
            {this.confirmView()}
          </View>
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.reviewCollateralView}>
          <HeaderBarOnboardingView hideNextBtn={true} hideStep={true} title={I18n.t('Review')} />
          {this.reviewHeadCollateralPage()}
          {this.reviewContent()}
        </View>
      </SafeAreaView>
    );
  }
}

const marginLeft = 20;
const marghinRight = 20;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.backgroundExtraColor
  },
  reviewCollateralView: {
    flex: 1,
    backgroundColor: Colors.backgroundExtraColor
  },
  reviewHeadCollateralPage: {
    height: verticalScale(210),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewCollateralHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginBottom: verticalScale(10)
  },
  reviewHeadCollateralFooterView: {
    marginTop: verticalScale(20),
    alignItems: 'center'
  },
  reviewHeadCollateralFooterTitle: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent
  },
  reviewContent: {
    flex: 1
  },
  lockedAssetsText: {
    ...Fonts.style.textBoldGT,
    color: Colors.reduxsagaBlack,
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15),
    marginHorizontal: scale(marginLeft)
  },
  currencyWalletView: {
    backgroundColor: Colors.transparent
  },
  currencyWalletContentView: {
    paddingVertical: verticalScale(12),
    marginHorizontal: scale(marginLeft),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: verticalScale(1),
    borderBottomColor: Colors.reduxsagaLightGray
  },
  currencyWalletContentBegin: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currencyWalletContentImg: {
    marginRight: scale(8),
    width: scale(30),
    height: verticalScale(30),
    resizeMode: 'contain'
  },
  coinWalletText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack
  },
  walletDollarText: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.reduxsagaBlack,
    textAlign: 'right'
  },
  walletCoin: {
    textAlign: 'right',
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.4,
    color: Colors.reduxsagaBlack
  },
  buyNowView: {
    marginTop: verticalScale(100),
    backgroundColor: Colors.transparent
  },
  buyNowContentView: {
    paddingVertical: verticalScale(14),
    marginHorizontal: scale(marginLeft),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buyNowContentText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack
  },
  confirmButton: {
    marginHorizontal: scale(marginLeft),
    marginTop: verticalScale(115),
    marginBottom: verticalScale(40),
    height: verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  confirmButtonText: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.transparent,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ReviewCollateralPageView);
