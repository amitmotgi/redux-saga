import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import i18n from '../I18n';
import UserActions from '../Redux/User';

class HeaderSignUpView extends Component {

  constructor(props) {
    super(props);
  }

  headerMessage(title) {
    return (
      <View style={{
        marginBottom: DimensionManager.verticalScale(37)
      }}>
        <Text style={styles.header}>{i18n.t(title)}</Text>
      </View>
    );
  }

  render () {
    const {
      disableNextBtn,
      title,
      nextBtn,
      backBtn,
      hideStep,
      bgColor,
      bkBtnColor,
      componentType
    } = this.props;

    const { navigation } = this.props;
    const { dispatch } = navigation;


    return (
      <View style={{
        flexDirection: 'column',
        backgroundColor: bgColor === 'transparent' ?
          Colors.transparent : Colors.reduxsagaDarkBlue,
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: DimensionManager.verticalScale(20),
        }}>
        <TouchableOpacity
          style={{
            height: DimensionManager.verticalScale(21),
            marginLeft: DimensionManager.scale(29),
            marginTop: DimensionManager.verticalScale(2),
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <View style={{
            flexDirection: 'row',
          }}>
            <Image
              style={{
                width: DimensionManager.scale(9),
                height: DimensionManager.scale(17),
                resizeMode: 'contain'
              }}
              source={require('./Images/leftArrow.png')} />
            <Text style={styles.backText}>
              {i18n.t('back')}
            </Text>
          </View>

        </TouchableOpacity>

        </View>
        {this.headerMessage(title)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.h1BoldGT,
    color: Colors.transparent,
    textAlign: 'center'
  },
  backText: {
    ...Fonts.style.normal,
    fontSize: DimensionManager.scale(17),
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.reduxsagaGreen,
    marginLeft: DimensionManager.scale(6.1),
    marginTop: DimensionManager.verticalScale(-2),
    letterSpacing: DimensionManager.scale(0.1)
  }
});

HeaderSignUpView.defaultProps = {
  hideStep: false,
  hideBackBtn: false,
  hideNextBtn: true
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
)(withNavigation(HeaderSignUpView));
