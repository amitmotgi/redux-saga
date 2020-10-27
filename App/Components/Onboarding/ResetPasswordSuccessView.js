import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import I18n from '../../I18n';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import colors from '../../Themes/Colors';
import {
  ResetUserreduxsagaentials
} from '../../Common/Helper/reduxsagaentials';

class ResetPasswordSuccessView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;
    SetUserreduxsagaentials({
      username: '',
      password: ''
    });
    ResetUserreduxsagaentials(dispatch);
  }

  renderMainPart = () => {
    return (
      <View style={{
        alignItems: 'center',
        marginTop: DimensionManager.verticalScale(-5)
      }}>
        <Icon
          name="check"
          size={168}
          color={Colors.transparent}
        />
        <Text style={[Fonts.style.h3BoldGT, {textAlign: 'center', color: Colors.transparent}]}>
          {I18n.t('ResetPasswordSuccessMsg')}
        </Text>
      </View>
    );
  }

  renderButton = () => {
    const { navigation } = this.props;
    return (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(84),
          alignSelf: 'center'
        }}>
        <TouchableOpacityView
            invertColor={false}
            active={true}
            label={I18n.t('ResetPasswordSuccessSubmitLabel')}
            onPress={()=>{navigation.navigate('Login');}}
            style={{backgroundColor: Colors.reduxsagaGreen}}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          title={''}
          hideNextBtn={true}
          stepValue={3}
        />
        <View style={styles.containerStyle}>
          {this.renderMainPart()}
          {this.renderButton()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  containerStyle: {
    marginLeft: DimensionManager.scale(40),
    marginRight: DimensionManager.scale(40)
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ResetPasswordSuccessView));
