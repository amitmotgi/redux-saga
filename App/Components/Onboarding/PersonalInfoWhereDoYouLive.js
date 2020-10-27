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
  SafeAreaView
} from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import AutoComplete from '../../Common/AutoComplete';
import OnboardingActions from '../../Redux/Onboarding';

class PersonalInfoWhereDoYouLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driversLicense: true,
      identityCard: false,
      domicile: '',
      domicileFocus: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    dispatch(
      OnboardingActions.onboardingFetchCountries({
        jToken: this.props.user.jToken
      })
    );
    InteractionManager.runAfterInteractions(() => {
      // this runs on requestAnimationFrame
      // add long waiting synchro tasks here... if any
      if (Platform.OS === 'ios') {
        LayoutAnimation.easeInEaseOut();
      } else {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    });
  }

  getWhereDoYouLive = () => {
    const {
      onboarding: { countries = {} }
    } = this.props;
    const { domicileFocus } = this.state;
    const extraStyle = domicileFocus
      ? {
          color: Colors.reduxsagaBlack,
          opacity: 1
        }
      : {
          color: Colors.reduxsagaBlack,
          opacity: 1
        };
    const onChange = text => this.setState({ domicile: text });
    const onSelect = suggestion => this.setState({ domicile: suggestion.text });
    const suggestions = [];
    for (let i in countries) {
      suggestions.push({ text: countries[i].display_name });
    }
    // const suggestions = [
    //   {text: 'United Arab Emirates', anotherProperty: 'value'},
    //   {text: 'United Kingdom', anotherProperty: 'value2'},
    //   {text: 'United states', anotherProperty: 'value3'},
    //   {text: 'suggestion4', anotherProperty: 'value4'},
    //   {text: 'suggestion5', anotherProperty: 'value5'},
    //   {text: 'suggestion6', anotherProperty: 'value6'},
    //   {text: 'ddddf6', anotherProperty: 'value7'},
    // ]
    return (
      <View>
        <View style={{ marginTop: DimensionManager.verticalScale(33),marginBottom: DimensionManager.verticalScale(30) }}>
          <Text style={[styles.label, extraStyle]}>{i18n.t('whereDoYouLive')}</Text>
        </View>
        <AutoComplete
          onSelect={onSelect}
          suggestions={suggestions}
          suggestionObjectTextProperty="text"
          onChangeText={onChange}
          value={this.state.domicile}
          autoCorrect={false}
          onFocus={() => this.setState({ domicileFocus: true })}
          onBlur={() => this.setState({ domicileFocus: false })}
          minimumSimilarityScore={0.3}
        />
      </View>
    );
  }
  // TODO add "Get notified" navigation logic
  renderWhereDoYouLive = () => {
    const {navigation} = this.props;
    return (
      <View style={styles.doYouLiveView}>
        {this.getWhereDoYouLive()}
        <TouchableOpacity
          style={styles.doYouLiveFooterButton}
          onPress={() => {
            navigation.push('ShareView');
          }}
        >
          <Text style={styles.doYouLiveFooterButtonLabel}>Get notified</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          hideNextBtn={true}
          title={i18n.t('personalInfo')}
          stepValue={1}
          hideStep={true}/>
        {this.renderWhereDoYouLive()}
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
  label: {
    ...Fonts.style.textLightMediumGT,
    fontWeight:'normal',
    color: Colors.reduxsagaBlack
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  doYouLiveView: {
    marginHorizontal: DimensionManager.scale(20),
    flex: 1,
    justifyContent: 'space-between'
  },
  doYouLiveFooterButton: {
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center',
    marginBottom: DimensionManager.verticalScale(8),
  },
  doYouLiveFooterButtonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  }
});

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(PersonalInfoWhereDoYouLive));
