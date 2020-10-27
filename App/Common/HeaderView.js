import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  LayoutAnimation,
  Platform
} from 'react-native';
import { Images, Colors, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { EventRegister } from 'react-native-event-listeners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LanguageAction from '../Redux/Language';
import { toJS } from 'immutable';

class HeaderView extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      LayoutAnimation.easeInEaseOut();
    }
  }

  render () {
    let { language } = this.props;
    const lang = language.lang || 'EN';

    return (
      <View style={{
        height: DimensionManager.verticalScale(80),
        backgroundColor: Colors.reduxsagaBlue
      }}>
        <Text style={{
          fontSize: DimensionManager.scale(36),
          color: Colors.transparent,
          textAlign: 'center',
          marginTop: DimensionManager.verticalScale(24)
        }}>reduxsaga</Text>

        <View style={{
          marginTop: DimensionManager.scale(-24),
          alignItems: 'flex-end',
          marginRight: DimensionManager.scale(12),
        }}>
          <ModalDropdown
            defaultValue={lang}
            animated={true}
            options={['EN', 'ZH', 'DE', 'FR', 'GB']}
            showsVerticalScrollIndicator={false}
            textStyle={{
              color: Colors.transparent,
              fontSize: DimensionManager.scale(16),
            }}
            dropdownTextHighlightStyle={{
              color: Colors.black
            }}
            style={{
              fontSize: DimensionManager.scale(24),
              textAlign: 'center',
              alignItems: 'center',
              color: Colors.transparent,
              borderRadius: 5,
              marginRight: DimensionManager.scale(12),
            }}
            dropdownStyle={{
              width: DimensionManager.scale(60),
              height: DimensionManager.verticalScale(100),
              borderRadius: 5,
              alignItems: 'center',
              textAlign: 'center',
              fontSize: DimensionManager.scale(24),
            }}
            dropdownTextStyle={{
              fontSize: DimensionManager.scale(16),
            }}
            onSelect={(idx, value) => {
              this.props.navigation.dispatch(LanguageAction.languageSet(value));
              EventRegister.emit('languageReset', {data: value});
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HeaderView));
