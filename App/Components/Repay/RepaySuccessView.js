import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Images, DimensionManager, Colors, Fonts } from '../../Themes';
import I18n from '../../I18n';
import HeaderBarOnboardingView from '../../Common/HeaderBarOnboardingView';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import colors from '../../Themes/Colors';

class RepaySuccessView extends Component {

  constructor(props) {
    super(props);
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
        <Text style={[Fonts.style.h3BoldGT, {
          textAlign: 'center',
          color: Colors.transparent,
          marginTop: DimensionManager.verticalScale(63)
        }]}>
          Thanks!
        </Text>
        <Text style={[Fonts.style.h3BoldGT, {
          textAlign: 'center',
          color: Colors.transparent,
          fontSize: DimensionManager.scale(18),
          marginTop: DimensionManager.verticalScale(7),
          fontWeight: 'normal',
          marginLeft: DimensionManager.scale(44),
          marginRight: DimensionManager.scale(47)
        }]}>
          You’ve just completed a one-time payment
          to your reduxsagait line from your Mastercard debit •••{this.props.payment.lastFourDigits}.
        </Text>
      </View>
    );
  }

  renderButton = () => {
    const { navigation } = this.props;
    return (
      <View>
        <TouchableOpacityView
            invertColor={false}
            active={true}
            label={'Go to dashboard'}
            onPress={()=> {
              navigation.navigate('Dashboard');
            }}
            style={{
              backgroundColor: Colors.reduxsagaGreen,
              alignSelf: 'center',
              marginTop: DimensionManager.verticalScale(200),
              height: DimensionManager.verticalScale(50)
            }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{'bottom': 'never'}}
        style={styles.wrapper}>
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView
          title={''}
          hideNextBtn={true}
          hideStep={true}
        />
        <ScrollView style={styles.containerStyle}>
          {this.renderMainPart()}
          {this.renderButton()}
        </ScrollView>
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
    // marginLeft: DimensionManager.scale(40),
    // marginRight: DimensionManager.scale(40)
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(RepaySuccessView));
