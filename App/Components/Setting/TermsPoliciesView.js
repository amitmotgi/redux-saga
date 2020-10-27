import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class TermsPoliciesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      policyList: [
        { date: 'Privacy policy', linkUrl: 'https://twitter.com/ihavereduxsaga' },
        { date: 'Terms and conditions', linkUrl: 'https://www.facebook.com/ihavereduxsaga/' },
        { date: 'Data policy', linkUrl: 'https://t.me/ihavereduxsaga' },
      ]
    };
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 1,
        borderColor: Colors.reduxsagaExtraLine,
        opacity: 0.2
      }}
      />
    );
  }





  renderPolicyList = () => {
    const { navigation } = this.props;
    const { policyList } = this.state;
    return (
      <View style={{ flex: 0 }}>
        <FlatList
          data={policyList}
          ItemSeparatorComponent={this.renderLine}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: DimensionManager.scale(20),
                marginRight: DimensionManager.scale(20),
                marginTop: DimensionManager.verticalScale(14),
                marginBottom: DimensionManager.verticalScale(14),
              }}>
              <Text style={[Fonts.style.textMediumGT, {
                color: Colors.reduxsagaBlue,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: DimensionManager.scale(14),
              }]}>
                {item.date}
              </Text>
              <View style={{
                flexDirection: 'row',
              }}>
                <Image
                  source={require('../../Components/Images/arrow.png')}
                  style={{
                    height: DimensionManager.verticalScale(14),
                    width: DimensionManager.scale(8),
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
          )}
        /></View>
    );
  }


  render() {
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('policiesHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
        />
        <View style={{ flex: 1, marginTop: DimensionManager.verticalScale(70) }}>
          {this.renderLine()}
          {this.renderPolicyList()}
          {this.renderLine()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TermsPoliciesView));
