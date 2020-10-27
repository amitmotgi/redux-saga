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
  ActivityIndicator
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';
import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TabBarOnboardingView from '../../Common/TabBarOnboardingView';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class VerifyIdentityView extends Component {
  constructor(props) {
    super(props);
  }

  headerText() {
    return (
      <Text
        style={[
          Fonts.style.h4BoldGT,
          {
            color: Colors.transparent,
            textAlign: 'center'
          }
        ]}
      >
        Verifying your document
      </Text>
    );
  }

  getSpinner() {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        color={Colors.transparent} />
    );
  }

  renderLabel(msg) {
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(33)
        }}
      >
        <Text style={styles.label}>{msg}</Text>
      </View>
    );
  }

  renderVerifyIdentityStatus() {
    return (
      null
    )
  }

  render() {

    this.renderVerifyIdentityStatus();

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.reduxsagaDarkBlue
        }}
      >
        <View
          style={{
            marginTop: DimensionManager.verticalScale(211)
          }}
        >
          {this.headerText()}
          <View
            style={{
              marginTop: DimensionManager.verticalScale(22),
              alignSelf: 'center'
            }}
          >
            {this.getSpinner()}
          </View>
          <Text
            style={[
              Fonts.style.textMediumGT,
              {
                color: Colors.transparent,
                textAlign: 'center',
                marginTop: DimensionManager.verticalScale(12),
                alignSelf:'center',
                fontWeight: '500',
                lineHeight: 1.86 * 14,
              }
            ]}
          >
            {I18n.t('itMaytakeUpTo1Min')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column'
    //backgroundColor: Colors.transparent,
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
)(withNavigation(VerifyIdentityView));
