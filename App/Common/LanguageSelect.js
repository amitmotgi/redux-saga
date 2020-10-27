import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { EventRegister } from 'react-native-event-listeners';
import { verticalScale, scale } from '../Themes/DimensionManager';
import Colors from '../Themes/Colors';
import LanguageAction from '../Redux/Language';

class LanguageSelect extends Component {

  constructor(props) {
    super(props);
    const data = this.getCountryLanguage(this.props);
    this.state = {
      options: [],
      mapShowInfoToCode: {},
      mapCodeToShowInfo: {},
      ...data
    };
  }

  componentWillReceiveProps(nextProps) {
    const data = this.getCountryLanguage(nextProps);
    this.setState({ ...data });
  }

  languageShow = value => {
    const { mapCodeToShowInfo } = this.state;
    // console.log('this.languageValue[value] || value',mapCodeToShowInfo[value] || value)
    return mapCodeToShowInfo[value] || value;
  }

  languageShowInfoToCode = value => {
    const { mapShowInfoToCode } = this.state;
    // console.log('this.languageValue[value] || value',mapShowInfoToCode[value] )
    return mapShowInfoToCode[value];
  }

  getCountryLanguage = props => {
    const { onboarding = {} } = props;
    const { countries = {} } = onboarding;
    const options = [];
    const mapShowInfoToCode = {};
    const mapCodeToShowInfo = {};
    for (let i in countries) {
      const { code, display_name } = countries[i];
      const codeLowerCase = code.toLowerCase();
      const showInfo = codeLowerCase;
      options.push(showInfo);
      mapShowInfoToCode[showInfo] = codeLowerCase;
      mapCodeToShowInfo[codeLowerCase] = showInfo;
    }
    options.sort((a, b) => a.localeCompare(b));
    return { options, mapShowInfoToCode, mapCodeToShowInfo };
  }

  render() {
    // console.log('%c language', 'color:red', this.props);
    // console.log('this.state',this.state)
    const { options } = this.state;
    let { language, dispatch } = this.props;
    const lang = language.lang || 'en';
    return (
      <View>
        <ModalDropdown
          defaultValue={this.languageShow(lang)}
          animated={true}
          options={options}
          renderButtonText={value => value}
          showsVerticalScrollIndicator={false}
          textStyle={{
            color: Colors.transparent,
            fontSize: scale(16)
          }}
          dropdownTextHighlightStyle={{
            color: Colors.black
          }}
          style={{
            alignItems: 'center',
            borderRadius: 5
          }}
          dropdownStyle={{
            width: scale(50),//scale(100),
            height: verticalScale(100),
            borderRadius: 5,
            alignItems: 'center'
          }}
          dropdownTextStyle={{
            fontSize: scale(16)
          }}
          onSelect={(idx, value) => {
            const val = this.languageShowInfoToCode(value);
            dispatch(LanguageAction.languageSet(val));
            EventRegister.emit('languageReset', { data: val });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ language: state.language, onboarding: state.onboarding });

export default connect(mapStateToProps)(LanguageSelect);
