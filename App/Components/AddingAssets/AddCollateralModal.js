import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Clipboard, } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import AnotherIcon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import {Share, Button} from 'react-native';

class AddCollateralModal extends Component {


  static propTypes={
    transferCurrency:PropTypes.string,
    transferCurrencyAddress:PropTypes.string,
    transferCurrencyUrl: PropTypes.oneOfType([PropTypes.object,PropTypes.number]),
    isVisible: PropTypes.bool,
    onCancel:PropTypes.func.isRequired
  }

  static defaultProps = {
    transferCurrency: '',
    transferCurrencyUrl: require('../Images/wallet.png'),
    transferCurrencyAddress: '',
    isVisible: false,
    onCancel: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      showAddress: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({showAddress:false});
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    // make sure showAddress initialize
    if (!isVisible) {
      this.state.showAddress = false;
    }
  }



  transferCurrencyView = () => {
    const { transferCurrency, transferCurrencyUrl } = this.props;
    return (
      <View style={styles.transferCurrencyView}>
        <View style={styles.transferCurrencyTitleView}>
          <Text style={styles.transferCurrencyTitleText}>
            Want to transfer {transferCurrency} from another wallet?
          </Text>
        </View>
        <View style={styles.transferCurrencyContent}>
          <Image style={styles.transferCurrencyContentImg} source={transferCurrencyUrl} />
          <Text style={styles.transferCurrencyContentSendText}>
            Only send {transferCurrency} to this address
          </Text>
          <Text style={styles.transferCurrencyContentSendNote}>
            Sending any other digital asset will result in permanent loss.
          </Text>
        </View>
        <View style={styles.transferCurrencyFooter}>
          <TouchableOpacity
            style={styles.transferCurrencyFooterButton}
            onPress={() => this.setState({ showAddress: true })}
          >
            <Text style={styles.transferCurrencyFooterButtonText}>Show Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  qrCodeView = val => {
    return (
      <View style={qrCodeStyle.qrCodeView}>
        <QRCode value={val} size={150} bgColor={Colors.reduxsagaBlack} fgColor={Colors.transparent} />
      </View>
    );
  }

  copyAddress = () => {
    // TODO add Toast
    const { transferCurrencyAddress } = this.props;
    Clipboard.setString(transferCurrencyAddress);
  }

   onShare = () => {
    const { transferCurrencyAddress } = this.props;
    try {
      const result = Share.share({
        message: 'this is my btnAddress:' + transferCurrencyAddress,
        title: 'title',
        url: 'url',
        subject: 'ios email title',
        dialogTitle: 'android dialogTitle',
      })
      if (result.action === Share.sharedAction) {//ios&Andorid
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {//ios only

      }
    } catch (error) {
      alert(error.message);
    }
  }

  showAddressViewPage = () => {
    const { transferCurrency, transferCurrencyAddress } = this.props;
    return (
      <View style={styles.addressView}>
        <View style={styles.transferCurrencyTitleView}>
          <Text style={styles.addressViewTitleText}>{transferCurrency} Address</Text>
        </View>
        <View style={styles.showAddressViewQRCode}>{this.qrCodeView(transferCurrencyAddress)}</View>
        <View style={styles.showAddressViewFooter}>
          <View style={styles.showAddressViewFooterFirstRow}>
            <Text numberOfLines={1} style={styles.showAddressViewFooterText}>
              {transferCurrencyAddress}
            </Text>
          </View>
          <View style={styles.showAddressViewFooterSecondRow}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={this.onShare}
            >
              {/*share-alt*/}
              <AnotherIcon name="share-alt" style={styles.footerButtonIcon}/>
              <Text style={styles.showAddressViewFooterText}>Share</Text>
            </TouchableOpacity>
            <View style={styles.cutOffRule} />
            <TouchableOpacity style={styles.footerButton} onPress={this.copyAddress}>
              <Icon name="copy" style={styles.footerButtonIcon} />
              <Text style={styles.showAddressViewFooterText}>Copy address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    // console.log('%c AddModal', 'color:red', this.props, this.state);
    const { isVisible, onCancel } = this.props;
    const { showAddress } = this.state;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          onBackdropPress={onCancel}
          onBackButtonPress={onCancel}
          style={styles.modalView}
        >
          {showAddress ? this.showAddressViewPage() : this.transferCurrencyView()}
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
  transferCurrencyView: {
    width: scale(296),
    height: verticalScale(327),
    backgroundColor: Colors.transparent
  },
  transferCurrencyTitleView: {
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.reduxsagaGray,
    borderBottomWidth: verticalScale(1)
  },
  transferCurrencyTitleText: {
    ...Fonts.style.textBoldNormalGT,
    textAlign:'center',
    width: scale(180),
    color: Colors.reduxsagaBlack
  },
  transferCurrencyContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  transferCurrencyContentImg: {
    marginTop: verticalScale(9),
    width: verticalScale(45),
    height: verticalScale(45),
    resizeMode: 'contain'
  },
  transferCurrencyContentSendText: {
    marginTop: verticalScale(14),
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack
  },
  transferCurrencyContentSendNote: {
    marginTop: verticalScale(25),
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack,
    textAlign: 'center',
    width: scale(233)
  },
  transferCurrencyFooter: {
    marginTop: verticalScale(30),
    flexDirection: 'column',
    alignItems: 'center'
  },
  transferCurrencyFooterButton: {
    height: verticalScale(45),
    width: scale(207),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  transferCurrencyFooterButtonText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  },
  addressView: {
    width: scale(296),
    height: verticalScale(370),
    backgroundColor: Colors.transparent
  },
  addressViewTitleText: {
    ...Fonts.style.textBoldNormalGT,
    textAlign: 'center',
    color: Colors.reduxsagaBlack
  },
  showAddressViewQRCode: {
    height: verticalScale(220),
    justifyContent: 'center',
    alignItems: 'center'
  },
  showAddressViewFooter: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  showAddressViewFooterFirstRow: {
    height: verticalScale(55),
    borderTopWidth: verticalScale(1),
    borderColor: Colors.reduxsagaGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showAddressViewFooterText: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack,
    opacity: 0.8
  },
  showAddressViewFooterSecondRow: {
    height: verticalScale(45),
    borderTopWidth: verticalScale(1),
    borderColor: Colors.reduxsagaGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerButton: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButtonIcon:{
    marginRight:scale(5),
    fontSize:Fonts.size.medium,
    /*
    * ===showAddressViewFooterText
    * */
    color: Colors.reduxsagaBlack,
    opacity: 0.8
  },
  cutOffRule: {
    width: scale(1),
    height: '100%',
    backgroundColor: Colors.reduxsagaBlack,
    opacity: 0.15
  }
});

const qrCodeStyle = StyleSheet.create({
  qrCodeView: {
    width: scale(170),
    height: scale(170),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: verticalScale(1),
    borderColor: Colors.reduxsagaGray,
    borderRadius: verticalScale(4),
    overflow:'hidden' // must add it, stop webView's white blank
  }
});

export default AddCollateralModal;
