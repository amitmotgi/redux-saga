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

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import DeviceInfo from 'react-native-device-info';
import CheckBox from 'react-native-checkbox';
import ModalView from '../../Common/ModalView';

class ReviewIdentityView extends Component {
  constructor(props) {
    super(props);

    const { onboarding, navigation } = this.props;
    const { documentIdentity } = onboarding;
    const { dispatch } = navigation;
    let iObj = {};

    let indentityData = (documentIdentity && documentIdentity.data_source_result_list) || {};

    if (indentityData && indentityData[0] && indentityData[0].appended_fields) {
      for (const name in indentityData[0].appended_fields) {
        const key = indentityData[0].appended_fields[name].field_name;
        const value = indentityData[0].appended_fields[name].data;
        iObj[key] = value;
      }
    }

    dispatch(OnboardingActions.onboardingUpdate(iObj));
    this.validateDocumentsSupported();

    this.state = {
      photos: null,
      checked: false,
      nationalId: this.validateDocumentsSupported(),
      Address1: this.props.onboarding.Address1 || '',
      FullName: this.props.onboarding.FullName || '',
      City: this.props.onboarding.City || '',
      StateProvince: this.props.onboarding.StateProvince || '',
      PostalCode: this.props.onboarding.PostalCode || '',
      DateOfBirth: this.props.onboarding.DateOfBirth || '',
      DocumentNumber: this.props.onboarding.DocumentNumber || '',
      IDIssuedState: this.props.onboarding.IDIssuedState || '',
      IDIssuedDate: this.props.onboarding.IDIssuedDate || '',
      IDExpiryDate: this.props.onboarding.IDExpiryDate || '',
      showModal: false
    };
  }

  componentDidMount() {
    this.state = {
      photos: null,
      checked: false,
      nationalId: this.validateDocumentsSupported(),
      Address1: this.props.onboarding.Address1 || '',
      FullName: this.props.onboarding.FullName || '',
      City: this.props.onboarding.City || '',
      StateProvince: this.props.onboarding.StateProvince || '',
      PostalCode: this.props.onboarding.PostalCode || '',
      DateOfBirth: this.props.onboarding.DateOfBirth || '',
      DocumentNumber: this.props.onboarding.DocumentNumber || '',
      IDIssuedState: this.props.onboarding.Issuer || '',
      IDIssuedDate: this.props.onboarding.IDIssuedDate || '',
      IDExpiryDate: this.props.onboarding.IDExpiryDate || '',
      showModal: false
    };
  }

  renderModal() {
    return (
      <View>
        <ModalView
          isVisible={this.state.showModal}
          title={'Terms & Conditions'}
          subTitle={'Posted on 8/28/2018'}
          onPress={() => this.setState({ showModal: !this.state.showModal })}
          showCloseBtn={true}
        />
      </View>
    );
  }

  validateDocumentsSupported() {
    const userCountry = DeviceInfo.getDeviceCountry();
    const countries = this.props.onboarding.countries || {};
    var id = '';
    for (var data in countries) {
      if (countries[data].code === userCountry) {
        id = countries[data].national_id;
        this.setState({
          nationalId: countries[data].national_id
        });
        break;
      }
    }
    return id;
  }

  headerText() {
    return (
      <Text
        style={[
          Fonts.style.textBoldGT,
          {
            color: Colors.reduxsagaBlack,
            opacity: 1,
            fontSize: DimensionManager.scale(18),
            lineHeight: DimensionManager.verticalScale(27),
            fontWeight: 'normal',
            fontStyle: 'normal'
          }
        ]}
      >
        {I18n.t('pleaseReviewAndEdit')}
      </Text>
    );
  }

