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

import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import ModalView from '../../Common/ModalView';

class ConfirmCollateralView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanValue: 2000,
      showAddToWalletModal: false
    };
  }

  header() {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        textAlign: 'center'
      }]}>
        {i18n.t('lineofreduxsagait')}
      </Text>
    );
  }

  renderCLOCValue() {
    return (
      <View>
        <Text style={[Fonts.style.largeTextBold, {
          color: Colors.reduxsagaBack,
          textAlign: 'center',
          textDecorationLine: 'underline'
        }]}>
          $400,000.00
        </Text>
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
          title={i18n.t('yourTokenAddress')}
          showTitleUnderline={true}
          onPress={() => this.setState({showAddToWalletModal: !this.state.showAddToWalletModal})}
        />
      </View>
    );
  }

  renderCollateralItem(type, value) {
    return (
      <View style={{
        flexDirection: 'row',
        marginLeft: DimensionManager.scale(24),
        marginRight: DimensionManager.scale(22),
      }}>
        <View style={{
          width: DimensionManager.scale(160),
          alignSelf: 'flex-start',

        }}>
          <Text style={[Fonts.style.textMediumLightGT, {
            color: Colors.reduxsagaBack,
            textAlign: 'left',
            textDecorationLine: 'underline',
            marginTop: DimensionManager.verticalScale(12),
          }]}>
            {type}
          </Text>
        </View>
        <View style={{
          width:DimensionManager.scale(158),
          alignSelf: 'flex-end',
        }}>
          <Text style={[Fonts.style.textRegularNormalGT, {
            color: Colors.reduxsagaBack,
            textAlign: 'right',
            textDecorationLine: 'underline',
            marginTop: DimensionManager.verticalScale(12),
          }]}>
            {value}
          </Text>
        </View>
      </View>
    );
  }

  renderCollaternals() {
    return (
      <View style={{
        flexDirection: 'column',
        marginTop: DimensionManager.verticalScale(20),
        backgroundColor: Colors.transparent
      }}>

        {this.renderCollateralItem(i18n.t('totalWalletAssets'), '$2,000,000.00')}
        {this.renderCollateralItem(i18n.t('totalCollateralRequired'), '$1,600,000.00')}
        {this.renderCollateralItem(i18n.t('remainingWalletAssets'), '$400,000.00')}
      </View>
    );
  }

  renderAssets() {
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
            }]}>LBA Wallet</Text>
          </View>

          <View style={{
            flex: 1,
            marginRight: DimensionManager.scale(20),
          }}>
            <Text style={[Fonts.style.textRegularNormalGT, {
              color: Colors.reduxsagaBack,
              textAlign: 'right',
              textDecorationLine: 'underline',
              fontWeight: 'bold'
            }]}>
              $2,000,000.00
            </Text>
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
              {i18n.t('addToWallet')}
            </Text>
          </TouchableOpacity>

          <View style={{
            flex:1,
            flexDirection: 'column',
            marginRight: DimensionManager.scale(20),

          }}>
            <Text style={[Fonts.style.textLightMediumGT, {
              textAlign: 'right'
            }]}>
              12.45678958 ETH
            </Text>
            <Text style={[Fonts.style.textLightMediumGT, {
              textAlign: 'right'
            }]}>
              ($500,000.00 Available)
            </Text>
          </View>

        </View>

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
          hideStep={false}
          title={i18n.t('confirmCollateral')}
          stepValue={2} />
        <ScrollView
          horizontal={false}
          vertical={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
            <View style={{
              flexDirection: 'column',
              paddingTop: DimensionManager.verticalScale(28),
              height:DimensionManager.verticalScale(203)
            }}>
              {this.header()}
              {this.renderCLOCValue()}
              {this.renderCollaternals()}
              <View style={{
                marginTop: DimensionManager.verticalScale(20),
              }}>
                {this.renderAssets()}
                {this.renderAssets()}
              </View>
              <View style={{
                alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(36),
                backgroundColor: Colors.transparent
              }}>
                <TouchableOpacityView
                  active={true}
                  label={i18n.t('Confirm')}
                  onPress={() => this.props.navigation.navigate('CLOCConfirmed')} />
              </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConfirmCollateralView));
