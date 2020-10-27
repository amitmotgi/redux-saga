import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { EventRegister } from 'react-native-event-listeners';
import UserActions from '../Redux/User';
import { withNavigation } from 'react-navigation';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#000';
const DEFAULT_DIGIT_TXT_COLOR = '#000';
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];

class CountDownView extends Component {
  static propTypes = {
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    timeToShow: PropTypes.array,
    size: PropTypes.number,
    until: PropTypes.number,
    onFinish: PropTypes.func,
    onPress: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  state = {
    until: Math.max(this.props.until, 0),
    wentBackgroundAt: null,
  };

  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.until !== nextProps.until) {
      this.setState({
        until: Math.max(nextProps.until, 0)
      });
    }
  }

  _handleAppStateChange = currentAppState => {
    const {until, wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      const diff = (Date.now() - wentBackgroundAt) / 1000.0;
      this.setState({until: Math.max(0, until - diff)});
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  }

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const {until} = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      this.setState({until: 0});
      if (this.onFinish) {
        this.onFinish();
      }
    } else {
      this.setState({until: until - 1});
    }

    /* Resetting the i18n Internationalization language */
    EventRegister.addEventListener('lendingTimer', () => {
      const { navigation } = this.props;
      const { dispatch } = navigation;

      dispatch(UserActions.authenticateUser({
        lendingTimer: this.state.until
      }));

    });
  };

  renderDigit = (val) => {
    const {digitBgColor, digitTxtColor, size} = this.props;
    return (
      <View style={{
        borderRadius: 8,
        marginLeft: DimensionManager.scale(6),
        backgroundColor: digitBgColor,
        height: DimensionManager.verticalScale(this.props.height),
        width: DimensionManager.scale(this.props.width),
        alignSelf: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          color: Colors.transparent,
          fontWeight: 'bold',
          fontSize: size,
          fontWeight: 'bold',
          textAlign: 'center',
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 1
        }}>
          {val}
        </Text>
      </View>
    );
  };

  renderDoubleDigits = (hrs, min, sec) => {
    const {timeTxtColor, size} = this.props;

    return (
      <View style={{
        flexDirection: 'column',
        marginLeft: DimensionManager.scale(102),
        marginRight: DimensionManager.scale(102),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          {this.renderDigit(hrs)}
          {this.renderDigit(min)}
          {this.renderDigit(sec)}
        </View>
      </View>

    );
  };

  renderCountDown() {
    const {timeToShow} = this.props;
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');

    return (
      <View>
        {this.renderDoubleDigits(newTime[1], newTime[2], newTime[3])}
      </View>
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.renderCountDown()}
      </View>
    );
  }
}

CountDownView.defaultProps = {
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  labelD: "Days",
  labelH: "Hours",
  labelM: "Minutes",
  labelS: "Seconds",
  until: 0,
  size: 15,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    marginTop: DimensionManager.verticalScale(2),
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {
    borderRadius: 5,
    marginHorizontal: DimensionManager.scale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CountDownView));
