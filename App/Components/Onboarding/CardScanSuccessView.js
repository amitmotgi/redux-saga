
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from '../../I18n';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class CardScanSuccessView extends Component {

  constructor(props) {
    super(props);
    this.rotateAnim = new Animated.Value(0);
  }

  componentDidMount() {
    this.spring();
    setTimeout(() => {
      const { navigation } = this.props;
      // navigation.navigate('BankLinkingName');
    }, 3000);
  }

  onSpringCompletion = () => {
    if (true) {
      this.spring();
    }
  }

  spring = () => {
  this.rotateAnim.setValue(0);
    Animated.timing(
      this.rotateAnim,
      {
        toValue: 360,
        duration: 1000,
      }
    ).start(this.onSpringCompletion);
  };

  getMainPart = () => {
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <View style={{alignSelf: 'center'}}>
          <Icon
            name="check"
            size={168}
            color={Colors.transparent}
          />
        </View>
        <Text style={[Fonts.style.h3BoldGT, {textAlign: 'center', color: Colors.transparent,marginTop:DimensionManager.verticalScale(63)}]}>
          {I18n.t('yes')}
        </Text>
        <Text style={[Fonts.style.textLightGT, {textAlign: 'center', color: Colors.transparent,marginTop:DimensionManager.verticalScale(9),width:DimensionManager.scale(248)}]}>
          {I18n.t('successLoginInToChaseBank')}
        </Text>
        <Animated.Image
          source={require('../../Common/Images/oval-9.png')}
          style={{
            width: DimensionManager.scale(38),
            height: DimensionManager.verticalScale(38),
            margin: DimensionManager.verticalScale(63),
            transform: [{
              rotateZ: this.rotateAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],})
            }]
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
            hideNextBtn={true}
            hideBackBtn={false}
            hideStep={true}
            style={{
              marginTop: DimensionManager.verticalScale(-7),
            }}
        />
        <View style={styles.containerStyle}>
          {this.getMainPart()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.reduxsagaDarkBlue,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  containerStyle: {
    marginTop: DimensionManager.verticalScale(24),
    marginLeft: DimensionManager.scale(34),
    marginRight: DimensionManager.scale(32)
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CardScanSuccessView));
