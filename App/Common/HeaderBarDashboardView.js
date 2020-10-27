import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation, DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import i18n from '../I18n';

class HeaderBarDashboardView extends Component {

  constructor(props) {
    super(props);
  }

  headerMessage(title) {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(-6),
        marginLeft: DimensionManager.scale(-2),
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={styles.header}>{i18n.t(title)}</Text>
      </View>
    );
  }

  render () {
    const {
      disableNextBtn,
      navigation,
      title,
      nextBtn,
      hideStep,
      bgColor,
      bkBtnColor,
      hideBackBtn,
      style
   } = this.props;

    return (
      <View style={[{
        flexDirection: 'column',
        justifyContent:'center',
        backgroundColor: bgColor === 'transparent' ? Colors.transparent : Colors.reduxsagaDarkBlue,
        height:DimensionManager.verticalScale(90)//134-44=90
      }, {
        ...style
      }]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal:DimensionManager.scale(20)
        }}>
          {!this.props.hideBackBtn ? (
            <TouchableOpacity
              style={styles.backButtonView}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon
                name="chevron-small-left"
                size={30}
                color={bkBtnColor ? Colors.reduxsagaBlack : Colors.transparent}
              />
            </TouchableOpacity>
          ) : <View style={styles.backButtonView}/>}

          <View style={{
            justifyContent: 'center',
          }}>
            {this.props.hideStep ? null : (
              <Text style={[Fonts.style.textMediumGT, {
                color: Colors.transparent,
                opacity: 1,
              }]}>
                Step {this.props.stepValue} of 3
              </Text>
            )}
          </View>
          {this.headerMessage(title)}
          <TouchableOpacity onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }}>
            <Image style={{
                resizeMode: 'contain',
                marginLeft: DimensionManager.scale(-2),
                width: DimensionManager.scale(27),
                height: DimensionManager.verticalScale(22),
              }}
              source={require('./Images/burger-menu.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HeaderBarDashboardView.defaultProps = {
  disableNextBtn: false,
  title: '',
  nextBtn: false,
  backBtn: false,
  hideStep: false,
};

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.transparent,
    textAlign: 'center',
    opacity:1
  },
  header: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.transparent,
    textAlign: 'center',
    opacity:1
  },
  backButtonView:{
    height: DimensionManager.verticalScale(30),
    width: DimensionManager.scale(30),
    marginLeft: DimensionManager.scale(-10),
    marginTop: DimensionManager.verticalScale(-5)
  },
});

export default withNavigation(HeaderBarDashboardView);
