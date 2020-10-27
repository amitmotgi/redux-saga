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
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import OnboardingActions from '../../Redux/Onboarding';
import Modal from 'react-native-modal';
import * as BlinkIDReactNative from 'blinkid-react-native';

const licenseKey = Platform.select({
  // iOS license key for applicationID: org.reactjs.native.example.BlinkIDReactNative
  ios: 'sRwAAAEPY29tLmNyZWQubXljcmVkiOOIcjcJX7K7oORA1powo8TTBAiVZRr5izUBFUMZ4AwylCRQ2v4ecWPXLSo7c+sPLkJI8QN+hbwma02N23DR+aH7D5VxQlsVhfCr3qe9XXHY/5HvMJ6Fl2MMhqUWGZz2ddoqrPGM/rhEY66Pd2Dlaepbz9kgSCfu+nCGTdqe3bJMWUlr5ptUuoULPexAuN5JhvFhlnoTcBhAfkNi8l974kpW4yuh4YuiXwlmbWuISE1bDD34tD+bTAIC97pG',
  // android license key for applicationID: com.blinkidreactnative
  android: 'sRwAAAAWY29tLmJsaW5raWRyZWFjdG5hdGl2ZYouOuuUS2CbdVuoF2tQz6TAY3id8ftIthVteNhTl+5X96gtQcjcrTKZwGBoVCdS1gX20Tgn977VP5oGegKDNtpEF6eLLP5iUv7RhCic5N2doChS0qciSPamD5DOTWb6xUC4tMN85UE+lvreLEKEQKu2A4sIeRw4DbuvhneQJLyV7xEOlN2a7LM6eNgoyRzXiY6TTRH7TVeTWBHH9Q/MwbNquShkY/sG+2SCaB2+QSPIhC2x85VDaYPrcuwItA=='
});

class PersonalInfoRequireInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driversLicense: false,
      identityCard: false,
      showModal: false,
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      showSuccessFrame: false,
      successFrame: '',
      results: '',
      licenseKeyErrorMessage: ''
    };
  }

  async scan() {
    try {
        // to scan EU driver's licenses, use EudlRecognizer
        // var eudlRecognizer = new BlinkIDReactNative.EudlRecognizer();
        // eudlRecognizer.returnFaceImage = true;
        // eudlRecognizer.returnFullDocumentImage = true;
        //
        // // if you also want to obtain camera frame on which specific recognizer has
        // // finished its recognition, wrap it with SuccessFrameGrabberRecognizer and use
        // // the wrapper instead of original for building RecognizerCollection
        // var eudlSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(eudlRecognizer);

        // to scan US Driver's licenses, use UsdlRecognizer
        var usdlRecognizer = new BlinkIDReactNative.UsdlCombinedRecognizer();
        usdlRecognizer.returnFaceImage = true;
        usdlRecognizer.returnFullDocumentImage = true;

        //var usdlSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(usdlRecognizer);

        // to scan any machine readable travel document (passports, visa's and IDs with
        // machine readable zone), use MrtdRecognizer
        var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
        mrtdRecognizer.returnFullDocumentImage = true;
        mrtdRecognizer.returnMrzImage = true;

        var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

        const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
            new BlinkIDReactNative.DocumentVerificationOverlaySettings(),
            new BlinkIDReactNative.RecognizerCollection([usdlRecognizer, mrtdSuccessFrameGrabber]),
            licenseKey
        );

        if (scanningResults) {
          let newState = {
            showImageDocument: false,
            resultImageDocument: '',
            showImageFace: false,
            resultImageFace: '',
            results: '',
            showSuccessFrame: false,
            successFrame: ''
          };

          for (let i = 0; i < scanningResults.length; ++i) {
            let localState = this.handleResult(scanningResults[i]);
            newState.showImageDocument = newState.showImageDocument || localState.showImageDocument;
            if (localState.resultImageDocument) {
              newState.resultImageDocument = localState.resultImageDocument;
            }
            newState.showImageFace = newState.showImageFace || localState.showImageFace;
            if (localState.resultImageFace) {
              newState.resultImageFace = localState.resultImageFace;
            }
            newState.results += localState.results;
            newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame;
            if (localState.successFrame) {
              newState.successFrame = localState.successFrame;
            }
          }
          newState.results += '\n';
          this.setState(newState);
        }
    } catch (error) {
      console.log(error);
      this.setState({ showImageDocument: false, resultImageDocument: '', showImageFace: false, resultImageFace: '', results: 'Scanning has been cancelled', showSuccessFrame: false,
      successFrame: ''});
    }
  }

  handleResult(result) {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    let fieldDelim = ";\n";

    var localState = {
      showImageDocument: false,
      resultImageDocument: '',
      showImageFace: false,
      resultImageFace: '',
      results: '',
      showSuccessFrame: false,
      successFrame: ''
    };

    if (result instanceof BlinkIDReactNative.UsdlCombinedRecognizerResult) {
      // handle USDL parsing result
      let fields = result.fields;

      // console.log("fields >>>> ", fields);

      let USDLKeys = BlinkIDReactNative.UsdlKeys;
      let fullDocumentImage = result.fullDocumentImage;

      // console.log(" result >> ", result);
      // console.log("fullDocumentImage >>>> ", fullDocumentImage);

      /*
        AKADateOfBirth: 50
        AKAFamilyName: 20
        AKAFullName: 19
        AKAGivenName: 21
        AKAMiddleName: 46
        AKAPrefixName: 47
        AKASocialSecurityNumber: 45
        AKASuffixName: 22
        AddressCity: 9
        AddressJurisdictionCode: 10
        AddressPostalCode: 11
        AddressStreet: 8
        AddressStreet2: 31
        AuditInformation: 71
        CardRevisionDate: 68
        ComplianceType: 72
        CountryIdentification: 34
        CustomerFamilyName: 2
        CustomerFirstName: 3
        CustomerFullName: 4
        CustomerIdNumber: 26
        CustomerMiddleName: 16
        DataDiscriminator: 82
        DateOfBirth: 5
        DocumentDiscriminator: 69
        DocumentExpirationDate: 52
        DocumentExpirationMonth: 83
        DocumentIssueDate: 57
        DocumentNonexpiring: 84
        DocumentType: 0
        EyeColor: 7
        FamilyNameTruncation: 27
        FederalCommercialVehicleCodes: 58
        FirstNameTruncation: 28
        FullAddress: 12
        HAZMATExpirationDate: 78
        HairColor: 17
        Height: 13
        HeightCm: 15
        HeightIn: 14
        InventoryControlNumber: 67
        IssueTimestamp: 73
        IssuerIdentificationNumber: 51
        IssuingJurisdiction: 59
        IssuingJurisdictionName: 61
        JurisdictionEndorsementCodes: 56
        JurisdictionEndorsmentCodeDescription: 65
        JurisdictionRestrictionCodeDescription: 66
        JurisdictionRestrictionCodes: 55
        JurisdictionVehicleClass: 54
        JurisdictionVehicleClassificationDescription: 64
        JurisdictionVersionNumber: 53
        LimitedDurationDocument: 70
        MedicalIndicator: 79
        MiddleNameTruncation: 29
        NamePrefix: 33
        NameSuffix: 18
        NonResident: 80
        NumberOfDuplicates: 77
        OrganDonor: 48
        PermitExpirationDate: 74
        PermitIdentifier: 75
        PermitIssueDate: 76
        PlaceOfBirth: 30
        RaceEthnicity: 32
        ResidenceCity: 37
        ResidenceFullAddress: 40
        ResidenceJurisdictionCode: 38
        ResidencePostalCode: 39
        ResidenceStreetAddress: 35
        ResidenceStreetAddress2: 36
        SecurityVersion: 85
        Sex: 6
        SocialSecurityNumber: 44
        StandardEndorsementCode: 62
        StandardRestrictionCode: 63
        StandardVehicleClassification: 60
        StandardVersionNumber: 1
        Under18: 41
        Under19: 42
        Under21: 43
        UniqueCustomerId: 81
        Veteran: 49
        WeightKilograms: 25
        WeightPounds: 24
        WeightRange: 23
      */


      localState.results += /** Personal information */
        "USDL version: " + fields[USDLKeys.StandardVersionNumber] + fieldDelim +
        "Family name: " + fields[USDLKeys.CustomerFamilyName] + fieldDelim +
        "First name: " + fields[USDLKeys.CustomerFirstName] + fieldDelim +
        "Date of birth: " + fields[USDLKeys.DateOfBirth] + fieldDelim +
        "Sex: " + fields[USDLKeys.Sex] + fieldDelim +
        "Eye color: " + fields[USDLKeys.EyeColor] + fieldDelim +
        "Height: " + fields[USDLKeys.Height] + fieldDelim +
        "Street: " + fields[USDLKeys.AddressStreet] + fieldDelim +
        "City: " + fields[USDLKeys.AddressCity] + fieldDelim +
        "Jurisdiction: " + fields[USDLKeys.AddressJurisdictionCode] + fieldDelim +
        "Postal code: " + fields[USDLKeys.AddressPostalCode] + fieldDelim +
        /** License information */
        "Issue date: " + fields[USDLKeys.DocumentIssueDate] + fieldDelim +
        "Expiration date: " + fields[USDLKeys.DocumentExpirationDate] + fieldDelim +
        "Issuer ID: " + fields[USDLKeys.IssuerIdentificationNumber] + fieldDelim +
        "Jurisdiction version: " + fields[USDLKeys.JurisdictionVersionNumber] + fieldDelim +
        "Vehicle class: " + fields[USDLKeys.JurisdictionVehicleClass] + fieldDelim +
        "Restrictions: " + fields[USDLKeys.JurisdictionRestrictionCodes] + fieldDelim +
        "Endorsments: " + fields[USDLKeys.JurisdictionEndorsementCodes] + fieldDelim +
        "IssuingJurisdictionName: " + fields[USDLKeys.IssuingJurisdictionName] + fieldDelim +
        "Customer ID: " + fields[USDLKeys.CustomerIdNumber] + fieldDelim;

        var dateOfBirth = fields[USDLKeys.DateOfBirth];
        var idIssuedDate = fields[USDLKeys.DocumentIssueDate];
        var idExpiryDate = fields[USDLKeys.DocumentExpirationDate];

        dateOfBirth = dateOfBirth.toString();
        dateOfBirth = dateOfBirth[0]+dateOfBirth[1]+'/'+dateOfBirth[2]+dateOfBirth[3]+'/'+dateOfBirth[4]+dateOfBirth[5]+dateOfBirth[6]+dateOfBirth[7];

        idIssuedDate = idIssuedDate.toString();
        idIssuedDate = idIssuedDate[0]+idIssuedDate[1]+'/'+idIssuedDate[2]+idIssuedDate[3]+'/'+idIssuedDate[4]+idIssuedDate[5]+idIssuedDate[6]+idIssuedDate[7];

        idExpiryDate = idExpiryDate.toString();
        idExpiryDate = idExpiryDate[0]+idExpiryDate[1]+'/'+idExpiryDate[2]+idExpiryDate[3]+'/'+idExpiryDate[4]+idExpiryDate[5]+idExpiryDate[6]+idExpiryDate[7];

        dispatch(OnboardingActions.onboardingUpdate({
          Address1: fields[USDLKeys.AddressStreet] || '',
          FullName: fields[USDLKeys.CustomerFirstName] + ' ' + fields[USDLKeys.CustomerFamilyName] || '',
          City: fields[USDLKeys.AddressCity] || '',
          StateProvince: fields[USDLKeys.AddressJurisdictionCode] || '',
          PostalCode: fields[USDLKeys.AddressPostalCode] || '',
          DateOfBirth: dateOfBirth || '',
          DocumentNumber: fields[USDLKeys.CustomerIdNumber] || '',
          IDIssuedState: fields[USDLKeys.IssuingJurisdictionName] || '',
          IDIssuedDate: idIssuedDate || '',
          IDExpiryDate: idExpiryDate || '',
          frontImageBase64: fullDocumentImage || '',
          backImageBase64: ''
        }));

        let userInfo = {
          frontImageBase64: fullDocumentImage,
          backImageBase64: '',
          spinner: true,
          cameraAcceptAgreement: true,
          documentType: this.props.onboarding.documentType,
          jToken: this.props.user.jToken,
          uuid: this.props.user.uuid
        };

        dispatch(OnboardingActions.onboardingVerifyIdentityImages(userInfo));
        navigation.navigate('VerifyCameraIdentity');

    }  else if (result instanceof BlinkIDReactNative.SuccessFrameGrabberRecognizerResult) {
      // first handle slave result, and then add success frame image
      localState = this.handleResult(result.slaveRecognizerResult);

      // success frame is returned as Base64 encoded JPEG
      if (result.successFrame) {
        localState.showSuccessFrame = true;
        localState.successFrame = 'data:image/jpg;base64,' + result.successFrame;
      }
   }

console.log(" Scanned results >>> ", localState);

    return localState;
  }

  // TODO add why need this logic
  buttonOnPress = type => () => {
    const { dispatch, navigation } = this.props;
    const userInfo = {
      documentType: type
    };
    dispatch(OnboardingActions.onboardingUpdate(userInfo));
    //navigation.navigate('CameraCapture');
    navigation.navigate('Scanning');
  };

  requireInfo = () => {
    return (
      <View style={styles.content}>
        <View style={styles.headContentView}>
          <Text style={styles.headContentText}>United States</Text>
          <Text style={[
            styles.headContentText,
            { marginTop: DimensionManager.verticalScale(32) }]}>
            {i18n.t('documentsRequired')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({showModal: true});
            }}
          >
            <Text
              style={[
                styles.headContentText,
                styles.whyNeedThisText,
                { marginTop: DimensionManager.verticalScale(14) }
              ]}
            >
              {i18n.t('whyNeedThis')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerView}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => this.scan()}
          >
            <Text style={styles.footerButtonLabel}>Drivers license</Text>
          </TouchableOpacity>
          <View style={styles.lineSpaceView}>
            <View style={styles.lineSpace} />
            <Text style={styles.lineSpaceText}>or</Text>
            <View style={styles.lineSpace} />
          </View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => this.scan()}
          >
            <Text style={styles.footerButtonLabel}>
              Government ID card
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.showModal}
        >
          <View style={{
            height: DimensionManager.verticalScale(487),
            width: DimensionManager.scale(335),
            backgroundColor: Colors.transparent
          }}>
            <TouchableOpacity onPress={() => {
              this.setState({showModal: false});
            }}>
              <Image
                style={{
                  width: DimensionManager.scale(18),
                  height: DimensionManager.verticalScale(52),
                  marginRight: DimensionManager.scale(18),
                  resizeMode: 'contain',
                  marginRight: DimensionManager.scale(8.7),
                  alignSelf: 'flex-end'
                }}
                source={require('../Dashboard/Images/x-close-modal.png')} />
              </TouchableOpacity>

              <Text style={{
                ...styles.transferText,
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(28),
                color: Colors.reduxsagaDarkBlue,
                textAlign: 'center',
                lineHeight: DimensionManager.scale(44)
              }}>
                Why?
              </Text>
              <Text style={{
                ...styles.transferText,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: DimensionManager.scale(18),
                color: '#787e8b',
                textAlign: 'center',
                lineHeight: DimensionManager.scale(26),
                marginLeft: DimensionManager.scale(32),
                marginRight: DimensionManager.scale(31),
                marginTop: DimensionManager.verticalScale(5)
              }}>
                By providing this document, we can ensure the safety, security, and reliability of our services.
              </Text>

              <Image
                style={{
                  width: DimensionManager.scale(184),
                  height: DimensionManager.verticalScale(184),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(69)
                }}
                source={require('../Images/shield-c-ircle.png')} />

          </View>
        </Modal>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={i18n.t('personalInfo')}
          stepValue={1}
          hideStep={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          {this.state.showModal ? this.renderModal() : null}
          {this.requireInfo()}
        </ScrollView>
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
    color: Colors.reduxsagaBlack
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  content: {
    marginHorizontal: DimensionManager.scale(20),
    flex: 1,
    justifyContent: 'space-between'
  },
  headContentView: {
    marginTop: DimensionManager.verticalScale(33)
  },
  headContentText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack
  },
  whyNeedThisText: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    fontWeight: '500',
    color: Colors.reduxsagaDarkBlue
  },
  footerView: {
    marginBottom: DimensionManager.verticalScale(8),
    marginTop: DimensionManager.verticalScale(300)
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
  },
  lineSpaceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: DimensionManager.verticalScale(26)
  },
  lineSpace: {
    height: DimensionManager.verticalScale(1),
    width: DimensionManager.scale(126),
    backgroundColor: Colors.reduxsagaLightGray
  },
  lineSpaceText: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    color: Colors.reduxsagaConcreteGray
  }
});

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(PersonalInfoRequireInfo));
