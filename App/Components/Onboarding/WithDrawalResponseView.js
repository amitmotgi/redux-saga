import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import I18n from '../../I18n';
import { DimensionManager, Colors, Fonts } from '../../Themes';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class WithDrawalResponseView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: require('../../Components/Images/check-mark-success.png'),
      title: I18n.t('yes'),
      message: '',
      buttonLabel: I18n.t('continue'),
    };

  }

  componentDidMount() {
    console.log('result', this.props.navigation.state.params);
    if (!this.props.navigation.state.params) {
      return;
    }
    const {
      type,
      cardNumber,
      img,
      title,
      message,
      buttonLabel
    } = this.props.navigation.state.params;

    switch (type) {
      case '1'://YES!Your withdrawal transaction from reduxsaga to your Mastercard debit ...8856 was successful.
        this.setState({
          img: require('../../Components/Images/check-mark-success.png'),
          title: I18n.t('yes'),
          message: I18n.t('successLoginInToChaseBank', { 'cardNumber': this.formatCardNumber(cardNumber) }),
          buttonLabel: I18n.t('goDashBoard'),
        });
        break;

      case '2'://Oops!We’re sorry. We cannot process your loan request at the moment. Please try again later.,
        this.setState({
          img: require('../../Components/Images/check-close.png'),
          title: I18n.t('Oops'),
          message: I18n.t('requestLoanFailed'),
          buttonLabel: I18n.t('tryAgain'),
        });
        break;

      case '3'://We're Sorry,Your withdrawal transaction from reduxsaga to your Mastercard debit ...8856 was unsuccessful.
        this.setState({
          img: require('../../Components/Images/check-mark-success.png'),
          title: I18n.t('weSorry'),
          message: I18n.t('unSuccessLoginInToChaseBank',  {
            'cardNumber': this.formatCardNumber(cardNumber)
          }),
          buttonLabel: I18n.t('close'),
        });
        break;

      case '4'://It looks like Mastercard \ndebit ...8856 is not a \nvalid debit card.
        this.setState({
          img: require('../../Components/Images/check-close.png'),
          title: I18n.t('Oops'),
          message: I18n.t('failLoginInToChaseBank', {
            'cardNumber': this.formatCardNumber(cardNumber)
          }),
          buttonLabel: I18n.t('tryAgain'),
        });
        break;

      case '5'://Congrats!You’ve successfully linked Mastercard debit •••8856 to your reduxsagait line. It is now available for all transactions.
        this.setState({
          img: require('../../Components/Images/check-mark-success.png'),
          title: I18n.t('congrats'),
          message: I18n.t('linkCardSuccess', {
            'cardNumber': this.formatCardNumber(cardNumber)
          }),
          buttonLabel: I18n.t('goDashBoard'),
        });
        break;

      default:
        this.setState({
          img: img || require('../../Components/Images/check-mark-success.png'),
          title: title,
          message: message,
          buttonLabel: buttonLabel,
        });
        break;

    }
  }

  formatCardNumber(cardNumber){
    cardNumber=''+cardNumber;
    console.log('cardNumber',cardNumber);
    return cardNumber.length>10? cardNumber.substr(cardNumber.length-4) :'';
  }

  onButtonPress() {
    const { type, value, onPress } = this.props.navigation.state.params;
    { onPress() }
    switch (type) {
      default:
        console.log('', this.state.buttonLabel);
        break;
    }
  }

  getMainPart = () => {
    const { img, title, message, buttonLabel } = this.state;
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <Image
          style={{
            width: DimensionManager.scale(168),
            height: DimensionManager.verticalScale(168),
            resizeMode: 'contain'
          }}
          source={img} />

        <Text style={[Fonts.style.h3BoldGT, { textAlign: 'center', color: Colors.transparent, marginTop: DimensionManager.verticalScale(63) }]}>
          {title}
        </Text>
        <Text style={[Fonts.style.textLightGT, { textAlign: 'center', color: Colors.transparent, marginTop: DimensionManager.verticalScale(9), width: DimensionManager.scale(275) }]}>
          {message}
        </Text>
        <TouchableOpacity
          style={{
            marginTop: DimensionManager.verticalScale(198),
            backgroundColor: Colors.reduxsagaGreen,
            width: DimensionManager.scale(335),
            height: DimensionManager.verticalScale(50),
            justifyContent: 'center',
          }}
          onPress={() => {
            this.onButtonPress();
          }}
        >
          <Text style={[Fonts.style.textBoldNormalGT, {
            alignSelf: 'center',
            color: Colors.transparent
          }]}>
            {buttonLabel}
          </Text></TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
        />
        <View style={styles.containerStyle}>
          {this.getMainPart()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  containerStyle: {
    marginTop: DimensionManager.verticalScale(24),
    marginLeft: DimensionManager.scale(34),
    marginRight: DimensionManager.scale(32)
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WithDrawalResponseView));
