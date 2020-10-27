import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from '../../I18n';
import { DimensionManager, Colors, Fonts } from '../../Themes';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import WithdrawActions from '../../Redux/Withdraw';
import PaymentActions from '../../Redux/Payment';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import CheckBox from 'react-native-checkbox';
import forge from 'node-forge';

class InputCardInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isNameFocus: false,
      cardNumber: '',
      isCardNumberFocus: false,
      mmyy: '',
      isMnyyFocus: false,
      state: '',
      isStateFocus: false,
      zipCode: '',
      isZipCodeFocus: false,
      stree: '',
      isStreeFocus: false,
      streeNO: '',
      isStreeNoFocus: false,
      city: '',
      isCityFoucus: false,
      cardType: '',
      checked: false
    };

  }

  componentWillMount() {
    const { onboarding, navigation } = this.props;
    const { dispatch } = navigation;
    const { debitCard = {} } = onboarding;
    this.setState({
      name: debitCard.cardholderName,
      cardNumber: debitCard.cardNumber,
      mmyy: (debitCard && debitCard.expiryMonth && debitCard.expiryYear && (debitCard.expiryMonth + '/' + debitCard.expiryYear) || '' || ''),
      state: debitCard.state,
      zipCode: debitCard.postalCode,
      stree: debitCard.stree,
      streeNO: debitCard.streeNO,
      city: debitCard.city,
      cardType: debitCard.cardType,
    });

    dispatch(PaymentActions.paymentGetKey({
      uuid: this.props.user.uuid,
      jToken: this.props.user.jToken,
    }));

  }

  getLabelStyle = (value = '', isFocus = false) => {
    return [styles.label, value && styles.notEmpty, isFocus && styles.labelFoucus];
  }

  getBorderColorStyle = (isFocus) => {
    return isFocus ? Colors.reduxsagaActiveBlue : Colors.reduxsagaExtraLine;
  }

  onZipCodeFocus = () => {
    this.setState({
      isZipCodeFocus: true,
    });
  }

  onZipCodeBlur = () => {
    this.setState({
      isZipCodeFocus: false,
    });
  }

  onStateFocus = () => {
    this.setState({
      isStateFocus: true,
    });
  }
  onStateBlur = () => {
    this.setState({
      isStateFocus: false,
    });
  }

  onMmyyFocus = () => {
    this.setState({
      isMmyyFocus: true,
    });
  }

  onMmyyBlur = () => {
    this.setState({
      isMmyyFocus: false,
    });
  }

  onNameFocus = () => {
    this.setState({
      isNameFocus: true,
    });
  }

  onNameBlur = () => {
    this.setState({
      isNameFocus: false,
    });
  }

  onStreeFocus = () => {
    this.setState({
      isStreeFocus: true,
    });
  }

  onStreeBlur = () => {
    this.setState({
      isStreeFocus: false,
    });
  }

  onStreeNoFocus = () => {
    this.setState({
      isStreeNoFocus: true,
    });
  }

  onStreeNoBlur = () => {
    this.setState({
      isStreeNoFocus: false,
    });
  }

  onCityFocus = () => {
    this.setState({
      isCityFoucus: true,
    });
  }

  onCityBlur = () => {
    this.setState({
      isCityFoucus: false,
    });
  }

  onCardNumberFocus = () => {
    this.setState({
      isCardNumberFocus: true
    });
  }

  onCardNumberBlur = () => {
    this.setState({
      isCardNumberFocus: false
    });
  }

  renderCardAdded() {
    const { payment } = this.props;
    const cardAddStatus = payment.cardAddStatus || '';

    if (cardAddStatus === 'added') {
      this.props.navigation.navigate('WithDrawTransfer');
    } else if (cardAddStatus === 'notadded') {

    }

  }

  getMainPart = () => {
    const { onboarding, navigation } = this.props;
    const { debitCard = {} } = onboarding;
    const { dispatch } = navigation;
    const {
      name,
      isNameFocus,
      cardNumber,
      isCardNumberFocus,
      mmyy,
      isMmyyFocus,
      state,
      isStateFocus,
      zipCode,
      isZipCodeFocus,
      stree,
      isStreeFocus,
      streeNO,
      isStreeNoFocus,
      city,
      isCityFoucus,
    } = this.state;
    const isButtonActive = name && cardNumber && stree && streeNO && city && mmyy && state && zipCode;

    this.renderCardAdded();

    const namePart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(52)
      }}>
        <Text style={this.getLabelStyle(name, isNameFocus)}>
          {I18n.t('fullName')}
        </Text>
        <TextField
          placeholder={I18n.t('bankLinkingNameEx')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ name: text });
            console.log('state', this.state);
            console.log('state', this.onboarding + ':' + this.debitCard);
          }}
          borderColor={this.getBorderColorStyle(isNameFocus)}
          onFocus={this.onNameFocus}
          onBlur={this.onNameBlur}
          value={name}
        />
      </View>
    );
    const numberPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(52)
      }}>
        <Text style={this.getLabelStyle(cardNumber, isCardNumberFocus)}>
          {I18n.t('cardNumber')}
        </Text>
        <View style={{
          //marginTop: DimensionManager.verticalScale(100)
        }}>
          <TextField
            placeholder={I18n.t('cardNumberHint')}
            secureTextEntry={false}
            onChangeText={(text) => {
              this.setState({ cardNumber: text });
            }}
            borderColor={this.getBorderColorStyle(isCardNumberFocus)}
            onFocus={this.onCardNumberFocus}
            onBlur={this.onCardNumberBlur}
            value={cardNumber}
          />
        </View>
      </View>
    );
    const expirateDatePart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(52)
      }}>
        <Text style={this.getLabelStyle(mmyy, isMmyyFocus)}>
          {I18n.t('mmyyLabel')}
        </Text>
        <TextField
          placeholder={I18n.t('mmyyHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ mmyy: text });
          }}
          borderColor={this.getBorderColorStyle(isMmyyFocus)}
          onFocus={this.onMmyyFocus}
          onBlur={this.onMmyyBlur}
          value={mmyy}
        />
      </View>
    );

    const streetPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(52)
      }}>
        <Text style={this.getLabelStyle(stree, isStreeFocus)}>
          {I18n.t('streetAddresslabe')}
        </Text>
        <TextField
          placeholder={I18n.t('streetAddressHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ stree: text });
          }}
          borderColor={this.getBorderColorStyle(isStreeFocus)}
          onFocus={this.onStreeFocus}
          onBlur={this.onStreeBlur}
          value={stree}
        />
      </View>
    );

    const streetNopart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(46)
      }}>
        <Text style={this.getLabelStyle(streeNO, isStreeNoFocus)}>
          {I18n.t('streeNolabel')}
        </Text>
        <TextField
          placeholder={I18n.t('streeNoHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ streeNO: text });
          }}
          borderColor={this.getBorderColorStyle(isStreeNoFocus)}
          onFocus={this.onStreeNoFocus}
          onBlur={this.onStreeNoBlur}
          value={streeNO}
        />
      </View>
    );

    const cityPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(46)
      }}>
        <Text style={this.getLabelStyle(city, isCityFoucus)}>
          {I18n.t('citylabel')}
        </Text>
        <TextField
          placeholder={I18n.t('cityHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ city: text });

          }}
          borderColor={this.getBorderColorStyle(isCityFoucus)}
          onFocus={this.onCityFocus}
          onBlur={this.onCityBlur}
          value={city}
        />
      </View>
    );

    const infoPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(46),
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View style={{
          width: DimensionManager.verticalScale(157)
        }}>
          <Text style={this.getLabelStyle(state, isStateFocus)}>
            {I18n.t('stateLabel')}
          </Text>
          <TextField
            placeholder={I18n.t('stateHint')}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ state: text });
            }}
            borderColor={this.getBorderColorStyle(isStateFocus)}
            onFocus={this.onStateFocus}
            onBlur={this.onStateBlur}
            value={state}
          />
        </View>
        <View style={{
          width: DimensionManager.verticalScale(157)
        }}>
          <Text style={this.getLabelStyle(zipCode, isZipCodeFocus)}>
            {I18n.t('zipCodelabel')}
          </Text>
          <TextField
            placeholder={I18n.t('zipCodeHint')}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ zipCode: text }); console.log('state', this.state + '\n' + this.debitCard);
            }}
            borderColor={this.getBorderColorStyle(isZipCodeFocus)}
            onFocus={this.onZipCodeFocus}
            onBlur={this.onZipCodeBlur}
            value={zipCode}
          />
        </View>
      </View>
    );

    const buttonPart = (
      <View
        style={{
          // marginTop: DimensionManager.verticalScale(42),
          alignSelf: 'center'
        }}
      >
        <View style={{
          flexDirection: 'column',
          height: DimensionManager.verticalScale(74),

        }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: DimensionManager.verticalScale(32),
            }}
          >
            <CheckBox
              checkedImage={require('../Images/check-mark.png')}
              uncheckedImage={require('../Images/check-box.png')}
              checkboxStyle={{
                borderColor: Colors.transparent,
                backgroundColor: Colors.reduxsagaDarkBlue,
                height: DimensionManager.verticalScale(16),
                width: DimensionManager.scale(16)
              }}
              label={''}
              labelStyle={[Fonts.style.textMediumGT,{ marginLeft: DimensionManager.scale(2)}]}
              checked={this.state.checked}
              onChange={() => this.setState({ checked: !this.state.checked })}
            />
            <TouchableOpacity
              style={{
              }}
              onPress={() => {
                this.setState({ checked: !this.state.checked });
              }}
            >
              <View style={{
                flexDirection: 'column',
                width: DimensionManager.scale(302),
                marginLeft: DimensionManager.scale(9),
                marginTop: DimensionManager.verticalScale(-4),
              }}>
                <Text
                  style={[
                    Fonts.style.textMediumGT,
                    {
                      opacity: 1,
                      color: Colors.reduxsagaBlack,
                      fontWeight: '500',
                      fontSize: DimensionManager.scale(14),
                      alignSelf: 'flex-start',
                      lineHeight: DimensionManager.verticalScale(22)
                    }
                  ]}
                >
                  Sign up for autopayment
                </Text>

                <Text
                  style={[
                    Fonts.style.textMediumGT,
                    {
                      opacity: 1,
                      color: '#9ba5b6',
                      fontWeight: 'normal',
                      justifyContent: 'flex-start',
                      fontSize: DimensionManager.scale(14),
                      alignSelf: 'flex-start',
                      lineHeight: DimensionManager.verticalScale(22)
                    }
                  ]}
                >
                  The easiest way to stay current with your payments and avoid late fees.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        <TouchableOpacityView
          style={{
            marginTop: DimensionManager.verticalScale(56.1)
          }}
          invertColor={false}
          active={isButtonActive}
          label={I18n.t('continue')}
          onPress={() => {
            var last4Digits = '', final4Digits = [], name = '', cvv = null;
            var expiry = this.state.mmyy && this.state.mmyy.split('/');
            // console.log(" expiry >> ", expiry);

            var expiryMonth = expiry[0] < 10 ? '0' + expiry[0].toString() : expiry[0].toString();
            var expiryYear = expiry[1].toString();

            var key = this.props.payment.keyData && this.props.payment.keyData.key || '';
            var cardKeyNew = this.props.payment.cardDetails.cardNumber + "|" +
            expiryYear + expiryMonth + "|" +
            this.props.payment.cardDetails.cardPIN;

            var n = new forge.jsbn.BigInteger(this.props.payment.keyData.key_modulus);
            var e = new forge.jsbn.BigInteger(this.props.payment.keyData.key_exponent);
console.log(" n == >> ", n);
console.log(" e == >> ", e);
console.log(" forge == >> ", forge);

            var publicKey = forge.rsa.setPublicKey(n, e);

            var encryptedKeyData = publicKey.encrypt(cardKeyNew , 'RSA-OAEP', {
              md: forge.md.sha256.create(),
              mgf1: {
                md: forge.md.sha1.create()
              }
            });

            var encryptedCardData = forge.util.encodeUtf8(encryptedKeyData);
            encryptedCardData = forge.util.encode64(encryptedKeyData);

            cvv = this.props.payment && this.props.payment.cardDetails &&
              this.props.payment.cardDetails.cardPIN || '';

            dispatch(
              WithdrawActions.withDrawUpdate({
                debitCard: {
                  cardType: debitCard.cardType,
                  cardholderName: this.state.name || debitCard.cardholderName,
                  cardNumber: this.state.cardNumber || debitCard.cardNumber,
                  stree: this.state.stree || debitCard.stree,
                  streeNO: this.state.streeNO || debitCard.streeNO,
                  city: this.state.city || debitCard.city,
                  state: this.state.state || debitCard.state,
                  mmyy: this.state.mmyy || debitCard.mmyy,
                  expiryMonth: expiry[0] || 0,
                  expiryYear: expiry[1] || 0,
                  postalCode: this.state.zipCode || debitCard.postalCode,
                }
              }));

              last4Digits = cardNumber.toString();
              for (var idx = 0; idx < last4Digits.length; idx++) {
                if (idx > 11) {
                  final4Digits.push(last4Digits[idx]);
                }
              }
              final4Digits = parseInt(final4Digits.join([]));

              name = this.state.name && this.state.name.split(' ') || [];

console.log("InputCard -- encryptedCardData >>> ", encryptedCardData);

              dispatch(PaymentActions.paymentAddCards({
                payload: {
                  expiry_date: expiryMonth + '/' + expiryYear || '',
                  last_four_digits: final4Digits.toString(),
                  card_hash: 'xxx',
                  data: encryptedCardData,
                  data_plain: cardKeyNew,
                  key_id: this.props.payment.keyData && this.props.payment.keyData.key_id || '',
                  auto_enrollment: this.state.checked,
                  name: {
                    first: name[0] || '',
                    last: name[1] || ''
                  },
                  address: {
                    line1: this.state.stree || '',
                    line2: this.state.streeNO || '',
                    city: this.state.city  || '',
                    state: this.state.state || '',
                    zipcode: this.state.zipCode || ''
                  }
                },
                uuid: this.props.user.uuid,
                jToken: this.props.user.jToken
              }));

          }}
        />

      </View>
    );
    return (
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid={true}
        extraScrollHeight={DimensionManager.verticalScale(100)}
      >
        <View style={{
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
        }}>
          <Text
            style={[Fonts.style.textRegularNormalGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              marginTop: DimensionManager.verticalScale(33)
            }]}
          >
            {this.props.debitCard ? I18n.t('tipNeedAddress') : I18n.t('tipManually')}
          </Text>
          {namePart}
          {numberPart}
          {expirateDatePart}
          {streetPart}
          {streetNopart}
          {cityPart}
          {infoPart}
          {buttonPart}
        </View>
      </KeyboardAwareScrollView>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
          title={I18n.t('inputCardInfo')} />
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
  label: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaSkyLightGray,
    fontSize: DimensionManager.scale(12),
    fontWeight: 'bold',
    letterSpacing: DimensionManager.scale(1)
  },
  notEmpty: {
    opacity: 1,
  },
  labelFoucus: {
    color: Colors.reduxsagaActiveBlue,
    opacity: 1,
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(InputCardInfoView));
