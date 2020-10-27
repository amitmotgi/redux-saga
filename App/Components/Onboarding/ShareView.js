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
import Icon from 'react-native-vector-icons/FontAwesome';
import { PageStyleConfig } from '../../Config/PageStyleConfig';

class ShareView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{},
        { icon: 'twitter',linkUrl: 'https://twitter.com/ihavereduxsaga'},
        { icon: 'facebook-square',style: { marginTop: DimensionManager.verticalScale(48) } ,linkUrl: 'https://www.facebook.com/ihavereduxsaga/'},
        { icon: 'telegram', style: { marginTop: DimensionManager.verticalScale(42) } ,linkUrl: 'https://t.me/ihavereduxsaga'},
        { icon: 'linkedin-square', style: { marginTop: DimensionManager.verticalScale(45) },linkUrl: 'https://www.linkedin.com/company/ihavereduxsaga/' }
      ]
    };
  }

  componentDidMount() {}

  renderIcon = ({ name, onChange = () => {} }) => {
    return (
      <TouchableOpacity onPress={onChange}>
        <Icon name={name} color={Colors.transparent} size={DimensionManager.verticalScale(58)} />
      </TouchableOpacity>
    );
  };
  renderShareView = () => {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <View style={styles.content}>
        <Text style={styles.label}>We’ll notify you when reduxsaga is available near you</Text>
        {data.map(i => (
          <View key={i.icon} style={[styles.iconView, i.style]}>
            {this.renderIcon({ name: i.icon,onChange() {
              //Try to open the given url with any of the installed apps.
               Linking.canOpenURL(i.linkUrl).then(supported => {
                if (!supported) {
                  console.log('Can\'t handle url: ' + i.linkUrl);
                } else {
                  return Linking.openURL(i.linkUrl);// installed=》open in （twwitter/linkedin...）;Not Installed=》open in safari
                }
              }).catch(err => console.error('An error occurred', err));
             }
             })}
          </View>
        ))}
        <View style={{paddingHorizontal: DimensionManager.scale(PageStyleConfig.horizontalNumber),width:'100%'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PersonalInfoRequireInfo');
          }}
          style={[
            styles.button,
            {
              marginTop: DimensionManager.verticalScale(62),
              marginBottom: DimensionManager.verticalScale(43),
            }
          ]}
        >
          <Text style={styles.buttonLabel}>Close</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        {/* TODO add position is not a good idea, maybe use statusBar*/}
        <View style={styles.safeArea} />
        <HeaderBarOnboardingView hideNextBtn={true} title={''} stepValue={1} hideStep />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              {
                marginTop: DimensionManager.verticalScale(-12),
                zIndex: 2,
                alignSelf: 'center'
              }
            ]}
          >
            See you soon
          </Text>
          <ScrollView>{this.renderShareView()}</ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  content: {
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.h3BoldGT,
    opacity: 1,
    color: Colors.transparent,
  },
  label: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    width: DimensionManager.scale(230),
    textAlign: 'center',
    color: Colors.transparent,
    marginTop: DimensionManager.verticalScale(28),
    lineHeight: 1.33 * 18
  },
  iconView: {
    marginTop: DimensionManager.verticalScale(50)
  },
  button: {
    width: '100%',//DimensionManager.scale(335),
    height: DimensionManager.verticalScale(50),
    backgroundColor: Colors.reduxsagaGreen,
    justifyContent: 'center'
  },
  buttonLabel: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.transparent
  }
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withNavigation(ShareView));
