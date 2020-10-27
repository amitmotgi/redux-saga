import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import LinearGradient from 'react-native-linear-gradient';
import CurrencyView from '../../Common/CurrencyView';
import ModalView from '../../Common/ModalView';
import CLOCCarouselView from './CLOCCarouselView';
import LatestActivitiesView from './LatestActivitiesView';
import NotificationView from './NotificationView';
import LoanBalanceView from './LoanBalanceView';

class CLOCView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddAssetsModal: false
    };
  }

  header() {
    return (
      <View>
        <Text style={[Fonts.style.textBoldGT, {
          color: Colors.transparent,
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(35),
          opacity: 1
        }]}>
          {I18n.t('availableLOC')}
        </Text>
      </View>
    );
  }

  renderCLOCValue() {
    return (
      <View>
        <CurrencyView
          minimumFractionDigits={0}
          size={'medium'}
          style={{
            textAlign: 'center',
            color: Colors.transparent,
          }}
          currencyType={'USD'}
          currencyValue={41090.25}
        />
        <CurrencyView
          minimumFractionDigits={0}
          size={'small'}
          style={{
            textAlign: 'center',
            color: Colors.transparent,
            fontSize: DimensionManager.scale(16)
          }}
          currencyType={'USD'}
          currencyValue={98950}
        />
      </View>
    );
  }

  renderOpenCLOC() {
    return (
      <TouchableOpacityView
        active={true}
        label={I18n.t('openCLOC')}
        invertColor={true}
        onPress={() => {
          // If user already has
          //this.props.navigation.navigate('NewCLOC');
          // this.props.navigation.navigate('CLOCDistribution');
          this.props.navigation.navigate('StartCLOC');


        }} />
    );
  }

  renderAddAssets() {
    return (
      <View>
        <ModalView
          isVisible={this.state.showAddAssetsModal}
          title={I18n.t('terms&Conditions')}
          onPress={() => this.setState({showAddAssetsModal: false})}
        />
      </View>
    );
  }

  renderAssets() {
    return (
      <View style={{
        alignSelf: 'center'
      }}>
        <Text style={[Fonts.style.h5TextRegular, {
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(20),
          marginBottom: DimensionManager.verticalScale(20),
          color: Colors.reduxsagaLine

        }]}>{I18n.t('yourAssets')}</Text>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text style={[Fonts.style.textSmallGT, {
            color: Colors.reduxsagaBack,
            textAlign: 'left',
            opacity: 0.5,
            marginTop: DimensionManager.verticalScale(8),
            paddingLeft: DimensionManager.scale(20),
            marginBottom: DimensionManager.verticalScale(7),
          }]}>
            {I18n.t('combinedWallet&VaultAssets')}
          </Text>

          <View style={[//Fonts.style.textSmallGT,
            {
           // color: Colors.transparent,
            opacity: 1,
            marginTop: DimensionManager.verticalScale(8),
            marginBottom: DimensionManager.verticalScale(7),
            backgroundColor: Colors.reduxsagaDarkGreen,
            height: DimensionManager.verticalScale(17),
            width: DimensionManager.scale(62),
            borderRadius: 8.5,
            marginLeft: DimensionManager.scale(7),
            flexDirection: 'row',
          }]}>
            <Image
              source={require('../Images/triangle.png')}
              style={{
                alignSelf: 'center',
                marginLeft: DimensionManager.verticalScale(7),
                marginRight: DimensionManager.verticalScale(3),
                width: DimensionManager.scale(12),
                height: DimensionManager.verticalScale(9),
                resizeMode: 'contain'
              }} />
            <Text style={[Fonts.style.textSmallGT, {
              color: Colors.transparent,
              textAlign: 'center',
              opacity: 1,
            }]}>
              0.04%
            </Text>
          </View>

        </View>
        <View style={{
          backgroundColor: Colors.transparent,
          flexDirection: 'column',
          width: DimensionManager.scale(335),
          height: DimensionManager.verticalScale(164),
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
          shadowOpacity: 0.2,
          shadowOffset: {width: 1, height: 2},
          elevation: 2
        }}>
          <Image
            source={require('../Images/assets.png')}
            style={{
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(20),
              width: DimensionManager.scale(54),
              height: DimensionManager.verticalScale(41),
              resizeMode: 'contain'
            }} />

            <CurrencyView
              minimumFractionDigits={0}
              size={'medium'}
              currencyType={'USD'}
              currencyValue={132321042.75}
            />

        </View>

        <View style={{
          flexDirection: 'row',
        }}>
          <Text style={[Fonts.style.textSmallGT, {
            color: Colors.reduxsagaBack,
            textAlign: 'left',
            opacity: 0.5,
            marginTop: DimensionManager.verticalScale(32),
            marginLeft: DimensionManager.scale(20)
          }]}>
            {I18n.t('walletAssets')}
          </Text>
          <View style={[//Fonts.style.textSmallGT,
            {
         //   color: Colors.transparent,
            opacity: 1,
            marginTop: DimensionManager.verticalScale(32),
            // marginBottom: DimensionManager.verticalScale(7),
            backgroundColor: Colors.reduxsagaDarkGreen,
            height: DimensionManager.verticalScale(17),
            width: DimensionManager.scale(62),
            borderRadius: 8.5,
            marginLeft: DimensionManager.scale(7),
            flexDirection: 'row'
          }]}>
            <Image
              source={require('../Images/triangle.png')}
              style={{
                alignSelf: 'center',
                marginLeft: DimensionManager.verticalScale(7),
                marginRight: DimensionManager.verticalScale(3),
                width: DimensionManager.scale(12),
                height: DimensionManager.verticalScale(9),
                resizeMode: 'contain'
              }} />
            <Text style={[Fonts.style.textSmallGT, {
              color: Colors.transparent,
              textAlign: 'center',
              opacity: 1,
            }]}>
              0.05%
            </Text>
          </View>

          <Text style={[Fonts.style.textSmallGT, {
            color: Colors.reduxsagaBack,
            textAlign: 'center',
            opacity: 0.5,
            marginTop: DimensionManager.verticalScale(32),
            marginLeft: DimensionManager.scale(32)
          }]}>
            {I18n.t('vaultAssets')}
          </Text>
          <View style={[//Fonts.style.textSmallGT,
            {
           // color: Colors.transparent,
            opacity: 1,
            marginTop: DimensionManager.verticalScale(32),
            // marginBottom: DimensionManager.verticalScale(7),
            backgroundColor: Colors.reduxsagaDarkGreen,
            height: DimensionManager.verticalScale(17),
            width: DimensionManager.scale(62),
            borderRadius: 8.5,
            marginLeft: DimensionManager.scale(7),
            flexDirection: 'row'
          }]}>
            <Image
              source={require('../Images/triangle.png')}
              style={{
                alignSelf: 'center',
                marginLeft: DimensionManager.verticalScale(7),
                marginRight: DimensionManager.verticalScale(3),
                width: DimensionManager.scale(12),
                height: DimensionManager.verticalScale(9),
                resizeMode: 'contain'
              }} />
            <Text style={[Fonts.style.textSmallGT, {
              color: Colors.transparent,
              textAlign: 'center',
              opacity: 1,
            }]}>
              0.05%
            </Text>
          </View>

        </View>

        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(20),
          marginBottom: DimensionManager.verticalScale(20),
          shadowOpacity: 0.2,
          shadowOffset: {width: 1, height: 2},
          elevation: 2
        }}>

          <View style={{
            backgroundColor: Colors.transparent,
            flexDirection: 'column',
            width: DimensionManager.scale(160),
            height: DimensionManager.verticalScale(178),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(-5),
            shadowOffset: {width: 1, height: 2},
            elevation: 2,
            shadowOpacity: 0.2,
          }}>
            <Image
              source={require('../Images/wallet.png')}
              style={{
                alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(20),
                width: DimensionManager.scale(56),
                height: DimensionManager.verticalScale(38),
                resizeMode: 'contain'
              }} />

              <CurrencyView
                minimumFractionDigits={0}
                size={'small'}
                style={{
                  color: Colors.reduxsagaBack,
                  textAlign: 'center',
                  marginTop: DimensionManager.verticalScale(16),
                }}
                currencyType={'USD'}
                currencyValue={1323.75}
              />

              {this.state.showAddAssetsModal ? (this.renderAddAssets()) : null}
              <TouchableOpacity
                onPress={() => {
                  this.setState({showAddAssetsModal: true });
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignSelf: 'center'
                }}>
                  <Text style={[Fonts.style.textSmallGT, {
                    fontWeight: '500',
                    opacity: 1,
                    color: Colors.reduxsagaDarkBlue,
                    marginTop: DimensionManager.verticalScale(25),
                    marginBottom: DimensionManager.verticalScale(22),
                    marginLeft: DimensionManager.verticalScale(44),
                  }]}>
                  Add Assets
                  </Text>
                  <Image
                    source={require('../Images/arrow.png')}
                    style={{
                      alignSelf: 'center',
                      width: DimensionManager.scale(38),
                      height: DimensionManager.verticalScale(22),
                      resizeMode: 'contain'
                    }} />
                  </View>
              </TouchableOpacity>
          </View>

          <View style={{
            backgroundColor: Colors.transparent,
            flexDirection: 'column',
            width: DimensionManager.scale(160),
            height: DimensionManager.verticalScale(178),
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            shadowOffset: {width: 1, height: 2},
            elevation: 2,
            shadowOpacity: 0.2,

          }}>
            <Image
              source={require('../Images/vault.png')}
              style={{
                alignSelf: 'center',
                marginTop: DimensionManager.verticalScale(20),
                width:DimensionManager.scale(56),
                height: DimensionManager.verticalScale(38),
                resizeMode: 'contain'
              }} />
              <CurrencyView
                minimumFractionDigits={0}
                size={'small'}
                style={{
                  color: Colors.reduxsagaBack,
                  textAlign: 'center',
                  marginTop: DimensionManager.verticalScale(12),
                }}
                currencyType={'USD'}
                currencyValue={1323.75}
              />

          </View>

        </View>
      </View>
    );
  }

  renderNews() {
    return (
      <View style={{
        backgroundColor: Colors.transparent,
        height: DimensionManager.verticalScale(488)
      }} />
    );
  }
  renderMarketNews = () => {
    return (
      <View style={styles.marketNewsView}>
        <View>
          <Text style={styles.marketNewsText}>Market News</Text>
        </View>
        <CLOCCarouselView />
      </View>
    );
  }
  renderLatestActivities = () => {
    return (
      <View style={styles.latestActivities}>
        <View>
          <Text style={styles.latestActivitiesText}>Latest Activities</Text>
        </View>
        <LatestActivitiesView/>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView>
        <View style={styles.safeArea} />
        <View style={styles.safeAreaBottom} />

        <ScrollView  style={styles.wrapper}>
          <LinearGradient colors={['#0038ca', '#2890ff']}>
            <NotificationView
              type={'WARNING'}
              show={true} />

            {this.header()}
            {this.renderCLOCValue()}
            <View style={{
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(20),
              marginBottom: DimensionManager.verticalScale(20),
            }}>
              {this.renderOpenCLOC()}
            </View>
          </LinearGradient>

          <View style={{
            backgroundColor: Colors.reduxsagaOffWhite
          }}>
            {this.renderAssets()}
          </View>
          {this.renderMarketNews()}
          <LoanBalanceView />

          {this.renderLatestActivities()}

          {/*<View style={{*/}
            {/*marginTop: DimensionManager.verticalScale(20),*/}
          {/*}}>*/}
            {/*{this.renderNews()}*/}
          {/*</View>*/}
        </ScrollView>
      </SafeAreaView>
    );
  }

}

CLOCView.propTypes = {
  navigation: PropTypes.object,
  onboarding: PropTypes.object
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    flexDirection: 'column',
    // marginTop: DimensionManager.verticalScale(44),
  },
  marketNewsView: {
    backgroundColor: Colors.transparent
  },
  marketNewsText: {
    ...Fonts.style.h5TextRegular,
    textAlign: 'center',
    color: Colors.reduxsagaLine,
    marginTop: DimensionManager.verticalScale(26),
    marginBottom: DimensionManager.verticalScale(56 - 45 / 2)
  },
  latestActivities:{
    backgroundColor: Colors.transparent
  },
  latestActivitiesText:{
    ...Fonts.style.h5TextRegular,
    textAlign: 'center',
    color: Colors.reduxsagaLine,
    marginTop: DimensionManager.verticalScale(30),
    marginBottom: DimensionManager.verticalScale(30)
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  safeAreaBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.transparent,
    opacity: 1
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CLOCView));
