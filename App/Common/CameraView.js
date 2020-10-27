import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  CameraRoll,
  NativeModules,
  ImageStore,
  ImageEditor,
  ScrollView
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import i18n from '../I18n';
import OnboardingActions from '../Redux/Onboarding';
import TouchableOpacityView from './TouchableOpacityView';
import ImagePicker from 'react-native-image-picker';

class CameraView extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  uploadImage = (imageURL) => {
    const { navigation, capture } = this.props;

    try {
      Image.getSize(imageURL, (width, height) => {
        var imageSize = {
          size: { width: 3264, height: 2448},
          offset: { x: 0, y: 0 }
        };
        ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
          ImageStore.getBase64ForTag(imageURI, (base64Data) => {
            var imgData = {};
            imgData[capture + 'ImageBase64'] = base64Data;

            if (capture === 'front') {
              navigation.dispatch(OnboardingActions.onboardingFrontBaseImage(imgData));
            } else {
              navigation.dispatch(OnboardingActions.onboardingBackBaseImage(imgData));
            }
          }, (reason) => console.log(reason));
        }, (reason) => console.log(reason));
      }, (reason) => console.log(reason));

      if (capture === 'front') {
        navigation.dispatch(OnboardingActions.onboardingFrontImage(imageURL));
        navigation.navigate('CameraCaptureBack');
      } else {
        navigation.dispatch(OnboardingActions.onboardingBackImage(imageURL));
        navigation.navigate('CameraCaptureVerify');
      }
    } catch (error) {
      //
    }
  }

  takePicture() {
    this.camera.takePictureAsync()
      .then((data) => {
        CameraRoll.saveToCameraRoll(data.uri, 'photo')
          .then(() => {
            this.uploadImage(data.uri);
          })
          .catch(() => {
            // Log the errors
          });
      })
      .catch(err => console.error(err));
  }

  getCamera() {
    return (
      <View style={{
        width: '100%'
      }}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          type={RNCamera.Constants.Type.back}
          style={styles.preview}>
          <Image
            style={{
              alignSelf: 'center',
              marginLeft: DimensionManager.scale(43),
              marginRight: DimensionManager.scale(43),
              marginTop: DimensionManager.verticalScale(40),
              marginBottom: DimensionManager.verticalScale(40),
            }}
            source={require('./Images/scan-frame.png')} />
        </RNCamera>

        <View style={{
          marginRight: DimensionManager.scale(40),
          marginLeft: DimensionManager.scale(40),
          marginTop: DimensionManager.scale(22),
        }}>
          {this.frontText()}
        </View>
      </View>
    );
  }

  header() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(48),
      }}>
        <Text style={{
          color: Colors.reduxsagaBlue,
          fontSize: DimensionManager.scale(Fonts.size.h4)
        }}>{i18n.t('cameraCapture')}</Text>
      </View>
    );
  }

  frontText() {
    const { capture } = this.props;

    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(2),
        marginBottom: DimensionManager.verticalScale(8)
      }}>
        <Text style={[Fonts.style.textRegularGT, {
          color: Colors.reduxsagaBlack,
          lineHeight: DimensionManager.verticalScale(24),
          opacity: 1,
          fontSize: DimensionManager.scale(18),
          textAlign: 'center'
        }]}>{capture === 'front' ? i18n.t('frontLicense') :
          i18n.t('backLicense')}</Text>
      </View>
    );
  }

  showImagePicker() {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        var source = null;
        var file = null;

        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
          file = response.uri;
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
          file = response.uri.replace('file://', '');
        }

        this.uploadImage(file);
      }
    });
  }

  cameraWorkingText() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(51),
        marginBottom: DimensionManager.verticalScale(8)
      }}>
        <Text style={[Fonts.style.textRegularGT, {
          color: Colors.reduxsagaBlack,
          fontSize: DimensionManager.scale(14),
          textAlign: 'center',
          fontWeight: '500',
        }]}>{i18n.t('cameraNotWorking')}</Text>

      </View >
    );
  }

  uploadFromLibrary() {
    return (
      <Text
        style={[Fonts.style.textRegularGT, {
          color: Colors.reduxsagaDarkBlue,
          textAlign: 'center',
          fontWeight: '500',
          opacity: 1,
          fontSize: DimensionManager.scale(14)
        }]}
        onPress={() => this.showImagePicker()} >
        {i18n.t('uploadImagesFromLibrary')}
      </Text>
    );
  }

  render() {
    try{
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={{
            marginRight: DimensionManager.scale(24),
            marginLeft: DimensionManager.scale(24),
          }} />
          {this.getCamera()}

          <View style={{
            marginRight: DimensionManager.scale(40),
            marginLeft: DimensionManager.scale(40),
          }}>
            {this.cameraWorkingText()}
          </View>

          <View style={{
            marginRight: DimensionManager.scale(40),
            marginLeft: DimensionManager.scale(40),
          }}>
            {this.uploadFromLibrary()}
          </View>

          <View style={{
            marginTop: DimensionManager.verticalScale(147),
            marginBottom: DimensionManager.verticalScale(30),
            alignSelf: 'center'
          }}>
            <TouchableOpacityView
              active={true}
              label={i18n.t('Continue')}
              onPress={this.takePicture.bind(this)} />
          </View>

        </ScrollView>
      );
    } catch(err) {
      console.log(" Camera Capture Error ", err);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.transparent,
  },
  preview: {
    height: DimensionManager.verticalScale(263),
    marginBottom: DimensionManager.verticalScale(9),
  },

});

export default withNavigation(CameraView);
