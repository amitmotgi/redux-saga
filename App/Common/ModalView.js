import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import i18n from '../I18n';
import Modal from 'react-native-modal';
import TouchableOpacityView from './TouchableOpacityView';
import QRCode from 'react-native-qrcode';

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQRCode: false,
      isVisible: this.props.isVisible
    };
  }

  tcListText = (index, text) => {
    return (
      <View style={styles.tcListView}>
        <Text style={[styles.tcViewText, styles.tcListViewIndexText]}>{index}</Text>
        <Text style={[styles.tcViewText, styles.tcListViewTextContent]}>{text}</Text>
      </View>
    );
  };

  tcView = () => {
    return (
      <View style={styles.tcView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.tcViewText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ut justo sit
            amet bibendum. Integer accumsan vulputate tristique. Curabitur et imperdiet eros.
          </Text>
          {this.tcListText(
            1,
            'Quisque faucibus ex ut scelerisque ullamcorper. Pellentesque ac sem imperdiet, varius elit condimentum, vulputate arcu. Donec quis massa risus.'
          )}
          {this.tcListText(
            2,
            'Nullam gravida porta elit eget interdum. Maecenas id tellus fermentum, feugiat leo sit amet, iaculis quam. Integer dui ex, feugiat quis fermentum quis, ornare quis quam.'
          )}
          {this.tcListText(
            3,
            'Nunc consectetur mi fermentum risus euismod, ac aliquet tortor mollis. Donec dictum leo ut mi aliquet, eget cursus ipsum consequat. Nulla nulla ex, volutpat sit amet posuere quis, cursus non dolor.'
          )}
          <Text style={[styles.tcViewText, styles.tcViewContentTitle]}>Integer Ultricies</Text>
          <Text style={styles.tcViewText}>
            Integer ultricies pretium blandit. Donec a dui eros. Proin eu turpis ac ligula tristique
            suscipit. Praesent eros nunc, mollis cursus lorem ornare, pharetra suscipit augue.
            Mauris ornare magna sit amet ante imperdiet, non maximus metus tempor. Donec non
            ullamcorper tortor, non tincidunt dolor. Aenean convallis, sem vel vulputate egestas, ex
            dui aliquam est, id tempus lectus augue quis augue.
          </Text>
          <TouchableOpacity onPress={() => this.props.onPress()} style={styles.footerButton}>
            <Text style={styles.footerButtonLabel}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: Colors.transparent
        }}
      >
        <ScrollView
          style={{
            width: DimensionManager.scale(355),
            backgroundColor: Colors.transparent,
            marginLeft: DimensionManager.scale(20),
            marginRight: DimensionManager.scale(20),
            marginTop: DimensionManager.verticalScale(60),
            marginBottom: DimensionManager.verticalScale(60)
          }}
        >
          <Modal
            isVisible={this.props.isVisible}
            backdropColor={Colors.reduxsagaBlack}
            backdropOpacity={0.5}
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: Colors.transparent,
                marginBottom: DimensionManager.verticalScale(33)
              }}
            >
              {this.props.showCloseBtn ? (
                <TouchableOpacity onPress={() => this.props.onPress()}>
                  <Image
                    source={require('./Images/x-icon.png')}
                    style={{
                      marginTop: DimensionManager.verticalScale(21),
                      marginRight: DimensionManager.scale(20),
                      height: DimensionManager.verticalScale(24),
                      width: DimensionManager.scale(24),
                      resizeMode: 'contain',
                      alignSelf: 'flex-end'
                    }}
                  />
                </TouchableOpacity>
              ) : null}

              <Text
                style={[
                  Fonts.style.h5TextBold,
                  {
                    textAlign: 'center',
                    color: Colors.reduxsagaBlack,
                    opacity: 1,
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: DimensionManager.verticalScale(4)
                  }
                ]}
              >
                {this.props.title}
              </Text>

              {this.props.showTitleUnderline ? (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: DimensionManager.verticalScale(14),
                    width: '100%',
                    color: Colors.reduxsagaGray,
                    borderWidth: 0.5,
                    borderColor: Colors.reduxsagaGray
                  }}
                />
              ) : null}

              {!this.state.showQRCode ? (
                <Text
                  style={[
                    Fonts.style.textMediumLightGT,
                    {
                      textAlign: 'center',
                      marginTop: DimensionManager.verticalScale(8),
                      marginBottom: DimensionManager.verticalScale(30),
                      fontSize: 12
                    }
                  ]}
                >
                  {this.props.subTitle}
                </Text>
              ) : null}

              {!this.state.showQRCode ? this.tcView() : null}

              {this.props.showQRCode && this.state.showQRCode ? (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: DimensionManager.verticalScale(20)
                  }}
                >
                  <QRCode
                    value={this.props.addressQRCode}
                    size={150}
                    bgColor={Colors.reduxsagaBlack}
                    fgColor={'white'}
                  />
                </View>
              ) : null}

              {this.props.showAddressBtn && !this.state.showQRCode ? (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: DimensionManager.verticalScale(36),
                    marginBottom: DimensionManager.verticalScale(36),
                    backgroundColor: Colors.transparent
                  }}
                >
                  <TouchableOpacityView
                    active={true}
                    label={i18n.t('showAddress')}
                    onPress={() => {
                      this.setState({ showQRCode: true });
                      //this.props.navigation.navigate('CLOCConfirmed')
                    }}
                  />
                </View>
              ) : null}

              {this.props.showTitleUnderline ? (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: DimensionManager.verticalScale(14),
                    width: '100%',
                    color: Colors.reduxsagaGray,
                    borderWidth: 0.5,
                    borderColor: Colors.reduxsagaGray
                  }}
                />
              ) : null}

              {this.state.showQRCode ? (
                <View>
                  <Text
                    style={[
                      Fonts.style.textSmallNormalGT,
                      {
                        textAlign: 'center',
                        marginTop: DimensionManager.verticalScale(8),
                        marginBottom: DimensionManager.verticalScale(8),
                        opacity: 0.6
                      }
                    ]}
                  >
                    {this.props.addressQRCode}
                  </Text>

                  <View
                    style={{
                      alignSelf: 'center',
                      width: '100%',
                      color: Colors.reduxsagaGray,
                      borderWidth: 0.5,
                      borderColor: Colors.reduxsagaGray
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      height: DimensionManager.verticalScale(40),
                      alignSelf: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderColor: Colors.reduxsagaGray,
                        borderRightWidth: 0.5,
                        alignSelf: 'center'
                      }}
                    >
                      <Text
                        style={[
                          Fonts.style.textSmallNormalGT,
                          {
                            width: DimensionManager.scale(148),
                            textAlign: 'center',
                            opacity: 0.6
                          }
                        ]}
                      >
                        {i18n.t('share')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center'
                      }}
                    >
                      <Text
                        style={[
                          Fonts.style.textSmallNormalGT,
                          {
                            width: DimensionManager.scale(148),
                            textAlign: 'center',
                            opacity: 0.6
                          }
                        ]}
                      >
                        {i18n.t('copyAddress')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              {this.props.showDeclineAgreeBtns ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: DimensionManager.verticalScale(30)
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: DimensionManager.scale(139),
                      height: DimensionManager.scale(46),
                      borderRadius: 5,
                      backgroundColor: Colors.reduxsagaLightGreen,
                      justifyContent: 'center',
                      marginRight: DimensionManager.scale(11)
                    }}
                    onPress={() => {
                      this.props.onPress();
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.style.inputBoldGT,
                        fontWeight: '300',
                        color: Colors.transparent,
                        textAlign: 'center'
                      }}
                    >
                      Decline
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: DimensionManager.scale(139),
                      height: DimensionManager.scale(46),
                      borderRadius: 5,
                      backgroundColor: Colors.reduxsagaGreen,
                      justifyContent: 'center'
                    }}
                    onPress={() => {
                      this.props.onPress();
                      this.props.navigation.navigate('CodeVerify');
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.style.inputBoldGT,
                        fontWeight: '300',
                        color: Colors.transparent,
                        textAlign: 'center'
                      }}
                    >
                      Agree
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

