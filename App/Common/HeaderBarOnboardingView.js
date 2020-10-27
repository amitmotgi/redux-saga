import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Keyboard,
  TouchableOpacity } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { DrawerActions, withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import i18n from '../I18n';
import UserActions from '../Redux/User';
import { PageStyleConfig } from '../Config/PageStyleConfig';

class HeaderBarOnboardingView extends Component {
  constructor(props) {
    super(props);
  }

  headerMessage = () => {
    const { hideStep, stepValue, title } = this.props;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: DimensionManager.scale(10)
        }}
      >
        {hideStep ? null : (
          <Text
            style={[
              Fonts.style.textMediumGT,
              {
                color: Colors.transparent,
                textAlign: 'center'
              }
            ]}
          >
            Step {stepValue} of 4
          </Text>
        )}
        <Text style={styles.header}>{i18n.t(title)}</Text>
      </View>
    );
  };

  render() {
    const {
      disableNextBtn,
      title,
      nextBtn,
      backBtn,
      hideStep,
      bgColor,
      bkBtnColor,
      componentType,
      hideNextBtn,
      hideBackBtn,
      hideMenu
    } = this.props;

    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <View
        style={{
          flexDirection: 'column',
          // justifyContent:'center',
          backgroundColor: bgColor === 'transparent' ? Colors.transparent : Colors.reduxsagaDarkBlue,
          height: DimensionManager.verticalScale(134 - 42)
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),
            paddingTop: DimensionManager.verticalScale(71 - 45)
          }}
        >
          {!hideBackBtn ? (
            <TouchableOpacity
              style={styles.backButtonView}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon
                name="chevron-small-left"
                size={30}
                color={bkBtnColor ? Colors.reduxsagaBlack : '#9fbafb'}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonView} />
          )}
          {this.headerMessage()}
          {!hideNextBtn ? (
            <TouchableOpacity
              style={styles.nextButtonView}
              onPress={() => {
                if (!disableNextBtn) {
                  this.props.navigation.goBack();
                }
              }}
            >
              <Icon name="chevron-small-right" size={30} color={Colors.transparent} />
            </TouchableOpacity>
          ) : !hideMenu ? (
            <TouchableOpacity
              style={[styles.nextButtonView]}
              onPress={() => {
                Keyboard.dismiss();
                this.props.navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Image
                style={{
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  width: DimensionManager.scale(27),
                  height: DimensionManager.verticalScale(22)
                }}
                source={require('./Images/burger-menu.png')}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.nextButtonView} />
          )}
        </View>
        {/*{this.headerMessage(title)}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.transparent,
    textAlign: 'center',
    opacity: 1
  },
  backButtonView: {
    height: DimensionManager.verticalScale(30),
    width: DimensionManager.scale(30),
    marginLeft: DimensionManager.scale(-10),
    color: '#9fbafb'
  },
  nextButtonView: {
    height: DimensionManager.verticalScale(30),
    width: DimensionManager.scale(30)
    // marginRight: DimensionManager.scale(-10)
  }
});

HeaderBarOnboardingView.defaultProps = {
  hideStep: false,
  hideBackBtn: false,
  hideNextBtn: true,
  hideMenu: true
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(HeaderBarOnboardingView));
