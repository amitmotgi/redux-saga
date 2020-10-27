import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  WebView,
  View,
  SafeAreaView
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import { withNavigation } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import i18n from '../../I18n';

class TermsConditionsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      htmlUrl: 'https://myreduxsaga.io'
    };
  }
  render() {
    const { htmlUrl } = this.state;
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('policiesHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
        />
        <View style={{
          flex: 1,
          marginTop: DimensionManager.verticalScale(33),
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20)
        }}>

          <WebView automaticallyAdjustContentInsets={true} source={htmlUrl} />

        </View>
      </SafeAreaView >
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },

  title: {
    ...Fonts.style.h3BoldGT,
    opacity: 1,
    color: Colors.transparent
  },

});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TermsConditionsView));