ModalView.defaultProps = {
  showTitleUnderline: false,
  title: '',
  subTitle: '',
  showAddressBtn: false,
  showQRCode: false,
  addressQRCode: ''
};

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.h1BoldGT,
    color: Colors.transparent,
    textAlign: 'center'
  },
  tcView: {
    height: DimensionManager.verticalScale(526),
    marginHorizontal: DimensionManager.scale(20),
  },
  tcViewText: {
    ...Fonts.style.textMediumGT,
    opacity: 0.8,
    color: Colors.reduxsagaBlack,
    textAlign: 'left',
    lineHeight:1.43 * 14,
  },
  tcListView: {
    flexDirection: 'row',
    marginTop: DimensionManager.verticalScale(19)
  },
  tcListViewIndexText: {},
  tcListViewTextContent: {
    marginLeft: DimensionManager.scale(12)
  },
  tcViewContentTitle: {
    ...Fonts.style.textBoldNormalGT,
    color: Colors.reduxsagaBlack,
    opacity: 1,
    marginTop: DimensionManager.verticalScale(17),
    marginBottom: DimensionManager.verticalScale(20)
  },
  footerButton: {
    marginTop: DimensionManager.verticalScale(35),
    marginBottom: DimensionManager.verticalScale(40),
    height: DimensionManager.verticalScale(50),
    width: DimensionManager.scale(296),
    backgroundColor: Colors.reduxsagaDarkBlue,
    justifyContent: 'center'
  },
  footerButtonLabel: {
    ...Fonts.style.textBoldNormalGT,
    opacity: 1,
    color: Colors.transparent,
    textAlign: 'center'
  }
});

export default withNavigation(ModalView);
