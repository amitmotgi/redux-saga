import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import Colors from '../../Themes/Colors';
import DimensionManager from '../../Themes/DimensionManager';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import i18n from '../../I18n';
import Fonts from '../../Themes/Fonts';
import { PageStyleConfig } from '../../Config/PageStyleConfig';

class DistributionAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDataList: [
        { reduxsagaitNumber: '12345678', key: '111', name: 'Visa debit', image: '' },
        { reduxsagaitNumber: '12345677', key: '112', name: 'Mastercard debit', image: '' },
        { reduxsagaitNumber: '12345676', key: '113', name: 'Charles Schwab debit', image: '' }
      ]
    };
  }

  renderAccountTitle = () => {
    return (
      <View
        style={[
          styles.rectangleAccountTouch,
          styles.rectangleAccountView,
          {
            alignItems: 'flex-start',
            paddingTop: DimensionManager.verticalScale(38)
          }
        ]}
      >
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
          CHOOSE ANOTHER ACCOUNT
        </Text>
      </View>
    );
  };
  renderOvalImage = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.ovalImage} source={require('../Images/oval.png')} />
        <Image style={styles.ovalImage} source={require('../Images/oval.png')} />
        <Image style={styles.ovalImage} source={require('../Images/oval.png')} />
      </View>
    );
  };
  // TODO Add  click "account" logic
  renderSingleAccount = data => {
    const { key, reduxsagaitNumber, image, name } = data;
    return (
      <View key={key} style={styles.rectangleAccountView}>
        <TouchableOpacity style={styles.rectangleAccountTouch} onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={image} style={styles.image} />
            <View
              style={{ marginLeft: DimensionManager.scale(9), width: DimensionManager.scale(112) }}
            >
              <Text
                style={{
                  ...Fonts.style.textMediumGT,
                  opacity: 1,
                  fontWeight: '500',
                  color: Colors.reduxsagaDarkGray
                }}
              >
                {name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.renderOvalImage()}
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
        </TouchableOpacity>
      </View>
    );
  };
  // TODO Add click "add account" button logic
  renderAddAccountRect = () => {
    return (
      <View style={styles.rectangleAccountView}>
        <TouchableOpacity style={styles.rectangleAccountTouch} onPress={() => {}}>
          <Text
            style={{
              ...Fonts.style.textBoldNormalGT,
              fontSize: 14,
              opacity: 1,
              fontWeight: '500',
              color: Colors.reduxsagaDarkBlue
            }}
          >
            Add account
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
  renderAccount = () => {
    const { accountDataList } = this.state;
    return (
      <ScrollView>
        <View>
          {this.renderAccountTitle()}
          {accountDataList.map(i => this.renderSingleAccount(i))}
          {this.renderAddAccountRect()}
        </View>
      </ScrollView>
    );
  };

  renderContent = () => {
    return <View style={{ flex: 1 }}>{this.renderAccount()}</View>;
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={'Accounts'}
          stepValue={1}
          hideStep={true}
          hideMenu={false}
        />
        {this.renderContent()}
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
  rectangleAccountView: {
    height: DimensionManager.verticalScale(70),
    borderBottomWidth: 1,
    borderColor: Colors.reduxsagaExtraLine,
    paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber)
  },
  rectangleAccountTouch: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: Colors.reduxsagaDarkGray,
    height: DimensionManager.verticalScale(45),
    width: DimensionManager.scale(67)
  },
  ovalImage: {
    width: DimensionManager.scale(4),
    height: DimensionManager.verticalScale(4),
    resizeMode: 'contain',
    marginRight: DimensionManager.scale(4)
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
export default DistributionAccounts;
