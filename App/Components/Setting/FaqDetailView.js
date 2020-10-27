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
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';

class FaqDetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'What is the origination process?',
      content: 'Customer would use the reduxsaga’s loan calculator to determine the most suitable loan configuration for them. Upon submitting the request to receive a quote from reduxsaga, the customer would be presented with the loan agreement detailing all the C-LOC terms and conditions. To accept — they would sign and date the agreement, whereby their e-signature would be captured and recorded.',
    };
  }

  componentDidMount() {
    console.log('result', this.props.navigation.state.params);
    if (!this.props.navigation.state.params) {
      return;
    }
    const { title, content } = this.props.navigation.state.params;
    this.setState(preState => (
      {
        title: title,
        content: content ? content : preState.content
      }
    ))
  }

  getMainPart() {
    const { title, content } = this.state;
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.verticalScale(20)
      }}
      >
        <Text style={[Fonts.style.textRegularNormalGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          lineHeight: DimensionManager.scale(18) * 1.28
        }]}>
          {title}
        </Text>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          marginTop: DimensionManager.verticalScale(18),
          height: DimensionManager.scale(479),
          lineHeight: DimensionManager.scale(18) * 1.2
        }]}>
          {content}
        </Text>
        {this.renderButton()}
      </View>
    );
  }


  renderButton() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: DimensionManager.verticalScale(30)
      }}>
        <TouchableOpacityView
          invertColor={false}
          label={i18n.t('backToList')}
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
        <HeaderBarDashboardView
          title={i18n.t('faqHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FaqDetailView));
