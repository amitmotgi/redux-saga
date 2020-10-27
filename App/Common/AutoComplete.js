import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import stringSimilarity from 'string-similarity';
import { scale, verticalScale } from '../Themes/DimensionManager';
// import { heightScale, widthScale } from '../Themes/DimensionManager'
import Fonts from '../Themes/Fonts';
import Colors from '../Themes/Colors';

class AutoComplete extends Component {
  componentDidMount() {
    this.suggestions = this.filterSuggestions(this.props.suggestions, this.props.value);
  }

  componentWillUpdate(nextProps, nextState) {
    this.suggestions = this.filterSuggestions(nextProps.suggestions, nextProps.value);
  }

  getSuggestionText = suggestion => {
    if (this.props.suggestionObjectTextProperty) {
      return suggestion[this.props.suggestionObjectTextProperty];
    }

    return suggestion;
  }

  isSimilar = (value, suggestionText) => {
    const suggestionScore = stringSimilarity.compareTwoStrings(suggestionText, value);
    return suggestionScore >= this.props.minimumSimilarityScore;
  }

  shouldFilterSuggestions = (newSuggestions, value) => {
    return newSuggestions && newSuggestions.length && value && !this.selectedSuggestion;
  }

  filterSuggestions = (newSuggestions, value) => {
    if (!this.shouldFilterSuggestions(newSuggestions, value)) {
      return {};
    }

    return newSuggestions.reduce((suggestions, suggestion) => {
      const suggestionText = this.getSuggestionText(suggestion);

      if (!suggestionText || !this.isSimilar(value, suggestionText)) {
        return suggestions;
      }

      suggestions[suggestionText] = suggestion;
      return suggestions;
    }, {});
  }

  onChangeText = value => {
    this.selectedSuggestion = false;

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  suggestionClick = suggestion => () => {
    this.selectedSuggestion = true;
    this.suggestions = {};
    this.props.onSelect(suggestion);
  }

  renderSuggestions = () => {
    const suggestionTexts = Object.keys(this.suggestions || {});
    if (!suggestionTexts.length) {
      return null;
    }

    return (
      <View style={[Styles.suggestionsWrapper, this.props.suggestionsWrapperStyle]}>
        <ScrollView
          horizontal={false}
          vertical={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={'handled'}
        >
          {suggestionTexts.map((text, index) => (
            <TouchableHighlight
              key={index}
              suggestionText={text}
              activeOpacity={0.6}
              style={[Styles.suggestion, this.props.suggestionStyle]}
              onPress={this.suggestionClick(this.suggestions[text])}
              underlayColor={Colors.reduxsagaSkyLightBlue}
            >
              <Text style={[Styles.suggestionText, this.props.suggestionTextStyle]}>{text}</Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={[Styles.wrapper, this.props.style]}>
        <TextInput
          {...this.props}
          underlineColorAndroid={'transparent'} //android
          onChangeText={this.onChangeText}
          style={[Styles.input, this.props.inputStyle]}
        />

        {this.renderSuggestions()}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  suggestionsWrapper: {
    maxHeight: verticalScale(100),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    backgroundColor: Colors.reduxsagaExtraLightGray
  },
  suggestion: {
    height: verticalScale(40),
    padding: verticalScale(5),
    borderBottomColor: Colors.transparent,
    borderBottomWidth: scale(1)
  },
  suggestionText: {
    ...Fonts.style.textMediumLightGT,
    fontSize: Fonts.size.bodyText,
    color: Colors.reduxsagaBlack,
    opacity: 1
  },
  input: {
    ...Fonts.style.textLightGT,
    height: verticalScale(30),
    borderBottomWidth: scale(1),
    padding: 0 // android
  },
  wrapper: {}
});

AutoComplete.propTypes = {
  suggestions: PropTypes.array,
  value: PropTypes.string,
  minimumSimilarityScore: PropTypes.number,
  suggestionObjectTextProperty: PropTypes.string,
  onChangeText: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  suggestionsWrapperStyle: PropTypes.any,
  suggestionStyle: PropTypes.any,
  suggestionTextStyle: PropTypes.any,
  style: PropTypes.any,
  inputStyle: PropTypes.any
};

AutoComplete.defaultProps = {
  minimumSimilarityScore: 0.6
};

export default AutoComplete;
