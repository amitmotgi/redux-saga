import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import { toFormatCurrency, toFormatNumber } from '../../Utils/CurrencyUtils';

class ReceiveCoinStatusModal extends Component {

  static propTypes = {
    currencyName: PropTypes.string,
    currencyUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    currencyAmountDollar: PropTypes.number,
    currencyAmount: PropTypes.number,
    isVisible: PropTypes.bool,
    receiveCoinStatus: PropTypes.string,
    onCancel: PropTypes.func.isRequired
  }

  static defaultProps = {
    currencyName: 'BTC',
    currencyUrl: require('../Images/wallet.png'),
    currencyAmountDollar: 500000,
    currencyAmount: 23.22,
    isVisible: false,
    receiveCoinStatus: 'receiving',
    onCancel: () => {}
  }

  constructor(props) {
    super(props);
  }

  commonNoteView = () => {
    const { currencyName, currencyAmount, currencyAmountDollar } = this.props;
    return (
      <View style={styles.receiveCurrencyContentNoteView}>
        <Text style={styles.receiveCurrencyContentNote}>From coinbase to reduxsaga</Text>
        <Text style={styles.receiveCurrencyContentNote}>
          Amount: {toFormatCurrency({ val: currencyAmountDollar })}
        </Text>
        <Text style={styles.receiveCurrencyContentNote}>
          ({toFormatNumber({ val: currencyAmount })} {currencyName})
        </Text>
      </View>
    );
  }

  receivingView = () => {
    const { currencyUrl, onCancel } = this.props;
    return (
      <View style={styles.receiveCurrencyView}>
        <View style={styles.receiveCurrencyTitleView}>
          <Text style={styles.receiveCurrencyTitleText}>Receiving Crypto from CoinBase!</Text>
        </View>
        <View style={styles.receiveCurrencyContent}>
          <Image style={styles.receiveCurrencyContentImg} source={currencyUrl} />
          <Text style={styles.receiveCurrencyContentText}>
            The transaction is pending! You will receive it in 24hrs.
          </Text>
          {this.commonNoteView()}
        </View>
        <View style={styles.receiveCurrencyFooter}>
          <TouchableOpacity style={styles.receiveCurrencyFooterButton} onPress={onCancel}>
            <Text style={styles.receiveCurrencyFooterButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  receivedView = () => {
    const { currencyName, currencyUrl, onCancel } = this.props;
    return (
      <View style={styles.receiveCurrencyView}>
        <View style={styles.receiveCurrencyTitleView}>
          <Text style={styles.receiveCurrencyTitleText}>{currencyName} Received</Text>
        </View>
        <View style={styles.receiveCurrencyContent}>
          <Image style={styles.receiveCurrencyContentImg} source={currencyUrl} />
          <Text style={styles.receiveCurrencyContentText}>
            You just received {currencyName} crypto from coinbase. It has been added to your BTC
            wallet.
          </Text>
          {this.commonNoteView()}
        </View>
        <View style={styles.receiveCurrencyFooter}>
          <TouchableOpacity style={styles.receiveCurrencyFooterButton} onPress={onCancel}>
            <Text style={styles.receiveCurrencyFooterButtonText}>Continue with C-Loc</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    // console.log('%c receiveCoinModal', 'color:red', this.props, this.state);
    const { isVisible, onCancel, receiveCoinStatus } = this.props;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          onBackdropPress={onCancel}
          onBackButtonPress={onCancel}
          style={styles.modalView}
        >
          {receiveCoinStatus === 'receiving' ? this.receivingView() : this.receivedView()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  receiveCurrencyView: {
    width: scale(296),
    height: verticalScale(335),
    backgroundColor: Colors.transparent
  },
  receiveCurrencyTitleView: {
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.reduxsagaGray,
    borderBottomWidth: verticalScale(1)
  },
  receiveCurrencyTitleText: {
    ...Fonts.style.textBoldNormalGT,
    width: scale(186),
    textAlign: 'center',
    color: Colors.reduxsagaBlack
  },
  receiveCurrencyContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  receiveCurrencyContentImg: {
    marginTop: verticalScale(9),
    width: verticalScale(45),
    height: verticalScale(45),
    resizeMode: 'contain'
  },
  receiveCurrencyContentText: {
    width: scale(214),
    marginTop: verticalScale(15),
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.reduxsagaBlack
  },
  receiveCurrencyContentNoteView: {
    marginTop: verticalScale(25)
  },
  receiveCurrencyContentNote: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack,
    textAlign: 'center'
  },
  receiveCurrencyFooter: {
    marginTop: verticalScale(20),
    flexDirection: 'column',
    alignItems: 'center'
  },
  receiveCurrencyFooterButton: {
    height: verticalScale(45),
    width: scale(207),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  receiveCurrencyFooterButtonText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  }
});

export default ReceiveCoinStatusModal;
