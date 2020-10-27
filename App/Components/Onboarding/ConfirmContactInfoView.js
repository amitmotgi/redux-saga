import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  PanResponder,
  UIManager,
  InteractionManager,
  SafeAreaView
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import AutoComplete from '../../Common/AutoComplete';
import OnboardingActions from '../../Redux/Onboarding';
import DeviceInfo from 'react-native-device-info';

class ConfirmContactInfoView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      driversLicense: true,
      identityCard: false,
      domicile:'',
      domicileFocus: false
    };
    this.validateDocumentsSupported();
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(OnboardingActions.onboardingFetchCountries({
      jToken: this.props.user.jToken
    }));
    InteractionManager.runAfterInteractions(() => {
      // this runs on requestAnimationFrame
      // add long waiting synchro tasks here... if any
      if (Platform.OS === 'ios') {
        LayoutAnimation.easeInEaseOut();
      } else {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    });
  }

  componentWillUnMount() {

  }

  headerText() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(32)
      }}>
        <Text style={Fonts.style.textRegularGT}>{i18n.t('documentsRequired')}</Text>
      </View>
    );
  }

  renderText=()=>{
    return (
      <View>
        <Text style={[Fonts.style.textRegularGT, {
          textDecorationLine: 'underline'
        }]}>{i18n.t('whyNeedThis')}</Text>
      </View>
    );
  }

  getWhereDoYouLive=() =>{

    const {onboarding:{countries = {}}} = this.props;
    const { domicileFocus } = this.state;
    const extraStyle = domicileFocus ? {
      color:Colors.reduxsagaActiveBlue, opacity:1
    } : {
      color:Colors.reduxsagaBlack,opacity:1
    };
    const onChange = (text) => this.setState({domicile: text});
    const onSelect = (suggestion) => this.setState({domicile: suggestion.text});
    const suggestions = [];
    for (let i in countries)  {
      suggestions.push({text: countries[i].display_name});
    }
    // const suggestions = [
    //   {text: 'United Arab Emirates', anotherProperty: 'value'},
    //   {text: 'United Kingdom', anotherProperty: 'value2'},
    //   {text: 'United states', anotherProperty: 'value3'},
    //   {text: 'suggestion4', anotherProperty: 'value4'},
    //   {text: 'suggestion5', anotherProperty: 'value5'},
    //   {text: 'suggestion6', anotherProperty: 'value6'},
    //   {text: 'ddddf6', anotherProperty: 'value7'},
    // ]
    return (
      <View >
        <View style={{
          marginTop: DimensionManager.verticalScale(33)
        }}>
          <Text style={[styles.label,extraStyle]}>
            {i18n.t('whereDoYouLive')}
          </Text>
        </View>
        <AutoComplete
          onSelect={onSelect}
          suggestions={suggestions}
          suggestionObjectTextProperty="text"
          onChangeText={onChange}
          value={this.state.domicile}
          autoCorrect={false}
          onFocus={()=>this.setState({domicileFocus: true})}
          onBlur={()=>this.setState({domicileFocus: false})}
          minimumSimilarityScore={0.3}
        />
      </View>
    );
  }

  validateDocumentsSupported() {
    const userCountry = DeviceInfo.getDeviceCountry();
    const countries = this.props.onboarding.countries || {};

    for (var data in countries) {
      if (countries[data].code === userCountry) {
        let docTypes = countries[data].document_types;
        docTypes && docTypes.length > 0 && docTypes.forEach((type) => {
          if (type === 'DrivingLicence') {
            this.setState({driversLicense: true});
          }
          if (type === 'DrivingLicence') {
            this.setState({identityCard: true});
          }
        });
      }
    }
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      // start using the translations
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={i18n.t('personalInfo')}
          stepValue={1}
          navigateTo={'ConfirmContactInfo'} />

        <View style={{
          backgroundColor: Colors.transparent
        }}>
          <View style={{
            marginRight: DimensionManager.scale(41),
            marginLeft:DimensionManager.scale(38),
          }}>
              {this.headerText()}
              <TouchableOpacity
                onPress={() => {

                }}>
                {this.renderText()}
              </TouchableOpacity>
              {this.getWhereDoYouLive()}
          </View>

          {this.state.driversLicense ? (
            <View style={{
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(43),
            }}>
              <TouchableOpacityView
                active={true}
                label={i18n.t('driversLicense')}
                onPress={() => {
                  var userInfo = {
                    documentType: 'DriversLicense'
                  };
                  dispatch(OnboardingActions.onboardingUpdate(userInfo));
                  navigation.navigate('CameraCapture');
                }} />
            </View>
          ) : null}

          {this.state.identityCard ? (
            <Text style={[Fonts.style.textRegularGT,{
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(12),
              marginBottom: DimensionManager.verticalScale(12),
              textAlign: 'center'
            }]}>{i18n.t('or')}</Text>
          ) : null}

          {this.state.identityCard ? (
            <View style={{
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(4),
            }}>
              <TouchableOpacityView
                active={true}
                label={i18n.t('passportID')}
                onPress={() => {
                  var userInfo = {
                    documentType: 'DriversLicense'
                  };
                  dispatch(OnboardingActions.onboardingUpdate(userInfo));
                  navigation.navigate('CameraCapture');
                }} />
            </View>

          ) : null}

          <View style={{
            marginTop: DimensionManager.verticalScale(12),
          }}>
            <Text>{i18n.t('')}</Text>
          </View>
        </View>

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
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaBlack
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConfirmContactInfoView));
