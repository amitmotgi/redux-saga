import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../Themes/Colors';
import DimensionManager from '../../Themes/DimensionManager';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import i18n from '../../I18n';
import Fonts from '../../Themes/Fonts';
import TextFieldAmount from '../../Common/TextFieldAmount';
import { PageStyleConfig } from '../../Config/PageStyleConfig';
import CompleteTransferView from './CompleteTransferView';

class WithDrawreduxsagaitLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setUpAccount: false,
      chooseAccount: false,
      chooseAnotherAccount: true,
      isActive: false,
      accountDataList: [{ reduxsagaitNumber: '12345678', key: '111' }],
      amountValue: '78675.1234',
      isVisible: false
    };
  }

  textChoose = () => {
    const { setUpAccount, chooseAccount, chooseAnotherAccount } = this.state;
    return setUpAccount
      ? 'Set up account'
      : chooseAccount
        ? 'Choose an account'
        : chooseAnotherAccount
          ? 'Change debit card'
          : '';
  };
  // TODO ADD navigation logic
  navigationChoose = () => {
    const { navigation } = this.props;
    const { accountDataList, setUpAccount, chooseAccount, chooseAnotherAccount } = this.state;
    if (setUpAccount) {
      navigation.push('');
    }
    if (chooseAccount) {
      navigation.push('');
    }
    if (chooseAnotherAccount) {
      navigation.push('DistributionAccounts', {});
    }
  };

  renderChoose = () => {
    return (
      <View
        style={{
          height: DimensionManager.verticalScale(51),
          borderBottomWidth: 1,
          borderColor: Colors.reduxsagaExtraLine,
          paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
          }}
          onPress={this.navigationChoose}
        >
          <Text
            style={{
              ...Fonts.style.textBoldNormalGT,
              fontSize: 14,
              opacity: 1,
              fontWeight: '500',
              color: Colors.reduxsagaDarkBlue
            }}
          >
            {this.textChoose()}
          </Text>

          <Image
            style={{
              width: DimensionManager.scale(10),
              height: DimensionManager.verticalScale(10),
              resizeMode: 'contain'
            }}
            source={require('../Images/arrow.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderAccountTitle = () => {
    return (
      <View style={[styles.rectangleAccount, { borderTopWidth: 1 }]}>
        <Text
          style={{
            ...Fonts.style.textBoldNormalGT,
            fontSize: 12,
            opacity: 1,
            fontWeight: 'bold',
            color: Colors.reduxsagaSkyLightGray,
            letterSpacing: 1
          }}
        >
          TRANSFER TO ACCOUNT
        </Text>
      </View>
    );
  };
  renderChaseChecking = data => {
    const { key, reduxsagaitNumber } = data;
    return (
      <View key={key} style={[styles.rectangleAccount]}>
        <Text
          style={{
            ...Fonts.style.textMediumGT,
            opacity: 1,
            fontWeight: '500',
            color: Colors.reduxsagaDarkGray
          }}
        >
          {/*Chase checking*/}
          Mastercard debit
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              opacity: 1,
              fontWeight: '500',
              color: Colors.reduxsagaDarkGray,
              letterSpacing: 1,
              lineHeight: 30
            }}
          >
            ···
          </Text>
          <Text
            style={{
              ...Fonts.style.textMediumGT,
              opacity: 1,
              fontWeight: '500',
              color: Colors.reduxsagaBlack
            }}
          >
            {reduxsagaitNumber.slice(reduxsagaitNumber.length - 4)}
          </Text>
        </View>
      </View>
    );
  };
  renderAccount = () => {
    const { accountDataList, chooseAnotherAccount } = this.state;
    return (
      <View>
        {this.renderAccountTitle()}
        {chooseAnotherAccount ? accountDataList.map(i => this.renderChaseChecking(i)) : null}
        {this.renderChoose()}
      </View>
    );
  };

  renderHeaderContent = () => {
    const { amountValue } = this.state;
    return (
      <View
        style={{
          height: DimensionManager.verticalScale(185),
          alignItems: 'center',
          backgroundColor: Colors.reduxsagaExtraBlue
        }}
      >
        <Text
          style={{
            ...Fonts.style.textBoldNormalGT,
            fontSize: 16,
            opacity: 1,
            fontWeight: '500',
            color: Colors.reduxsagaDarkBlue,
            marginTop: DimensionManager.verticalScale(37)
          }}
        >
          Withdraw
        </Text>
        <TextFieldAmount
          defaultValue={amountValue}
          amountType={'$'}
          style={{
            color: Colors.reduxsagaDarkBlue
          }}
          onChangeText={data => {
            this.setState({ amountValue: data });
          }}
        />
        <Text
          style={{
            ...Fonts.style.textBoldNormalGT,
            fontSize: 16,
            opacity: 1,
            fontWeight: '500',
            lineHeight: 1.31 * 16,
            color: Colors.reduxsagaLightBlue,
            textAlign: 'center'
          }}
        >
           ${7500.00} limit
        </Text>
      </View>
    );
  };

  onPress = () => {
    this.setState({ isVisible: true });
  };
  renderButton = () => {
    const { isActive } = this.state;
    return (
      <View style={{ marginHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber) }}>
        <TouchableOpacity
          style={[
            styles.footerButton,
            { backgroundColor: isActive ? Colors.reduxsagaDarkBlue : Colors.reduxsagaDarkGray }
          ]}
          onPress={isActive ? this.onPress : null}
          activeOpacity={isActive ? 0.2 : 1}
        >
          <Text style={styles.footerButtonLabel}>Preview</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderContent = () => {
    return (
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View>
          {this.renderHeaderContent()}
          {this.renderAccount()}
        </View>
        {this.renderButton()}
      </View>
    );
  };
  onCancel = () => {
    this.setState(preState => ({ isVisible: !preState.isVisible }));
  };
  render() {
    const { isVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={'Withdraw and transfer'}
          stepValue={1}
          hideStep={true}
          hideMenu={false}
        />
        {this.renderContent()}
        <Modal isVisible={isVisible}>
          <CompleteTransferView onCancel={this.onCancel} />
        </Modal>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rectangleAccount: {
    height: DimensionManager.verticalScale(51),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),
    borderColor: Colors.reduxsagaExtraLine,
    borderBottomWidth: 1
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
  }
});
export default WithDrawreduxsagaitLine;
