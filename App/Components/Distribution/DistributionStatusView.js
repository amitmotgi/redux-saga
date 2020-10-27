import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import DimensionManager from '../../Themes/DimensionManager';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import i18n from '../../I18n';
import { PageStyleConfig } from '../../Config/PageStyleConfig';

class DistributionStatusView extends Component {
  constructor(props) {
    super(props);
    // TODO get the debit data from this.props,
    this.state = {
      debit: '1234567890'
    };
  }
  buttonOnPress = type => () => {
    const { navigation } = this.props;
    navigation.push('Dashboard');
  };

  renderSucceedView = () => {
    const { debit } = this.state;
    return (
      <View style={styles.commonView}>
        <View>
          <Image
            style={{
              marginTop: DimensionManager.verticalScale(23),
              width: DimensionManager.scale(168),
              height: DimensionManager.verticalScale(168),
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
            source={require('./Images/surpriose-icon.png')}
          />
          <Text
            style={{
              ...Fonts.style.h3BoldGT,
              fontWeight: '500',
              fontSize: 32,
              lineHeight: 1.38 * 32,
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(65),
              width: DimensionManager.scale(285)
            }}
          >
            That{"'"}s it!
          </Text>
          <Text
            style={{
              ...Fonts.style.textRegularGT,
              fontWeight: 'normal',
              fontSize: 18,
              lineHeight: 1.44 * 18,
              opacity: 1,
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(5),
              width: DimensionManager.scale(285)
            }}
          >
            You’ve just transfered funds from your reduxsagait line to your Mastercard debit •••
            {debit.slice(debit.length - 4)}.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),
            marginBottom: DimensionManager.verticalScale(7)
          }}
        >
          <TouchableOpacity style={styles.footerButton} onPress={this.buttonOnPress('success')}>
            <Text style={styles.footerButtonLabel}>Go to dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderSorryView = () => {
    const { debit } = this.state;
    return (
      <View style={styles.commonView}>
        <View>
          <Image
            style={{
              marginTop: DimensionManager.verticalScale(23),
              width: DimensionManager.scale(168),
              height: DimensionManager.verticalScale(168),
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
            source={require('./Images/surpriose-icon.png')}
          />
          <Text
            style={{
              ...Fonts.style.h3BoldGT,
              fontWeight: '500',
              fontSize: 32,
              lineHeight: 1.38 * 32,
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(65),
              width: DimensionManager.scale(285)
            }}
          >
            We’re sorry!
          </Text>
          <Text
            style={{
              ...Fonts.style.textRegularGT,
              fontWeight: 'normal',
              fontSize: 18,
              lineHeight: 1.44 * 18,
              opacity: 1,
              color: Colors.transparent,
              textAlign: 'center',
              marginTop: DimensionManager.verticalScale(5),
              width: DimensionManager.scale(285)
            }}
          >
            Your transfer from your crredit line to Mastercard debit •••{' '}
            {debit.slice(debit.length - 4)} did not go through. Please ensure your account is
            up-to-date.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),
            marginBottom: DimensionManager.verticalScale(7)
          }}
        >
          <TouchableOpacity style={styles.footerButton} onPress={this.buttonOnPress('sorry')}>
            <Text style={styles.footerButtonLabel}>Go to dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    const { navigation = {} } = this.props;
    const { state = {} } = navigation;
    const { params = {} } = state;
    const { type = 'succeed' } = params;
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView hideNextBtn={true} title={''} stepValue={1} hideStep={true} />
        {type === 'succeed'
          ? this.renderSucceedView()
          : type === 'sorry'
            ? this.renderSorryView()
            : this.renderSucceedView()}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  commonView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  footerButton: {
    width: '100%',
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaGreen,
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

export default DistributionStatusView;
