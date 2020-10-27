import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  RefreshControl,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnotherIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import DimensionManager, { verticalScale } from '../../Themes/DimensionManager';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import i18n from '../../I18n';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import LoanActions from '../../Redux/Loan';
import TranactionsActions from '../../Redux/Transaction';

import TouchableOpacityView from '../../Common/TouchableOpacityView';
import moment from 'moment';

const marginLeft = 20;

class DashboardAssetsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      data: this.props.transaction || {}
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    Keyboard.dismiss();

    dispatch(LoanActions.loanGetClocActive({
      uuid: this.props.user.uuid || '',
      jToken: this.props.user.jToken || ''
    }));

    // dispatch(LoanActions.loanGetCloc({
    //   uuid: this.props.user.uuid || '',
    //   jToken: this.props.user.jToken || '',
    //   id: this.props.loan.clocID || ''
    // }));

    dispatch(TranactionsActions.transactionGetAll({
      uuid: this.props.user.uuid || '',
      jToken: this.props.user.jToken || ''
    }));

    this.state = {
      refreshing: false,
      data: this.props.transaction || {}
    };
console.log(" this.props.transaction >>> ", this.props.transaction);

  }

  renderNotificationView() {
    const { loan } = this.props;
    const { cloc = {}} = loan;
    var msg = 'Welcome! Your account has just been created.';


    switch(cloc && cloc.status) {
      case 'PENDING':
      break;

      case 'ACTIVE' || 'APPROVED':
      break;

      case 'REJECTED':
      break;

      case 'SUCCESS':
      break;

      default:
      break;
    }

    if (cloc && cloc.status === 'PENDING') {
      msg = 'Welcome! Your account has just been created.';
    }

    return (
      <View style={styles.notificationView}>
        <Icon
          size={24}
          name={'check-circle'}
          color={'#4673df'} />
        <Text style={styles.notificationText}>
          {msg}
        </Text>
      </View>
    );
  }

  // TODO add navigation logic for cb
  reduxsagaitButton({label, screen, buttonTextStyle, buttonViewStyle }) {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(screen);
            }}
            style={[styles.reduxsagaitButtonView, buttonViewStyle]}>
            <Text style={[styles.reduxsagaitButtonLabel, buttonTextStyle]}>
              {label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  availablereduxsagaitContent() {
    const availablereduxsagait = this.props.loan && this.props.loan.cloc &&
        this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.available_reduxsagait

    const dailyWithdrawalLimit = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.daily_withdrawal_limit || 0;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: DimensionManager.verticalScale(48),
          height: DimensionManager.verticalScale(115),
        }}
      >
        <Text style={[styles.availablereduxsagaitContentText, {
          textAlign: 'center',
          fontSize: DimensionManager.scale(16)
        }]}>
          Available line of reduxsagait
        </Text>
        <CurrencyFormatView
          currencyValue={availablereduxsagait}
          currencyStyle={{
            currencyContent: {
              alignItems: 'flex-start',
              marginVertical: DimensionManager.verticalScale(12),
            },
            currencyContentSymbolView: { marginRight: DimensionManager.scale(3) },
            currencyContentText: styles.reduxsagaitCurrencyContentText,
            currencyContentIntText: styles.reduxsagaitCurrencyContentIntText,
          }}
        />
        <Text style={[
          styles.availablereduxsagaitContentText,
          {
            color: Colors.reduxsagaSkyBlue,
            marginTop: DimensionManager.verticalScale(-2),
            lineHeight: DimensionManager.verticalScale(21),
            fontWeight: '500',
          }]}>
          ${dailyWithdrawalLimit} limit
        </Text>
      </View>
    );
  }

  renderButtons() {
    this.reduxsagaitButton({
      label: 'Repay',
      screen: 'OneTimePayment',
    });
    this.reduxsagaitButton({
      label: 'Withdraw',
      screen: 'WithDrawTransfer',
      buttonViewStyle: {
        marginLeft: DimensionManager.scale(marginLeft),
      }
    });
    return;
  }

  renderStartCLOC() {
    return (
      <View>
        <TouchableOpacityView
          active={true}
          invertColor={true}
          label={'Get my reduxsagait line now!'}
          onPress={() => {
            this.props.navigation.navigate('StartCLOC');
          }} />
      </View>
    )
  }

  renderAvailablereduxsagait() {
    const { navigation, loan } = this.props;
    const { cloc = {}} = loan;
    const clocStatus = cloc && cloc.status || '';

    return (
      <View style={{
        height: DimensionManager.verticalScale(350),
        width: '100%',
        marginTop: DimensionManager.verticalScale(-2),
      }}>
        <LinearGradient
          colors={['#0038ca', '#2890ff']}
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: DimensionManager.verticalScale(2)
          }}>
          <TouchableOpacity
            style={{
              marginTop: DimensionManager.verticalScale(16),
              marginRight: DimensionManager.scale(21),
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }}>
            <Image style={{
                resizeMode: 'contain',
                marginLeft: DimensionManager.scale(-2),
                width: DimensionManager.scale(27),
                height: DimensionManager.verticalScale(22),
              }}
              source={require('../../Common/Images/burger-menu.png')} />
          </TouchableOpacity>

          <View style={{
            flexDirection: 'column',
          }}>
            {this.availablereduxsagaitContent()}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: DimensionManager.verticalScale(76)
              }}>

              {clocStatus === 'ACTIVE' || clocStatus === 'APPROVED' ? this.reduxsagaitButton({
                  label: 'Repay',
                  screen: 'OneTimePayment',
                }) :
                this.renderStartCLOC()}
              {clocStatus === 'ACTIVE' || clocStatus === 'APPROVED' ? this.reduxsagaitButton({
                label: 'Withdraw',
                screen: 'WithDrawTransfer',
                buttonViewStyle: {
                  marginLeft: DimensionManager.scale(marginLeft)}
                }) : null}

            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  renderContentTitle(text, extraStyle = {}) {
    const { titleView, titleText } = extraStyle;
    return (
      <View style={[styles.titleView, titleView]}>
        <Text style={[styles.titleText, titleText]}>
          {text}
        </Text>
      </View>
    );
  }

  computeWalletAssets() {
    var BTCAssets = this.props.wallet && this.props.wallet.BTC || {};
    var ETHAssets = this.props.wallet && this.props.wallet.ETH || {};
    var LBAAssets = this.props.wallet && this.props.wallet.LBA || {};
    var btcPrice = this.props.loan && this.props.loan.BTC || 0;
    var ethPrice = this.props.loan && this.props.loan.ETH || 0;
    var lbaPrice = this.props.loan && this.props.loan.LBA || 0;

    return ((BTCAssets.available * btcPrice.price) +
      (ETHAssets.available * ethPrice.price) +
      (LBAAssets.available * lbaPrice.price));
  }

  computeVaultAssets() {
    var BTCAssets = this.props.wallet && this.props.wallet.BTC || {};
    var ETHAssets = this.props.wallet && this.props.wallet.ETH || {};
    var LBAAssets = this.props.wallet && this.props.wallet.LBA || {};
    var btcPrice = this.props.loan && this.props.loan.BTC || 0;
    var ethPrice = this.props.loan && this.props.loan.ETH || 0;
    var lbaPrice = this.props.loan && this.props.loan.LBA || 0;

    return ((BTCAssets.collateralized * btcPrice.price) +
      (ETHAssets.collateralized * ethPrice.price) +
      (LBAAssets.collateralized * lbaPrice.price))
  }

  renderCombinedAssets() {
    var combinedTotalAssets = this.computeWalletAssets() + this.computeVaultAssets();

    return (
      <View
        style={[
          styles.commonCenter,
          {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Colors.reduxsagaConcreteGray,
            height: DimensionManager.verticalScale(144),
            backgroundColor: '#f4f8ff'
          },

        ]}
      >
        <Text style={styles.combinedAssetsText}>Combined Assets</Text>
        <Image
          style={{
            width: DimensionManager.scale(26),
            height: DimensionManager.verticalScale(36),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(16),
            marginBottom: DimensionManager.verticalScale(7)
          }}
          source={require('./Images/coin-stack.png')} />

        <CurrencyFormatView
          currencyValue={Number.isNaN(combinedTotalAssets) ? 0 : combinedTotalAssets}
          currencyStyle={{
            currencyContent: {
              alignItems: 'flex-start'
            },
            currencyContentSymbolView: { marginRight: DimensionManager.scale(3) },
            currencyContentText: {
              ...styles.reduxsagaitCurrencyContentText,
              color: Colors.reduxsagaBlack
            },
            currencyContentIntText: { fontSize: 40, lineHeight: 40, fontWeight: 'bold' }
          }}
        />
      </View>
    );
  }

  walletVaultAssets({ value = 0, icon, text }) {

    var imageSelected = icon === 'reduxsagait-card' ?
      require('./Images/wallet-icon.png') : require('./Images/lock-icon.png')
    return (
      <View style={styles.commonCenter}>
        <Text style={styles.combinedAssetsText}>{text}</Text>

        <Image
          style={{
            width: DimensionManager.scale(26.8),
            height: DimensionManager.verticalScale(20),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(16),
            marginBottom: DimensionManager.verticalScale(7)
          }}
          source={imageSelected} />

        <View style={{
          marginTop: DimensionManager.verticalScale(6)
        }}>
          <CurrencyFormatView
            currencyValue={value}
            currencyStyle={{
              currencyContent: {
                alignItems: 'flex-start'
              },
              currencyContentSymbolView: { marginRight: DimensionManager.scale(3) },
              currencyContentText: { fontSize: 12, lineHeight: 12, color: Colors.reduxsagaBlack },
              currencyContentIntText: { fontSize: 26, lineHeight: 26, fontWeight: 'bold' }
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (icon === 'reduxsagait-card') {
              this.props.navigation.navigate('Wallet');
            } else {
              this.props.navigation.navigate('Vault');
            }
          }}
          style={{
            width: DimensionManager.scale(147),
            height: DimensionManager.verticalScale(46),
            backgroundColor: Colors.reduxsagaDarkBlue,
            marginTop: DimensionManager.verticalScale(21),
            alignItems: 'center',
            justifyContent: 'center'
        }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>

            {icon === 'reduxsagait-card' ? (
              <Image
                style={{
                  width: DimensionManager.scale(16),
                  height: DimensionManager.verticalScale(16),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginRight: DimensionManager.scale(7)
                }}
                source={require('./Images/assets-coins.png')} />
            ) : (
              <Image
                style={{
                  width: DimensionManager.scale(16),
                  height: DimensionManager.verticalScale(16),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginRight: DimensionManager.scale(7)
                }}
                source={require('./Images/circle-i.png')} />
            )}

            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.transparent,
              fontSize: DimensionManager.scale(12),
              fontWeight: '500',
              textAlign: 'center',
            }]}>
              {icon === 'reduxsagait-card' ? 'Manage assets' : 'View details'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderWalletVault() {
    const totalWallet = this.computeWalletAssets();
    const totalVault = this.computeVaultAssets();
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(18),
          backgroundColor: '#f4f8ff',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.reduxsagaConcreteGray,
          height: DimensionManager.verticalScale(206),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {this.walletVaultAssets({
          value: Number.isNaN(totalWallet) ? 0 : totalWallet,
          icon: 'reduxsagait-card',
          text: 'Wallet assets'
        })}
        <View style={styles.verticalBar} />
        {this.walletVaultAssets({
          value: Number.isNaN(totalVault) ? 0 : totalVault,
          icon: 'lock',
          text: 'Vault assets'
        })}
      </View>
    );
  }

  renderYourAssets() {
    return (
      <View>
        {this.renderContentTitle('Your assets')}
        {this.renderCombinedAssets()}
        {this.renderWalletVault()}
      </View>
    );
  }

  renderYourreduxsagaLineHeader({ text, extraStyle = {} }) {
    const { yourreduxsagaLineHeader, yourreduxsagaLineHeaderText } = extraStyle;
    return (
      <View style={[styles.yourreduxsagaLineHeaderView, yourreduxsagaLineHeader]}>
        <Text style={[styles.yourreduxsagaLineHeaderText, yourreduxsagaLineHeaderText]}>{text}</Text>
      </View>
    );
  }

  renderreduxsagaInfoLine = ({
    key,
    frontText,
    frontDate,
    backText,
    contentText,
    statusText,
    backgroundColor = Colors.transparent,
    isTransaction = false,
    imageURL,
    currency
  }) => {
    let statusColor = Colors.reduxsagaSkyLightGray;

    if (statusText) {
      statusColor = statusText.indexOf('FAILED') > 0 ? Colors.reduxsagaRed : Colors.reduxsagaGreen;
    }

    return (
      <View
        style={[styles.reduxsagaInfoLineView,{
          backgroundColor: backgroundColor,
          height: isTransaction ? 66 : 46
        }]}
        key={key || frontText}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <Text style={[styles.lineCommonText, frontText && styles.frontLineText]}>
            {frontText}
          </Text>
          <Text style={[styles.lineCommonText, styles.lineDateText, {
            color: '#9ca5b5'
          }]}>{frontDate}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: isTransaction ? 'column' : 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flex: 1
            }}
          >
            <Text
              style={[
                styles.lineCommonText,
                styles[`${statusText}Text`],
                {
                  marginLeft: DimensionManager.scale(statusText ? 18 : 0),
                  marginTop: DimensionManager.verticalScale(isTransaction ? 13 : 0),
                  color: statusColor,
                  fontSize: DimensionManager.scale(11),
                  fontWeight: 'bold'
                }
              ]}
            >
              {statusText}
            </Text>
            {isTransaction ? (
              <Text
                style={[
                  styles.lineCommonText,
                  styles.contentLineText,
                  {
                    marginLeft: DimensionManager.scale(18),
                    flexDirection: 'column',
                    textAlign: 'left'
                  }
                ]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >
                {contentText}
              </Text>
            ) : (
              <Text
                style={[
                  styles.lineCommonText,
                  styles.contentLineText,
                  { marginLeft: DimensionManager.scale(statusText ? 9 : 18) }
                ]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >
                {contentText}
              </Text>
            )}

          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            {currency !== 'USD' ? (
              <Image style={{
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(-16),
                  width: DimensionManager.scale(24),
                  height: DimensionManager.verticalScale(24),
                  marginTop: DimensionManager.verticalScale(-2),
                  justifyContent: 'center'
                }}
                source={imageURL} />
            ) : null}
            <Text style={[styles.lineCommonText, styles.backLineText]}>
              {currency === 'USD' ? '$' + backText : backText}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTransactions() {
    var dataSet = [];

    if (this.props.transaction) {
      for (var index in this.props.transaction) {
        var imageURL = null;

        if (this.props.transaction[index].amount) {
          var status = this.props.transaction[index].status.replace('_', ' ');
          var transactionDate = new Date(this.props.transaction[index].authorized_date).getTime();
          var formatDate = transactionDate ? moment(transactionDate) : null;

          if (this.props.transaction[index].rail.currency !== 'USD') {
            switch (this.props.transaction[index].rail.currency) {
              case 'BTC':
                imageURL = require('./Images/bitcoin-on.png');
              break;

              case 'ETH':
                imageURL = require('./Images/eth-on.png');
              break;

              case 'LBA':
                imageURL = require('./Images/lba-on.png');
              break;

              default:
              break;
            }
          }

          if (formatDate && formatDate.isValid()) {
            formatDate = formatDate.format('MM/YY');
          } else {
            // TODO remove this bug.....
            formatDate = '';
          }

          dataSet.push(this.renderreduxsagaInfoLine({
              key: index + 'key',
              frontText: '',
              frontDate: formatDate,
              backText: this.props.transaction[index].amount,
              contentText: this.props.transaction[index].msg,
              statusText: status,
              backgroundColor: (index % 2) === 0 ?
                Colors.reduxsagaExtraLightBlue : Colors.transparent,
              isTransaction: true,
              imageURL: imageURL,
              currency: this.props.transaction[index].rail.currency
            })
          );
        }
      }

    }

    return dataSet;
  }

  renderYourreduxsagaLine() {
    const newDate = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.minimum_payment_due_date || new Date();

    const paymentDueDate = moment(new Date(newDate).getTime()).format('L');
    const minPayment = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.net_billed_finance_charges || 0;
    const interest = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.net_billed_finance_interest || 0;
    const fees = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.net_billed_finance_fees || 0;
    const reduxsagaitLine = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.reduxsagait_line || 0;
    const outStandingBalance = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.outstanding_balance || 0;
    const availablereduxsagait = this.props.loan && this.props.loan.cloc &&
      this.props.loan.cloc.ledger && this.props.loan.cloc.ledger.available_reduxsagait || 0

    const transactionTitle = text => {
      return (
        <Text style={[
          styles.lineCommonText,
          styles.lineCommonTextTitle
        ]}>
          {text}
        </Text>
      );
    };

    return (
      <View>
        {this.renderContentTitle('Your reduxsagait line')}
        {this.renderYourreduxsagaLineHeader({ text: 'PAYMENT INFORMATION' })}
        {this.renderreduxsagaInfoLine({
          frontText: 'Minimum payment due ',
          frontDate: paymentDueDate,
          backText: '$'+minPayment
        })}
        {this.renderreduxsagaInfoLine({
          frontText: 'Interest',
          backText: '$'+interest,
          backgroundColor: Colors.reduxsagaExtraLightBlue
        })}
        {this.renderreduxsagaInfoLine({ frontText: 'Fees', backText: '$'+fees })}
        {this.renderYourreduxsagaLineHeader({ text: 'ACCOUNT SUMMARY' })}
        {this.renderreduxsagaInfoLine({ frontText: 'reduxsagait line', backText: '$'+reduxsagaitLine })}
        {this.renderreduxsagaInfoLine({
          frontText: 'Available reduxsagait',
          backText: '$' + availablereduxsagait,
          backgroundColor: Colors.reduxsagaExtraLightBlue
        })}
        {this.renderreduxsagaInfoLine({
          frontText: 'Outstanding balance',
          backText: '$'+ outStandingBalance
        })}
        {this.renderYourreduxsagaLineHeader({ text: 'RECENT TRANSACTIONS' })}
        {this.renderreduxsagaInfoLine({
          frontText: transactionTitle('Date'),
          contentText: transactionTitle('Description'),
          backText: transactionTitle('Amount')
        })}

        {this.renderTransactions()}

      </View>
    );
  }

  renderContent(){
    return (
      <View style={{
        //flex: 1,
        flexDirection: 'column',
        marginBottom: DimensionManager.verticalScale(33),
        width: '100%',
      }}>
        {this.renderAvailablereduxsagait()}
        {this.renderYourAssets()}
        {this.renderYourreduxsagaLine()}
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <StatusBar
          barStyle="light-content"
        />
        {!this.props.loan.hasCLOC ? this.renderNotificationView() : null}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                const { navigation } = this.props;
                const { dispatch } = navigation;

                dispatch(TranactionsActions.transactionGetAll({
                  uuid: this.props.user.uuid || '',
                  jToken: this.props.user.jToken || ''
                }));

                if (this.props.loan && this.props.loan.cloc &&
                  this.props.loan.cloc.id) {

                    dispatch(LoanActions.loanGetCloc({
                      id: this.props.loan.cloc.id,
                      jToken: this.props.user.jToken,
                      uuid: this.props.user.uuid
                    }));

                    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
                      symbol: 'BTC',
                      convert: 'USD'
                    }));

                    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
                      symbol: 'ETH',
                      convert: 'USD'
                    }));

                    dispatch(LoanActions.loanFetchRealtimeCryptoQuote({
                      symbol: 'LBA',
                      convert: 'USD'
                    }));
                }
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {this.renderContent()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(47),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  commonCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f8ff'
  },
  verticalBar: {
    height: '100%',
    width: DimensionManager.scale(1),
    backgroundColor: Colors.reduxsagaConcreteGray
  },
  notificationView: {
    height: DimensionManager.verticalScale(40),
    width: '100%',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.reduxsagaBlack,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    zIndex: 1,
    marginTop: DimensionManager.verticalScale(2)
  },
  notificationText: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaBlack,
    marginLeft: DimensionManager.scale(5),
    marginTop: DimensionManager.verticalScale(2),
  },
  reduxsagaitButtonView: {
    width: DimensionManager.scale(157),
    height: DimensionManager.verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    marginTop: DimensionManager.verticalScale(10),
  },
  reduxsagaitButtonLabel: {
    ...Fonts.style.textBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaDarkBlue,
    textAlign: 'center'
  },
  availablereduxsagaitView: {
    height: DimensionManager.verticalScale(350),
    width: '100%',
    //marginTop: DimensionManager.verticalScale(-2),
  },
  availablereduxsagaitGradientView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: DimensionManager.verticalScale(2)
  },
  availablereduxsagaitContentText: {
    fontWeight: '500',
    color: Colors.transparent,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.reduxsagaBold
  },
  reduxsagaitCurrencyContentText: {
    lineHeight: DimensionManager.verticalScale(16),
    fontSize: DimensionManager.scale(16)
  },
  reduxsagaitCurrencyContentIntText: {
    lineHeight: DimensionManager.verticalScale(54),
    fontSize: DimensionManager.scale(54),
    fontWeight: 'bold'
  },
  titleView: {
    height: DimensionManager.verticalScale(85)
  },
  titleText: {
    ...Fonts.style.h3BoldGT,
    marginTop: DimensionManager.verticalScale(30),
    textAlign: 'center',
    opacity: 1,
    color: Colors.reduxsagaConcreteGray,
    fontWeight: '500',
    letterSpacing: (-0.7),
    fontStyle: 'normal'
  },
  combinedAssetsText: {
    ...Fonts.style.textMediumLightGT,
    fontWeight: '500',
    opacity: 1,
    color:'#9ca5b5',
  },
  yourreduxsagaLineHeaderView: {
    height: DimensionManager.verticalScale(45),
    backgroundColor: '#9fbafb',
    paddingLeft: DimensionManager.scale(marginLeft),
    flexDirection: 'row',
    alignItems: 'center'
  },
  yourreduxsagaLineHeaderText: {
    ...Fonts.style.textSmallBoldGT,
    opacity: 1,
    fontWeight: 'bold',
    color: Colors.transparent
  },
  reduxsagaInfoLineView: {
    height: DimensionManager.verticalScale(46),
    paddingHorizontal: DimensionManager.scale(marginLeft),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  lineCommonText: {
    ...Fonts.style.textMediumLightGT,
    opacity: 1,
    fontWeight: '500',
    color: '#9ca5b5'
  },
  frontLineText: {
    minWidth: DimensionManager.scale(55)
  },
  contentLineText: {
    flex: 1
  },
  lineDateText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaDarkBlue
  },
  backLineText: {
    textAlign: 'right',
    marginLeft: DimensionManager.scale(22),
    color: Colors.reduxsagaBlack
  },
  lineCommonTextTitle: {
    fontSize: Fonts.size.small,
    color: Colors.reduxsagaSkyLightGray
  },
  PENDINGText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.reduxsagaGreen
  }
});
const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DashboardAssetsView));