  getTC() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(45)
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
          label={I18n.t('reduxsagaTermsAndConditions')}
          labelStyle={[Fonts.style.textMediumGT]}
          checked={this.state.checked}
          onChange={() => this.setState({ checked: !this.state.checked })}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ showModal: true });
          }}
        >
          <Text
            style={[
              Fonts.style.textMediumGT,
              {
                // textDecorationLine: 'underline',
                opacity: 1,
                color: Colors.reduxsagaDarkBlue,
                fontWeight: '500',
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                left: DimensionManager.verticalScale(-5),
                bottom: DimensionManager.verticalScale(4),
                lineHeight: DimensionManager.verticalScale(18)
              }
            ]}
          >
            {I18n.t('terms&Conditions')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderLabel(msg,extraStyle) {
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(34),
          marginBottom:DimensionManager.verticalScale(6),
          ...extraStyle,
        }}
      >
        <Text style={[styles.label,{
          fontWeight: 'bold',
          fontSize: DimensionManager.scale(12),
          letterSpacing: 1,
          color: '#9ca5b5'
        }]}>{msg}</Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.transparent,
          paddingBottom: DimensionManager.verticalScale(120)
        }}
      >
        <View style={styles.safeArea} />
        <View>
          <HeaderBarOnboardingView
            hideNextBtn={true}
            title={I18n.t('Sign Up')}
            stepValue={2}
            hideStep={true}
            navigateTo={'ReviewIdentityView'}
          />
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            enableOnAndroid={true}
            extraScrollHeight={DimensionManager.verticalScale(130)}
          >
            <View
              style={{
                marginLeft: DimensionManager.scale(23),
                marginRight: DimensionManager.scale(18),
                marginTop: DimensionManager.verticalScale(33)
              }}
            >
              {this.headerText()}
              {this.renderLabel(I18n.t('name'),{
                marginTop:DimensionManager.verticalScale(40)
              })}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'nameTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.FullName || this.props.onboarding.FullName}
                editable={true}
                onChangeText={text => {
                  this.setState({ FullName: text });
                }}
                placeholder={'First and last'}
              />
              {this.renderLabel(I18n.t('streetAddress'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'addressTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.Address1 || this.props.onboarding.Address1}
                editable={true}
                onChangeText={text => {
                  this.setState({ Address1: text });
                }}
                placeholder={'Address'}
              />
              {this.renderLabel(I18n.t('city'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'cityTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.City || this.props.onboarding.City}
                editable={true}
                onChangeText={text => {
                  this.setState({ City: text });
                }}
                placeholder={'Enter name of city'}
              />
              {this.renderLabel(I18n.t('state'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'stateTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.StateProvince || this.props.onboarding.StateProvince}
                editable={true}
                onChangeText={text => {
                  this.setState({ StateProvince: text });
                }}
                placeholder={'2 Letter'}
              />
              {this.renderLabel(I18n.t('postalCode'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'postalCodeTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.PostalCode || this.props.onboarding.PostalCode}
                editable={true}
                onChangeText={text => {
                  this.setState({ PostalCode: text });
                }}
                placeholder={'5 digits'}

              />
              {this.renderLabel(I18n.t('dateOfBirth'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'dobTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.DateOfBirth || this.props.onboarding.DateOfBirth}
                editable={true}
                onChangeText={text => {
                  this.setState({ DateOfBirth: text });
                }}
                placeholder={'MM/DD/YYYY'}
              />
              {this.renderLabel(I18n.t('idNumber'))}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'idNumberTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.DocumentNumber || this.props.onboarding.DocumentNumber}
                editable={true}
                onChangeText={text => {
                  this.setState({ DocumentNumber: text });
                }}
                placeholder={'Drivers license or government  ID card'}
              />

              {this.renderLabel('ID ISSUED STATE')}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'idNumberTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.IDIssuedState || this.props.onboarding.Issuer}
                editable={true}
                onChangeText={text => {
                  this.setState({ IDIssuedState: text });
                }}
                placeholder={'2 Letter'}
              />

              {this.renderLabel('ID ISSUED DATE')}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'idNumberTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.state.IDIssuedDate || this.props.onboarding.DriversLicenseIssueDate}
                editable={true}
                onChangeText={text => {
                  this.setState({ IDIssuedDate: text });
                }}
                placeholder={'MM/DD/YYYY'}
              />

              {this.renderLabel('ID EXPIRY DATE')}
              <TextField
                borderColor={Colors.reduxsagaConcreteGray}
                ref={'idNumberTextField'} // eslint-disable-line react/no-string-refs
                keyboardType={'default'}
                value={this.props.onboarding.DriversLicenseExpireDate || this.state.IDExpiryDate || ''}
                editable={true}
                onChangeText={text => {
                  this.setState({ IDExpiryDate: text });
                }}
                placeholder={'MM/DD/YYYY'}
              />

              {this.getTC()}
              {this.state.showModal ? this.renderModal() : null}
              <View
                style={{
                  marginTop: DimensionManager.verticalScale(19),
                  marginBottom: DimensionManager.verticalScale(19),
                  alignSelf: 'center'
                }}
              >
                <TouchableOpacityView
                  active={true}
                  editable={false}
                  label={'Continue'}
                  onPress={() => {
                    var userInfo = {
                      FullName: this.state.FullName || this.props.onboarding.FullName || '',
                      Address1: this.state.Address1 || this.props.onboarding.Address1 || '',
                      City: this.state.City || this.props.onboarding.City || '',
                      StateProvince: this.state.StateProvince || this.props.onboarding.StateProvince || '',
                      PostalCode: this.state.PostalCode || this.props.onboarding.PostalCode || '',
                      DateOfBirth: this.state.DateOfBirth || this.props.onboarding.DateOfBirth || '',
                      DocumentNumber: this.state.DocumentNumber || this.props.onboarding.DocumentNumber || '',
                      nationalId: this.validateDocumentsSupported() || '',
                      Issuer: this.state.IDIssuedState || '',
                      IDIssuedDate: this.state.IDIssuedDate || '',
                      IDExpiryDate: this.state.IDExpiryDate || ''
                    };

                    // // update the store with latest edited info
                    dispatch(OnboardingActions.onboardingUpdate(userInfo));

                    navigation.navigate('SSN', {
                      nationalId: this.state.nationalId
                    });

                    // if (this.props.onboarding.documentType === 'SocialService' ||
                    //   this.props.onboarding.documentType === 'NationalID' ||
                    //   this.props.onboarding.documentType === 'Health') {
                    //     // TODO enhance
                    // } else {
                    //
                    // }
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  label: {
    ...Fonts.style.textLightMediumGT,
    color: Colors.reduxsagaDarkGray,
    opacity: 1
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ReviewIdentityView));
