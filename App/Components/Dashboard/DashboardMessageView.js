import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import DimensionManager, { verticalScale } from '../../Themes/DimensionManager';
import i18n from '../../I18n';


class DashboardMessageView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      linkContent: '',
      iconColor: '',
    };
  }

  render() {

    const { text, linktext, iconStyle, textStyle, lintTextStyle, style } = this.props;
    this.iconColor = Colors.reduxsagaDarkBlue;
    switch (this.props.type) {
      case '1'://Welcome! Your account has just been created.
        this.content = text || i18n.t('msgWelcome');
        this.linkContent = linktext || '';
        break;
      case '2'://Your Bitcoin transfer from Coinbase is now pending.
        this.content = text || i18n.t('msgPending');
        this.linkContent = linktext || '';
        break;
      case '3'://Your Bitcoin transfer just went through!Go to wallet

        this.content = text || i18n.t('msgThrough');
        this.linkContent = linktext || i18n.t('msgGoToWallet');
        break;
      case '4'://Your first payment is due on 11/21.Set up autopay

        this.content = text || i18n.t('msgDueDate', {date:this.props.dueDate});
        this.linkContent = linktext || i18n.t('msgAutopay');
        break;
      case '5'://Your first payment is past-due.Set up autopay
        this.iconColor = Colors.reduxsagaDarkRed;
        this.content = text || i18n.t('msgPastDue');
        this.linkContent = linktext || i18n.t('msgAutopay');
        break;
      case '6'://Your autopayment didn’t go through.Find out why
        this.iconColor = Colors.reduxsagaDarkRed;
        this.content = text || i18n.t('msgPpaymentUnThrough');
        this.linkContent = linktext || i18n.t('msgFindWhy');
        break;
      case '7'://Your autopayment just went through.

        this.content = text || i18n.t('msgPaymentThrough');
        this.linkContent = linktext || '';
        break;
        case '8'://Oops! You can withdraw up to $7,500 per day.
        this.iconColor = Colors.reduxsagaDarkRed;
        this.content = text || i18n.t('msgWithDraw', {amount:this.props.amount});
        this.linkContent = linktext || '';
        break;
        case '9'://Your account is past due. Make a payment
        this.iconColor = Colors.reduxsagaDarkRed;
        this.content = text || i18n.t('msgAccountPastDue');
        this.linkContent = linktext ||  i18n.t('msgMakePay');
        break;
      default:
        this.content = text || i18n.t('');
        this.linkContent = linktext || i18n.t('');
        break;
    }

    return (
      this.props.visable ?//是否显示
        <View style={[styles.notificationView, style]}>
          <Icon
            size={15}
            name={'check-circle'}
            color={this.iconColor}
            style={[
              iconStyle
            ]}
          />
          <Text style={[styles.notificationText,textStyle]}>
            {this.content}
          </Text>
          <TouchableOpacity onPress={() => this.props.onPress()}>
            <Text style={[styles.linkTextBlue, lintTextStyle]}>
              {this.linkContent}
            </Text>
          </TouchableOpacity>

        </View >
        : null
    );
  }
}

const styles = StyleSheet.create({

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
    zIndex: 1
  },
  notificationText: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaBlack,
    marginLeft: DimensionManager.scale(5)
  },
  linkTextBlue: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaDarkBlue,
    marginLeft: DimensionManager.scale(5)
  },
  linkTextRed: {
    ...Fonts.style.textSmallBoldGT,
    fontWeight: '500',
    opacity: 1,
    color: Colors.reduxsagaDarkRed,
    marginLeft: DimensionManager.scale(5)
  },
});
const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DashboardMessageView));
