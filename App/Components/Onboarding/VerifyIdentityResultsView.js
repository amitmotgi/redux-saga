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

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';

class VerifyIdentityResultsView extends Component {

  constructor(props) {
    super(props);
  }

  headerText(success) {
    if (success) {
      return (
        <Text style={[Fonts.style.h3BoldGT,{
          color: Colors.transparent,
          textAlign: 'center'
        }]}>
          {I18n.t('congratulationsYourIdentityIsVerified')}
        </Text>
      );
    } else {
      return (
        <View style={{
          marginLeft: DimensionManager.scale(38),
          marginRight: DimensionManager.scale(41)
        }}>
          <Text style={[Fonts.style.h3BoldGT,{
            color: Colors.transparent,
            textAlign: 'center'
          }]}>
            {I18n.t('pleaseContactUs')}
          </Text>
          <Text style={[Fonts.style.textRegularNormalGT,{
            color: Colors.transparent,
            textAlign: 'center',
            marginTop: DimensionManager.verticalScale(7)
          }]}>
            {I18n.t('atThisTimeWeCant')}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    return (
      <TouchableOpacityView
        style={{
          backgroundColor: Colors.reduxsagaGreen,
        }}
        active={true}
        label={'Go to Dashboard'}
        onPress={() => this.props.navigation.navigate('Welcome')} />
    );
  }

  render() {
    const { navigation } = this.props;
    let { success } = navigation.state.params || false;

    const img = success ? require('../Images/check-mark-success.png') :
      require('../Images/verify-fail.png');

    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.reduxsagaDarkBlue,
      }}>
        <View style={{
          marginTop: DimensionManager.verticalScale(159)
        }}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain'
            }}
            source={img} />
          <View style={{
            marginTop: DimensionManager.verticalScale(63)
          }}>
            {this.headerText(success)}
          </View>
          <View style={{
            marginTop: DimensionManager.verticalScale(66),
            alignSelf: 'center'
          }}>
            {success ? (
              <TouchableOpacityView
                style={{
                  backgroundColor: Colors.reduxsagaGreen,
                }}
                active={true}
                label={'Go to Dashboard'}
                onPress={() => this.props.navigation.navigate('Signup')} />
            ) : (
              <TouchableOpacityView
                style={{
                  backgroundColor: Colors.reduxsagaGreen,
                }}
                active={true}
                label={'Email Us'}
                onPress={() => this.props.navigation.navigate('Signup')} />
            )}

          </View>
        </View>
      </View>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(VerifyIdentityResultsView));
