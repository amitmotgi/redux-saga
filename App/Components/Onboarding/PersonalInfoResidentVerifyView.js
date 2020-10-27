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
import i18n from '../../I18n';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';

class PersonalInfoResidentVerifyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation && this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.context || '',
      showResidentView: true
    };
  }

  componentDidMount() {

  }

  // TODO add Button "Yes" navigation logic
  renderResidentOfUS() {
    const { navigation } = this.props;
    return (
      <View style={styles.renderResidentOfUSView}>
        <View style={styles.residentOfUSView}>
          <Text style={
            styles.residentOfUSText
          }>Are you a resident of the United States?</Text>
        </View>
        <View style={styles.residentViewFooter}>
          <TouchableOpacity
            style={[styles.residentFooterButton, {
              backgroundColor: '#6e94ee'
            }]}
            onPress={() => {
              navigation.push('PersonalInfoWhereDoYouLive');
            }}
          >
            <Text style={styles.residentFooterButtonLabel}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.residentFooterButton}
            onPress={() => {
              navigation.navigate('PersonalInfoRequireInfo');
            }}
          >
            <Text style={styles.residentFooterButtonLabel}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        {/* TODO add position is not a good idea, maybe use statusBar*/}
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          hideBackBtn={this.state.context === 'BURGER'}
          title={i18n.t('personalInfo')}
          stepValue={1}
          hideStep={true}
        />
        <ScrollView>
          {this.renderResidentOfUS()}
        </ScrollView>
      </SafeAreaView>
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
  renderResidentOfUSView: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: DimensionManager.scale(20)
  },
  residentOfUSView: {
    marginTop: DimensionManager.verticalScale(33)
  },
  residentOfUSText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack
  },
  residentViewFooter: {
    marginTop: DimensionManager.verticalScale(528),
    marginBottom: DimensionManager.verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  residentFooterButton: {
    width: DimensionManager.scale(157),
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  residentFooterButtonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  }
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withNavigation(PersonalInfoResidentVerifyView));
