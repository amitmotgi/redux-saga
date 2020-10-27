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

} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import OnboardingActions from '../../Redux/Onboarding';
import { toFormatNumber } from '../../Utils/CurrencyUtils';
import { PageStyleConfig } from '../../Config/PageStyleConfig';

class CongratulationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          image: require('../Dashboard/Images/bitcoin-on.png'),
          currencyName: 'Bitcoin',
          currency: 'BTC',
          currencyValue: this.props.wallet && this.props.wallet.BTC
            && this.props.wallet.BTC.available || 0
        },
        {
          image: require('../Dashboard/Images/eth-on.png'),
          currencyName: 'Ethereum',
          currency: 'ETH',
          currencyValue: this.props.wallet && this.props.wallet.ETH
            && this.props.wallet.ETH.available || 0
        },
        {
          image: require('../Dashboard/Images/lba-on.png'),
          currencyName: 'Lend Borrow Asset',
          currency: 'LBA',
          currencyValue: this.props.wallet && this.props.wallet.LBA
            && this.props.wallet.LBA.available || 0
        }
      ]
    };
  }

  componentDidMount() {
    this.state = {
      data: [
        {
          image: require('../Dashboard/Images/bitcoin-on.png'),
          currencyName: 'Bitcoin',
          currency: 'BTC',
          currencyValue: this.props.wallet && this.props.wallet.BTC
            && this.props.wallet.BTC.available || 0
        },
        {
          image: require('../Dashboard/Images/eth-on.png'),
          currencyName: 'Ethereum',
          currency: 'ETH',
          currencyValue: this.props.wallet && this.props.wallet.ETH
            && this.props.wallet.ETH.available || 0
        },
        {
          image: require('../Dashboard/Images/lba-on.png'),
          currencyName: 'Lend Borrow Asset',
          currency: 'LBA',
          currencyValue: this.props.wallet && this.props.wallet.LBA
            && this.props.wallet.LBA.available || 0
        }
      ]
    };
  }

  // TODO add navigation logic
  buttonOnPress = type => () => {
    const { dispatch, navigation } = this.props;
    navigation.navigate(type);
  };

  walletsInfo = ({
    image,
    currencyName,
    currency,
    currencyValue = 0,
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
        <View style={[styles.walletsInfoContentView, styles.walletsInfoFront]}>
          <Image source={image} style={styles.image} />
          <Text style={styles.walletsInfoFrontText}>{currencyName}</Text>
        </View>
        <View style={[styles.walletsInfoContentView, styles.walletsInfoBack]}>
          <Text style={styles.walletsInfoBackText}>
            {toFormatNumber({ val: currencyValue, precision: 0 })}
          </Text>
          <Text
            style={[
              styles.walletsInfoBackText //styles.walletsInfoBackCurrencyText
            ]}
          >
            {' '}
            {currency}
          </Text>
        </View>
      </View>
    );
  };

  renderCongrats = () => {
    const { data = [] } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.headContentView}>
          <Text style={styles.headContentText}>
            Now fund your new reduxsaga wallets with your crypto assets.
          </Text>
          {data.map((i, index) => {
            const { image, currencyName, currency, currencyValue } = i;
            return (
              <View key={index}>
                {this.walletsInfo({
                  image,
                  currencyName,
                  currency,
                  currencyValue,
                  topLine: index === 0
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.footerView}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={this.buttonOnPress('Wallet')}
          >
            <Text style={styles.footerButtonLabel}>Add to your wallet</Text>
          </TouchableOpacity>
          <View style={styles.lineSpaceView}>
            <View style={styles.lineSpace} />
            <Text style={styles.lineSpaceText}>or</Text>
            <View style={styles.lineSpace} />
          </View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={this.buttonOnPress('Dashboard')}
          >
            <Text style={[styles.footerButtonLabel,{ paddingLeft: DimensionManager.scale(8)}]}>Get a line of reduxsagait</Text>
          </TouchableOpacity>
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
          hideBackBtn={true}
          hideNextBtn={true}
          title={'Congratulations!'}
          hideStep={true}
          hideMenu={false}/>
        <ScrollView>
          {this.renderCongrats()}
        </ScrollView>
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
    // marginHorizontal: DimensionManager.scale(20),
    flex: 1,
    justifyContent: 'space-between'
  },
  headContentView: {
    marginTop: DimensionManager.verticalScale(30)
  },
  headContentText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack,
    marginBottom: DimensionManager.verticalScale(24),
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 1.59 * 17,
    marginHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
  },
  walletsInfoView: {
    borderColor: Colors.reduxsagaLightGray,
    borderBottomWidth: DimensionManager.verticalScale(1),
    borderTopWidth: DimensionManager.verticalScale(1),
    height: DimensionManager.verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  walletsInfoContentView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  walletsInfoFront: {
    marginLeft: DimensionManager.scale(PageStyleConfig.leftNumber)
  },
  walletsInfoFrontText: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    fontWeight: '500',
    color: Colors.reduxsagaDarkGray
  },
  walletsInfoBack: {
    marginRight: DimensionManager.scale(PageStyleConfig.rightNumber + 4),
    marginTop: DimensionManager.verticalScale(-3),
    alignItems: 'baseline'
  },
  walletsInfoBackText: {
    ...Fonts.style.h5TextBold,
    color: Colors.reduxsagaBlack,
    fontWeight: 'bold',
    opacity: 1,
    fontSize: 18
  },
  walletsInfoBackCurrencyText: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    marginLeft: DimensionManager.scale(9)
  },
  image: {
    width: DimensionManager.scale(24),
    height: DimensionManager.verticalScale(24),
    resizeMode: 'contain',
    marginRight: DimensionManager.scale(9)
  },
  footerView: {
    marginTop: DimensionManager.verticalScale(190),
    marginBottom: DimensionManager.verticalScale(7),
    marginHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
  },
  footerButton: {
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  footerButtonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  },
  lineSpaceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: DimensionManager.verticalScale(34)
  },
  lineSpace: {
    height: DimensionManager.verticalScale(1),
    width: DimensionManager.scale(126),
    backgroundColor: Colors.reduxsagaLightGray
  },
  lineSpaceText: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    color: Colors.reduxsagaConcreteGray
  }
});

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(CongratulationView));
