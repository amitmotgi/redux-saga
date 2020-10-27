import React, { Component } from 'react';
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
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class CLOCConfirmView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanValue: 2000,
    };
  }

  header() {
    return (
      <Text style={[Fonts.style.textBoldGT, {
        textAlign: 'center'
      }]}>
        {I18n.t('theCollateralHasBeenMovedToVault')}
      </Text>
    );
  }


  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          hideNextBtn={true}
          hideStep={false}
          title={I18n.t('clocConfirmed')}
          stepValue={3} />

        <View style={{
          marginLeft: DimensionManager.scale(44),
          marginRight: DimensionManager.scale(46)
        }}>
          {this.header()}
          <TouchableOpacityView
            style={{
              backgroundColor: Colors.reduxsagaGreen,
              marginTop: DimensionManager.verticalScale(166)
            }}
            active={true}
            label={'Go to Dashboard'}
            onPress={() => this.props.navigation.navigate('Dashboard')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CLOCConfirmView));
