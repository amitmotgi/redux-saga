import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';

class CloseAccountView extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isNext: false,
    };
  }
  getMainPart() {
    const { tipContent, isNext } = this.state;
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.verticalScale(20)
      }}
      >
        <Text style={[Fonts.style.textRegularNormalGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          lineHeight: DimensionManager.scale(18) * 1.5
        }]}>
          {isNext ? i18n.t('closeActTip2') : i18n.t('closeActTip')}
        </Text>
        {isNext ? this.renderButtonOK() : this.renderButtonClose()}
      </View>
    );
  }

  renderButtonClose() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: DimensionManager.verticalScale(444)
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.reduxsagaSkyLightBlue,
            width: DimensionManager.scale(157),
            height: DimensionManager.verticalScale(50),
            justifyContent: 'center'
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <Text style={{
            ...Fonts.style.inputBoldGT,
            fontWeight: '500',
            color: Colors.transparent,
            textAlign: 'center',
          }}>
            {i18n.t('cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.reduxsagaDarkBlue,
            width: DimensionManager.scale(157),
            height: DimensionManager.verticalScale(50),
            justifyContent: 'center'
          }}
          onPress={() => {
            this.setState({
              isNext:true,
            });

          }}
        >
          <Text style={{
            ...Fonts.style.inputBoldGT,
            fontWeight: '500',
            color: Colors.transparent,
            textAlign: 'center',
            marginLeft: DimensionManager.scale(20),
          }}>
            {i18n.t('closeIt')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }


  renderButtonOK() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: DimensionManager.verticalScale(470)
      }}>
        <TouchableOpacityView
          invertColor={false}
          label={i18n.t('ok')}
          active={true}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          title={i18n.t('closeActHeader')}
          stepValue={1}
          hideNextBtn={true}
          navigateTo={''}
          hideStep={true}
        />

        <View style={{ marginTop: DimensionManager.verticalScale(33) }}>
          {this.getMainPart()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CloseAccountView));
