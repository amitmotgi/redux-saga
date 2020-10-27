import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import colors from '../../Themes/Colors';
import WalletActions from '../../Redux/Wallet';

class VaultView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(WalletActions.walletGetAddresses({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken
    }));
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 1,
        borderColor: Colors.reduxsagaLine,
        opacity: 0.2
      }}
      />
    );
  }

  renderHeaderColateral = () => {
    return (
      <View >
        <Text style={[Fonts.style.textSmallBoldGT, {
          color: colors.reduxsagaSkyLightGray,
          marginLeft: DimensionManager.scale(20),
          marginTop: DimensionManager.verticalScale(26),
          marginBottom: DimensionManager.verticalScale(18),
          opacity: 1
        }]}>
          {i18n.t('COLLATERAL')}
        </Text>
        {this.renderLine()}
      </View>
    );
  }

  renderHeaderStaked = () => {
    return (
      <View >
        <Text style={[Fonts.style.textSmallBoldGT, {
          color: colors.reduxsagaSkyLightGray,
          marginLeft: DimensionManager.scale(20),
          marginBottom: DimensionManager.verticalScale(20),
          marginTop: DimensionManager.verticalScale(60),
          opacity: 1
        }]}>
          {i18n.t('STAKED')}
        </Text>
        {this.renderLine()}
      </View>
    )
  }


  renderBTC = () => {
    var btcCollateralized = this.props.wallet && this.props.wallet.BTC &&
      this.props.wallet.BTC.collateralized || 0;
    var lbaStaked = this.props.wallet && this.props.wallet.LBA &&
      this.props.wallet.LBA.collateralized || 0;

    var btcAmount = btcCollateralized * (this.props.loan.BTC
      && this.props.loan.BTC.price || 0);
    var lbaAmount = lbaStaked * (this.props.loan.LBA
      && this.props.loan.LBA.price || 0);

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DimensionManager.scale(20),
        marginTop: DimensionManager.verticalScale(24),
        marginBottom: DimensionManager.verticalScale(24),
      }}>
        <View style={{
          flexDirection: 'column',

        }}>
          <Text style={[Fonts.style.textMediumGT, {
            color: colors.reduxsagaDarkGray,
          }]}>
          {i18n.t('Bitcoin')}
          </Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={[Fonts.style.textBoldNormalGT, {
              color: colors.reduxsagaBlack,
            }]}>
              {btcAmount} BTC
            </Text>
            <Text
              style={{
                ...Fonts.style.textBoldNormalGT,
                fontSize: 12,
                fontWeight: '500',
                lineHeight: DimensionManager.verticalScale(16),
                opacity: 1,
                color: Colors.reduxsagaSkyLightGray,
                marginLeft: DimensionManager.scale(7),
                marginTop: DimensionManager.verticalScale(4),
              }}
            >
              ${btcAmount} USD
            </Text>
          </View>
        </View>
        <Image
          source={require('../Dashboard/Images/bitcoin-on.png')}
          style={{
            height: DimensionManager.verticalScale(36),
            width: DimensionManager.scale(36),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginRight: DimensionManager.scale(20),
          }}
        />
      </View>
    )
  }

  renderETH = () => {
    var ethCollateralized = this.props.wallet && this.props.wallet.ETH &&
      this.props.wallet.ETH.collateralized || 0;

    var ethAmount = ethCollateralized * (this.props.loan.ETH
      && this.props.loan.ETH.price || 0);

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DimensionManager.scale(20),
        marginTop: DimensionManager.verticalScale(24),
        marginBottom: DimensionManager.verticalScale(24),
      }}>
        <View style={{
          flexDirection: 'column',

        }}>
          <Text style={[Fonts.style.textMediumGT, {
            color: colors.reduxsagaDarkGray,
          }]}>{i18n.t('Ethereum')} </Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={[Fonts.style.textBoldNormalGT, {
              color: colors.reduxsagaBlack,
            }]}>{ethCollateralized} ETH</Text>
            <Text
              style={{
                ...Fonts.style.textBoldNormalGT,
                fontSize: 12,
                fontWeight: '500',
                lineHeight: DimensionManager.verticalScale(16),
                opacity: 1,
                color: Colors.reduxsagaSkyLightGray,
                marginLeft: DimensionManager.scale(7),
                marginTop: DimensionManager.verticalScale(4),
              }}
            >
              ${ethAmount} USD
            </Text>
          </View>
        </View>
        <Image
          source={require('../Dashboard/Images/eth-on.png')}
          style={{
            height: DimensionManager.verticalScale(36),
            width: DimensionManager.scale(36),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginRight: DimensionManager.scale(20),
          }}
        />
      </View>
    )
  }

  renderLBA = () => {
    var lbaStaked = this.props.wallet && this.props.wallet.LBA &&
      this.props.wallet.LBA.collateralized || 0;

    var lbaAmount = lbaStaked * (this.props.loan.LBA
      && this.props.loan.LBA.price || 0);

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DimensionManager.scale(20),
        marginTop: DimensionManager.verticalScale(24),
        marginBottom: DimensionManager.verticalScale(24),
      }}>
        <View style={{
          flexDirection: 'column',

        }}>
          <Text style={[Fonts.style.textMediumGT, {
            color: colors.reduxsagaDarkGray,
          }]}>{i18n.t('reduxsagaBorrrowAsset')} </Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={[Fonts.style.textBoldNormalGT, {
                color: colors.reduxsagaBlack,
              }]}>{lbaStaked} LBA</Text>
            <Text
              style={{
                ...Fonts.style.textBoldNormalGT,
                fontSize: 12,
                fontWeight: '500',
                lineHeight: DimensionManager.verticalScale(16),
                opacity: 1,
                color: Colors.reduxsagaSkyLightGray,
                marginLeft: DimensionManager.scale(7),
                marginTop: DimensionManager.verticalScale(4),
              }}
            >
              ${lbaAmount} USD
            </Text>
          </View>
        </View>
        <Image
          source={require('../Dashboard/Images/lba-on.png')}
          style={{
            height: DimensionManager.verticalScale(36),
            width: DimensionManager.scale(36),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginRight: DimensionManager.scale(20),
          }}
        />
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('vaultHeader')}
          hideNextBtn={true}
          hideBackBtn={this.state.context === 'BURGER'}
          hideStep={true}
        />
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
          {this.renderHeaderColateral()}
          {this.renderBTC()}
          {this.renderLine()}
          {this.renderETH()}
          {this.renderLine()}
          {this.renderHeaderStaked() }
          {this.renderLBA()}
          {this.renderLine()}
        </ScrollView>
      </SafeAreaView >
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },

  title: {
    ...Fonts.style.h3BoldGT,
    opacity: 1,
    color: Colors.transparent
  },

});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(VaultView));
