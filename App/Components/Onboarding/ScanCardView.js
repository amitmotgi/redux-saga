import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation,   SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import I18n from '../../I18n';
import {  DimensionManager, Colors, Fonts } from '../../Themes';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import OnboardingActions from '../../Redux/Onboarding';
import PaymentActions from '../../Redux/Payment';

class ScanCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      cardNumber: null,
      cardPIN: null,
      expiryMonth: null,
      expiryYear: null,
      cardholderName: null,
      cardType: null,
      editing: false,
      addingCard: false,
      sawScanningScreen: false,
      showCardNumber: true
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
    const { onboarding, navigation } = this.props;
    const { dispatch } = navigation;
    const { debitCard = {} } = onboarding;
    this.setState({
      showCardNumber: debitCard && debitCard.cardNumber ? true : false
    });

    dispatch(PaymentActions.paymentGetKey({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken,
    }));
  }

  scanCard() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    CardIOModule
      .scanCard({
        hideCardIOLogo: true,
        usePaypalActionbarIcon: false,
        requireCardholderName: true,
        requirePostalCode: true,
        noCamera: !CardIOUtilities.CAN_READ_CARD_WITH_CAMERA,
      })
      .then(card => {
        // the scanned card
        console.log(' card >>>> ', card);

        dispatch(
          PaymentActions.paymentUpdate( {
            cardDetails: {
              cardType: cardBrandText,
              cardNumber: card.cardNumber,
              expiryYear: card.expiryYear,
              expiryMonth: card.expiryMonth,
              cardPIN: card.cvv,
              cardholderName: card.cardholderName,
              postalCode: card.postalCode
            }
        }));

        var cardBrandText = '';
        switch (card.cardType) {
          case 'Visa':
            cardBrandText = 'visa';
            break;
          case 'MasterCard':
            cardBrandText = 'mastercard';
            break;
          case 'American Express':
            cardBrandText = 'amex';
            break;
          case 'Discover':
            cardBrandText = 'discover';
            break;
          default:
            break;
        }

        this.setState({
          cardType: cardBrandText,
          cardNumber: card.cardNumber,
          expiryYear: card.expiryYear,
          expiryMonth: card.expiryMonth,
          cardPIN: card.cvv,
          cardholderName: card.cardholderName,
          postalCode: card.postalCode,
          sawScanningScreen: true,
        });

        dispatch(
          OnboardingActions.onboardingUpdate({
            debitCard: {
              cardType: cardBrandText,
              cardNumber: card.cardNumber,
              expiryYear: card.expiryYear,
              expiryMonth: card.expiryMonth,
              cardPIN: card.cvv,
              cardholderName: card.cardholderName,
              postalCode: card.postalCode
            }
          }));

        this.props.navigation.navigate('InputCardInfo');

      })
      .catch((err) => {
        // the user cancelled
        this.setState({
          sawScanningScreen: true,
        });
      })
  }

  handleConfirm = () => {

  }

  onTextRecognized = (event) => {
    //TODO:
    console.log(event);
  }

  getCard = () => {
    return (
      <View style={{
        width: '100%',
        height: DimensionManager.verticalScale(244),
        backgroundColor: '#ebf3ff',
        alignItems: 'center'
      }}>
        <Image
          style={{
            marginTop: DimensionManager.verticalScale(31),
            marginBottom: DimensionManager.verticalScale(29),
            width: DimensionManager.scale(184),
            height: DimensionManager.verticalScale(184),
            resizeMode: 'contain'
          }}
          source={require('../Images/debit-card.png')} />
        <Text
          style={[Fonts.style.textRegularNormalGT, {
            color: Colors.reduxsagaBlack,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(-94),
          }]}
        >
          {I18n.t('tipCard')}
        </Text>
      </View>
    );
  }
  formatCardNumber(cardNumber) {
    cardNumber = '' + cardNumber;
    console.log('cardNumber', cardNumber);
    return cardNumber.length > 10 ? cardNumber.substr(cardNumber.length - 4) : '';
  }
  getMainPart = () => {
    const { onboarding } = this.props;
    const { debitCard = {} } = onboarding;
    const { showCardNumber } = this.state;
    const scanCardMsg = (
      <View style={{
        paddingTop: DimensionManager.verticalScale(53),
        paddingBottom: DimensionManager.verticalScale(52),
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
        flexDirection: 'column',
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text
            style={[Fonts.style.textRegularNormalGT, {
              color: Colors.reduxsagaBlack,
              lineHeight: DimensionManager.verticalScale(24),
              letterSpacing: DimensionManager.scale(0.1),
              textAlign: 'center',
            }]}
          >
            {I18n.t('hold')}
          </Text>
          <Text
            //          style={[Fonts.style.textBoldNormalGT, {
            style={[Fonts.style.textRegularNormalGT, {
              color: Colors.reduxsagaBlack,
              lineHeight: DimensionManager.verticalScale(24),
              letterSpacing: DimensionManager.scale(0.1),
              textAlign: 'center',
            }]}
          >
            {I18n.t('frontCard')}
          </Text>
        </View>
        <Text
          style={[Fonts.style.textRegularNormalGT, {
            color: Colors.reduxsagaBlack,
            lineHeight: DimensionManager.verticalScale(24),
            letterSpacing: DimensionManager.scale(0.1),
            textAlign: 'center',
          }]}
        >
          {I18n.t('scanMsg')}
        </Text>
      </View>
    );
    const confirmButton = (
      <View style={{
        marginTop: DimensionManager.verticalScale(showCardNumber ? 212 : 147),
        marginBottom: DimensionManager.verticalScale(30),
        alignSelf: 'center',
        backgroundColor: Colors.transparent
      }}>
        <TouchableOpacityView
          active={true}
          label={I18n.t('confirmCardInfo')}
          onPress={() => {
            this.scanCard();

            // if (showCardNumber) {
            //   //this.props.navigation.goBack();
            // } else {
            //   //this.props.navigation.goBack();
            //   this.scanCard();
            // }
          }} />
      </View>
    );
    const cameraNotWorking = (
      <View>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaDarkGray,
          textAlign: 'center',
          lineHeight: DimensionManager.verticalScale(21),
        }]}>{I18n.t('cameraNotWorking')}</Text>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('InputCardInfo');
        }}>
          <Text
            style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaDarkBlue,
              textAlign: 'center',
              lineHeight: DimensionManager.verticalScale(21),
            }]}
          >
            {I18n.t('manualyInputCardInfo')}
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {this.getCard()}
        <View>
          {scanCardMsg}
          {/*showCardNumber ? null : scanCardMsg */}
          {/*showCardNumber ? null : cameraNotWorking*/}
          {/*showCardNumber ?
            <Text
              style={[Fonts.style.textRegularNormalGT, {
                color: Colors.reduxsagaBlack,
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(52)
              }]}
            >
              {I18n.t('tipCardLink', { cardNumber: this.formatCardNumber(debitCard.cardNumber) })}
            </Text>
            : null
          */}
          {confirmButton}
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideBackBtn={false}
          hideStep={true}
          hideBackBtn={this.state.context === 'BURGER'}
          style={{
            marginTop: DimensionManager.verticalScale(-7),
          }}
          title={I18n.t('scanYourCard')} />

        {this.getMainPart()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  preview: {
    height: DimensionManager.verticalScale(248),
  },
  image: {
    marginLeft: DimensionManager.scale(40),
    marginRight: DimensionManager.scale(40),
    marginTop: DimensionManager.verticalScale(32),
    marginBottom: DimensionManager.verticalScale(32),
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ScanCardView));
