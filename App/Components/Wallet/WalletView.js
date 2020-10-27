import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  PanResponder,
  UIManager,
  InteractionManager,
  Clipboard,
  RefreshControl
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import { toFormatNumber } from '../../Utils/CurrencyUtils';
import { PageStyleConfig } from '../../Config/PageStyleConfig';
import CurrencyTranslation from '../Onboarding/CurrencyTranslation';
import WalletActions from '../../Redux/Wallet';

class WalletView extends Component {
  constructor(props) {
    super(props);
    // TODO need use real assets Data
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      refreshing: false,
      data: [
        {
          image: require('../Dashboard/Images/bitcoin-on.png'),
          currency: 'BTC',
          currencyName: 'Bitcoin',
          currencyValue: this.props.wallet.BTC
            && this.props.wallet.BTC.available || 0,
          usdValue: this.props.wallet.BTC
            && this.props.wallet.BTC.available * this.props.loan.BTC.price || 0,
          address: this.props.wallet.BTC
            && this.props.wallet && this.props.wallet.BTC.address || ''
        },
        {
          image: require('../Dashboard/Images/eth-on.png'),
          currency: 'ETH',
          currencyName: 'Ethereum',
          currencyValue: this.props.wallet.ETH
            && this.props.wallet.ETH.available || 0,
          usdValue: this.props.wallet.ETH
            && this.props.wallet.ETH.available * this.props.loan.ETH.price || 0,
          address: this.props.wallet.ETH
            && this.props.wallet && this.props.wallet.ETH.address || ''
        },
        {
          image: require('../Dashboard/Images/lba-on.png'),
          currency: 'LBA',
          currencyName: 'reduxsaga Lend Borrow Asset',
          currencyValue: this.props.wallet.LBA
            && this.props.wallet.LBA.available || 0,
          usdValue: this.props.wallet.LBA
            && this.props.wallet.LBA.available * this.props.loan.LBA.price || 0,
          address: this.props.wallet && this.props.wallet.LBA
            && this.props.wallet && this.props.wallet.LBA.address || ''
        }
      ]
    };
  }

  transferOnPress = (currency, address) => () => {
    const { navigation } = this.props;
    navigation.navigate('WalletAddress', { currency, address });
  };

  copyAddress = (currency, address) => () => {
    Clipboard.setString(address);
  };

  sendOnPress = (currency, currencyName) => () => {
    const { navigation } = this.props;
    navigation.navigate('SendCoins', { currency, currencyName });
  };
  // TODO add transfer image
  walletsInfo = ({
    image,
    address,
    currency,
    currencyName,
    currencyValue = 0,
    usdValue = 0,
    topLine = false,
    bottomLine = true
  }) => {
    return (
      <View
        style={[
          styles.walletsInfoView,
          {
            borderBottomWidth: bottomLine ? DimensionManager.verticalScale(1) : 0,
            borderTopWidth: topLine ? DimensionManager.verticalScale(1) : 0
          }
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                ...Fonts.style.textMediumGT,
                fontWeight: '500',
                opacity: 1,
                color: Colors.reduxsagaDarkGray
              }}
            >
              {currencyName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...Fonts.style.textBoldNormalGT,
                  fontWeight: 'bold',
                  opacity: 1,
                  color: Colors.reduxsagaBlack
                }}
              >
                {currencyValue} {currency}
              </Text>
              <Text
                style={{
                  ...Fonts.style.textBoldNormalGT,
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 1.14 * 14,
                  opacity: 1,
                  color: Colors.reduxsagaSkyLightGray,
                  marginLeft: DimensionManager.scale(7)
                }}
              >
                ${usdValue.toFixed(2)} USD
              </Text>
            </View>
          </View>
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
        <View style={{ marginTop: DimensionManager.verticalScale(14) }}>
          <Text
            style={{
              ...Fonts.style.textSmallBoldGT,
              color: Colors.reduxsagaSkyLightGray,
              opacity: 1,
              fontWeight: 'bold',
              letterSpacing: 1
            }}
          >
            ADDRESS
          </Text>
          <Text
            style={{
              ...Fonts.style.textMediumGT,
              fontWeight: '500',
              fontSize: DimensionManager.scale(12),
              opacity: 1,
              color: Colors.reduxsagaDarkBlue
            }}
          >
            {address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: DimensionManager.verticalScale(26)
          }}
        >
          <TouchableOpacity style={styles.button} onPress={this.transferOnPress(currency, address)}>
            <Image
              source={require('../Dashboard/Images/up-arrow.png')}
              style={{
                resizeMode: 'contain',
                width: DimensionManager.scale(15),
                height: DimensionManager.verticalScale(15),
                marginRight: DimensionManager.scale(8),
                transform: [{ rotate: '225deg' }]
              }}
            />
            <Text style={styles.buttonLabel}>Receive {currency}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.sendOnPress(currency, currencyName)}
          >
            <Image
              source={require('../Dashboard/Images/up-arrow.png')}
              style={{
                resizeMode: 'contain',
                width: DimensionManager.scale(15),
                height: DimensionManager.verticalScale(15),
                marginRight: DimensionManager.scale(8),
                transform: [{ rotate: '45deg' }]
              }}
            />
            <Text style={styles.buttonLabel}>Send {currency}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  addAssetsInfo = () => {
    const { data = [] } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.headContentView}>
          {/*<Text style={styles.headContentText}>*/}
          {/*Choose your new wallet to fund your vault with collateral.*/}
          {/*</Text>*/}
          {data.map((i, index) => {
            const { image, address, currency, currencyValue, currencyName, usdValue } = i;
            return (
              <View key={index}>
                {this.walletsInfo({
                  image,
                  address,
                  currency,
                  currencyValue,
                  usdValue,
                  currencyName,
                  topLine: index === 0
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideBackBtn={this.state.context === 'BURGER'}
          hideNextBtn={true}
          title={'Wallets'}
          hideStep hideMenu={false} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            viewIsInsideTabBar={true}
            enableOnAndroid={true}
            extraScrollHeight={DimensionManager.verticalScale(20)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  const { navigation } = this.props;
                  const { dispatch } = navigation;

                  dispatch(WalletActions.walletGetAddresses({
                    uuid: this.props.user.uuid,
                    jToken: this.props.user.jToken
                  }));
                }}
              />
            }>
            {this.addAssetsInfo()}
          </ScrollView>
        <CurrencyTranslation showModal={false} />
      </SafeAreaView>
    );
  }
}

const marginLeft = DimensionManager.scale(20);
const marginRight = DimensionManager.scale(20);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBlack
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headContentView: {
    // marginTop: DimensionManager.verticalScale(32)
  },
  headContentText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack,
    marginBottom: DimensionManager.verticalScale(31),
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 1.59 * 17,
    marginHorizontal: DimensionManager.scale(PageStyleConfig.leftNumber)
  },
  walletsInfoView: {
    borderColor: Colors.reduxsagaLightGray,
    borderBottomWidth: DimensionManager.verticalScale(1),
    borderTopWidth: DimensionManager.verticalScale(1),
    height: DimensionManager.verticalScale(218),
    paddingTop: DimensionManager.verticalScale(26),
    paddingBottom: DimensionManager.verticalScale(29),
    paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
  },
  imageView: {
    marginTop: DimensionManager.verticalScale(3)
  },
  image: {
    width: DimensionManager.scale(36),
    height: DimensionManager.verticalScale(36),
    resizeMode: 'contain'
  },
  button: {
    height: DimensionManager.verticalScale(46),
    width: DimensionManager.scale(160),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.reduxsagaExtraLightBlue
  },
  buttonLabel: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaDarkBlue,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginLeft: DimensionManager.scale(-4),
    marginTop: DimensionManager.verticalScale(2)
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WalletView));
