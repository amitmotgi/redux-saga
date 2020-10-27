import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';
import ModalView from '../../Common/ModalView';

class AddCollateralView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanValue: 2000,
      interestValue: 1400,
      showBuy: false,
      showAddToWalletModal: false
    };
  }

  header(loc) {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        textAlign: 'center',
        marginTop: DimensionManager.verticalScale(16)
      }]}>
        {loc ? I18n.t('lineofreduxsagait') : I18n.t('collateralRequired')}
      </Text>
    );
  }


  renderCLOCValue(value, underline) {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(10)
      }}>
        <View style={{
          alignSelf: 'center'
        }}>
          <CurrencyView
            minimumFractionDigits={0}
            size={'medium'}
            style={[Fonts.style.largeTextBold, {
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: Colors.reduxsagaBlack,
            }]}
            currencyType={'USD'}
            currencyValue={value}
          />
        </View>
        {underline ? (
          <View style={{
            borderWidth: 0.5,
            borderColor: Colors.transparent,
            borderBottomColor: Colors.reduxsagaBlack,
            marginBottom: DimensionManager.verticalScale(7),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.scale(13),

          }} />
        ) : null}
      </View>
    );
  }

  renderTotalCollateralHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        height: DimensionManager.verticalScale(32),
        backgroundColor: Colors.reduxsagaSkyBlue,
        marginTop: DimensionManager.verticalScale(20),
        alignItems: 'center'
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          fontWeight: 'bold',
          marginLeft: DimensionManager.scale(20),
        }]}>{I18n.t('totalCollateralValue')}</Text>

        <CurrencyView
          minimumFractionDigits={2}
          size={'medium'}
          style={[Fonts.style.textMediumGT, {
            width: '60%',
            marginRight: DimensionManager.scale(20),
            textAlign: 'right',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: Colors.reduxsagaBlack,
          }]}
          currencyType={'USD'}
          currencyValue={3478480.00}
        />

      </View>
    );
  }

  renderAddToWallet() {
    return (
      <View>
        <ModalView
          showQRCode={true}
          addressQRCode={'3Hodshkfehfdslfgjkdshge3289hnfdjk32g'}
          showAddressBtn={true}
          isVisible={this.state.showAddToWalletModal}
          title={I18n.t('yourTokenAddress')}
          showTitleUnderline={true}
          onPress={() => this.setState({showAddToWalletModal: false})}
        />
      </View>
    );
  }

  renderAssets(coin, value, underline) {
    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: Colors.reduxsagaOffWhite,
        paddingTop: DimensionManager.verticalScale(12),
      }}>
        <View style={{
          flexDirection: 'row',
          paddingLeft: DimensionManager.scale(20),
        }}>
          <View>
            <Image
              style={{
                resizeMode: 'contain',
                width: DimensionManager.scale(20),
                height: DimensionManager.verticalScale(20),
                paddingLeft: DimensionManager.scale(20),
              }}
              source={require('../Images/lba-icon.png')} />
          </View>

          <View>
            <Text style={[Fonts.style.textMediumLightGT, {
              width: DimensionManager.scale(100),
              color: Colors.reduxsagaBack,
              marginLeft: DimensionManager.scale(20),
              textAlign: 'left'
            }]}>{coin} Wallet</Text>
          </View>

          <View style={{
            flex: 1,
            marginRight: DimensionManager.scale(20),
          }}>

            <CurrencyView
              minimumFractionDigits={2}
              size={'medium'}
              style={[Fonts.style.textRegularNormalGT, {
                width: '70%',
                color: Colors.reduxsagaBack,
                textAlign: 'right',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                marginLeft: DimensionManager.scale(52)
              }]}
              currencyType={'USD'}
              currencyValue={value}
            />

          </View>
        </View>

        <View style={{
          flexDirection: 'row',
        }}>
          {this.state.showAddToWalletModal ? (this.renderAddToWallet()) : null}
          <TouchableOpacity
            style={{
              width: DimensionManager.scale(100),
              height: DimensionManager.verticalScale(35),
              backgroundColor: Colors.reduxsagaBlue,
              justifyContent: 'center',
              marginLeft: DimensionManager.scale(20),
              marginTop: DimensionManager.verticalScale(12),
              marginBottom: DimensionManager.verticalScale(23),
            }}
            onPress={() => {
              this.setState({showAddToWalletModal: true });
            }}>
            <Text style={[Fonts.style.inputBoldGT,{
              textAlign: 'center',
              color: Colors.transparent,
              fontSize: DimensionManager.scale(12)
            }]}>
              {I18n.t('addToWallet')}
            </Text>
          </TouchableOpacity>

          <View style={{
            flex:1,
            flexDirection: 'column',
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.verticalScale(4)
          }}>
            <Text style={[Fonts.style.textMediumLightGT, {
              textAlign: 'right',
              fontWeight: 'normal',
              opacity: 0.4
            }]}>
              12.45678958 {coin}
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: DimensionManager.verticalScale(4)
            }}>
              <CurrencyView
                minimumFractionDigits={2}
                size={'medium'}
                style={[Fonts.style.textMediumLightGT, {
                  color: Colors.reduxsagaBack,
                  textAlign: 'right',
                  textDecorationLine: 'underline',
                  fontWeight: 'normal',
                }]}
                currencyType={'USD'}
                currencyValue={500000}
              />
              <Text style={[Fonts.style.textMediumLightGT, {
                textAlign: 'right',
                fontWeight: 'normal',
                opacity: 0.4
              }]}>
                {'\b '}Available
              </Text>
            </View>
          </View>

        </View>

        {underline ? (
          <View style={{
            borderWidth: 0.5,
            borderColor: Colors.transparent,
            borderBottomColor: Colors.reduxsagaBlack,
            marginBottom: DimensionManager.verticalScale(7),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
          }} />
        ) : null}


      </View>
    );
  }


  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={false}
          title={I18n.t('addCollateral')}
          stepValue={2} />

        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraScrollHeight={DimensionManager.verticalScale(40)}>
          {this.header(true)}
          {this.renderCLOCValue(80000, true)}

          {this.header(false)}
          {this.renderCLOCValue(200000, false)}

          <Text style={[Fonts.style.textBoldGT, {
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(20),
            marginLeft: DimensionManager.scale(50),
            marginRight: DimensionManager.scale(50),
          }]}>
            {I18n.t('howDoYouWantToDistribute')}
          </Text>

          {this.renderTotalCollateralHeader()}

          <View>
            {this.renderAssets('LBA', 200000, true)}
            {this.renderAssets('ETH', 270000, false)}
          </View>

          <View style={{
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(36),
            backgroundColor: Colors.transparent
          }}>
            <TouchableOpacityView
              active={true}
              label={I18n.t('confirmCollateral') + ' >'}
              onPress={() => this.props.navigation.navigate('ReviewCollateral')} />
          </View>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddCollateralView));
