import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import email from 'react-native-email';

class ContactUsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      isSubjectFocus: false,
      content: '',
      isContentFocus: false,
    };
  }



  getLabelStyle = (value = '', isFocus = false) => {
    return [styles.label, value && styles.notEmpty, isFocus && styles.labelFoucus];
  }
  getBorderColorStyle = (isFocus) => {
    return isFocus ? Colors.reduxsagaActiveBlue : Colors.reduxsagaExtraLine;
  }
  onSubjectFocus = () => {
    this.setState({
      isSubjectFocus: true,
    });
  }


  onSubjectBlur = () => {
    this.setState({
      isSubjectFocus: false,
    });
  }

  onContentFocus = () => {
    this.setState({
      isContentFocus: true,
    });
  }


  onZContentBlur = () => {
    this.setState({
      isContentFocus: false,
    });
  }

  getMainPart() {
    const { subject, isSubjectFocus, content, isContentFocus } = this.state;
    const sujectPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(30)
      }}>
        <Text style={this.getLabelStyle(subject, isSubjectFocus)}>
          {i18n.t('subjectLabel')}
        </Text>
        <TextField
          placeholder={i18n.t('subjectHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ subject: text });

          }}
          borderColor={this.getBorderColorStyle(isSubjectFocus)}
          onFocus={this.onSubjectFocus}
          onBlur={this.onSubjectBlur}
          value={subject}
        />
      </View>
    );
    const contentPart = (
      <View style={{
        marginTop: DimensionManager.verticalScale(47),
        height: DimensionManager.verticalScale(154)
      }}>
        <Text style={this.getLabelStyle(content, isContentFocus)}>
          {i18n.t('cContentLabel')}
        </Text>
        <TextInput
          placeholder={i18n.t('cContentHint')}
          secureTextEntry={false}
          onChangeText={(text) => {
            this.setState({ content: text });
          }}
          multiline={true}
          style={[this.getLabelStyle(content, isContentFocus), {
            height: DimensionManager.verticalScale(140),
            Colors: Colors.reduxsagaExtraLine,
            fontSize: DimensionManager.scale(18),
            marginTop:DimensionManager.verticalScale(10)
          }]}
          onFocus={this.onContentFocus}
          onBlur={this.onZContentBlur}
          value={content}
        />
        <View style={{
          borderWidth: 1,
          opacity: 0.6,
          borderColor: this.getBorderColorStyle(isContentFocus)
        }} />
        <Text style={[Fonts.style.textSmallNormalGT, {
          height: DimensionManager.verticalScale(120),
          Colors: Colors.reduxsagaExtraLine,
          fontSize: DimensionManager.scale(12),
          alignSelf:'flex-end'
        }]}
        >
          {content.length}/300
        </Text>
      </View>
    );
    const isButtonActive = subject && content;
    const buttonPart = (
      <View
        style={{
          marginTop: DimensionManager.verticalScale(216),
          alignSelf: 'center'
        }}
      >
        <TouchableOpacityView
          invertColor={false}
          active={isButtonActive}
          label={i18n.t('Send')}
          onPress={() => {
            // this.props.navigation.navigate('Dashboard');
            const to = ['amit.motgi@gmail.com'] // string or array of email addresses
            email(to, {
              subject: subject,
              body: content,
            }).catch((err) => {
              console.log('err', err);
             });
          }}
        />
      </View>
    );

    return (
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid={true}
        extraScrollHeight={DimensionManager.verticalScale(100)}
      >
        <View style={{
          flex: 1,
          marginLeft: DimensionManager.scale(20),
          marginRight: DimensionManager.scale(20),
          marginTop: DimensionManager.verticalScale(33),
        }}>
          <Text style={[Fonts.style.textRegularNormalGT, {
            color: Colors.reduxsagaBlack,
            lineHeight: DimensionManager.verticalScale(18) * 1.5
          }]}>
            {i18n.t('tipcontactUs')}
          </Text>
          {sujectPart}
          {contentPart}
          {buttonPart}
        </View>
      </KeyboardAwareScrollView>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('contactUsHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
        />
        {this.getMainPart()}
      </SafeAreaView >
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

  title: {
    ...Fonts.style.h3BoldGT,
    opacity: 1,
    color: Colors.transparent
  },
  label: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.reduxsagaSkyLightGray,
    fontSize: Fonts.size.small,
  },
  notEmpty: {
    opacity: 1,
  },
  labelFoucus: {
    color: Colors.reduxsagaActiveBlue,
    opacity: 1,
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ContactUsView));
