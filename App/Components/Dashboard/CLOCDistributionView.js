import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  View,
  LayoutAnimation,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
  InteractionManager,
  SafeAreaView,
 } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../../Themes';

import I18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import TextField from '../../Common/TextField';
import TouchableOpacityView from '../../Common/TouchableOpacityView';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';
import Slider from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyView from '../../Common/CurrencyView';
import CurrencyFormatView from '../../Common/CurrencyFormatView';
import { Switch } from 'react-native-switch';
import { Dropdown } from 'react-native-material-dropdown';
import DistributionActions from '../../Redux/Distribution';
import Modal from 'react-native-modal';

class CLOCDistributionView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0.00,
      amountType: 'USD',
      walletAddress: '',
      showPreview: false
    };
  }

  renderHeader() {
    return (
      <View style={styles.loanBalance}>
        <View>
          <Text style={[styles.loanHeadText, {
            fontSize: DimensionManager.scale(12),
            fontWeight: 'normal',
            fontStyle: 'normal',

          }]}>
            $80,000.00 Available
          </Text>
        </View>

      </View>
    );
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        opacity: 0.2
      }} />
    )
  }

  renderTransfer() {
    return (
      <View style={[{
        marginTop: DimensionManager.verticalScale(20),

      }]}>
        <Text style={{
          ...styles.transferText
        }}>
          {I18n.t('transfer')}
        </Text>
      </View>
    )
  }

  renderAmount() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    let data = [
      {
        value: 'USD',
      },
      {
        value: 'USDT',
      },
      {
        value: 'DAI',
      }
    ];
    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
        <Text style={[styles.amount, {
          marginRight: DimensionManager.scale(6)
        }]}>
          $
        </Text>
        <TextInput
          defaultValue={this.state.amount}
          style={styles.amount}
          ref={'amount'} // eslint-disable-line react/no-string-refs
          secureTextEntry={false}
          autoCorrect={false}
          value={this.state.amount || ''}
          keyboardType={'numeric'}
          onBlur={() => {
            // update the redux state
            dispatch(DistributionActions.distributionWithdrawalAmount({
              withdrawalAmount: parseInt(this.state.amount),
              currencyType: this.state.amountType
            }))
          }}
          onChangeText={(data) => {
            this.setState({amount: data});
          }} />

        <View style={{
          alignItems: 'center',
        }}>
          <Dropdown
            containerStyle={{
              width: DimensionManager.scale(72),
              marginLeft: DimensionManager.scale(20),
              justifyContent: 'center',
            }}
            selectedItemColor={'#eeeeee'}
            label={''}
            data={data}
            value={this.state.amountType || data[0].value}
            itemTextStyle={styles.amountType}
            onChangeText={(data) => {
              this.setState({amountType: data});
              dispatch(DistributionActions.distributionWithdrawalAmount({
                withdrawalAmount: parseInt(this.state.amount),
                currencyType: this.state.amountType
              }))
            }}
          />
        </View>
      </View>
    )
  }

  renderAmountSelection() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: DimensionManager.verticalScale(63),
      }}>
        <TouchableOpacity style={{
          borderWidth: DimensionManager.scale(1),
          backgroundColor: Colors.transparent,
          borderColor: Colors.reduxsagaGreen,
          width: DimensionManager.scale(60),
          height: DimensionManager.verticalScale(30),
          justifyContent: 'center',
          marginRight: DimensionManager.scale(20)
        }}>
          <Text style={styles.amountSelect}>
            Max
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          borderWidth: DimensionManager.scale(1),
          backgroundColor: Colors.transparent,
          borderColor: Colors.reduxsagaGreen,
          width: DimensionManager.scale(60),
          height: DimensionManager.verticalScale(30),
          justifyContent: 'center',
          marginRight: DimensionManager.scale(20)
        }}>
          <Text style={styles.amountSelect}>
            1/2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          borderWidth: DimensionManager.scale(1),
          backgroundColor: Colors.transparent,
          borderColor: Colors.reduxsagaGreen,
          width: DimensionManager.scale(60),
          height: DimensionManager.verticalScale(30),
          justifyContent: 'center'
        }}>
          <Text style={styles.amountSelect}>
            1/4
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  renderBankInfo() {
    return (
      <View style={{
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(16),
            marginBottom: DimensionManager.verticalScale(16)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'left',
              fontWeight: '500',
              opacity: 0.6,
              fontSize: DimensionManager.scale(14),
            }]}>
             Chase
            </Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: '50%',
            marginTop: DimensionManager.verticalScale(16),
            marginBottom: DimensionManager.verticalScale(16)
          }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              textAlign: 'right',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
              opacity: 0.6
            }]}>
              ****5526
            </Text>
          </View>
        </View>

      </View>
    );
  }

  renderWalletAddress() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <View style={{
        flexDirection: 'column',
        marginLeft: DimensionManager.scale(20),
        marginRight: DimensionManager.scale(20),
        height: DimensionManager.verticalScale(64)
      }}>
        <Text style={[Fonts.style.textMediumGT, {
          color: Colors.reduxsagaBlack,
          textAlign: 'left',
          fontWeight: 'normal',
          opacity: 0.6,
          fontSize: DimensionManager.scale(14),
          marginTop: DimensionManager.verticalScale(4)
        }]}>
         Paste Tether Wallet address here:
        </Text>

        <TextInput
          defaultValue={this.state.walletAddress}
          style={styles.walletAddress}
          ref={'walletAddress'} // eslint-disable-line react/no-string-refs
          secureTextEntry={false}
          autoCorrect={false}
          value={this.state.walletAddress || ''}
          keyboardType={'default'}
          onBlur={() => {
            // update the redux state
            dispatch(DistributionActions.distributionWithdrawalAmount({
              walletAddress: this.state.walletAddress,
              currencyType: this.state.amountType
            }))
          }}
          onChangeText={(data) => {
            this.setState({walletAddress: data});
          }} />
      </View>
    );
  }

  renderBankSelection() {
    return (
      <View style={{
        marginTop: DimensionManager.verticalScale(29),
        flexDirection: 'column'
      }}>
        <Text style={{
          ...styles.transferText
        }}>
          {I18n.t('to')}
        </Text>
        <View style={{
          marginTop: DimensionManager.verticalScale(20)
        }}>
          {this.renderLine()}
          <TouchableOpacity style={{

          }}
            onPress={() => {
              this.props.navigation.navigate('ChooseAccount')
            }}
          >
            {this.state.amountType === 'USD' ? this.renderBankInfo() :
              null
            }
          </TouchableOpacity>
          {this.state.amountType !== 'USD' ? this.renderWalletAddress() : null}
          {this.renderLine()}
        </View>
      </View>
    );
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 0.5,
        borderColor: Colors.reduxsagaLine,
        borderBottomColor: Colors.reduxsagaBlack,
        opacity: 0.2
      }} />
    )
  }

  renderModalText() {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={styles.modalText}>
          {I18n.t('weAreMoving')}
        </Text>
        <Text style={[styles.modalText, {
          fontWeight: '500'
        }]}>
          $10,000
        </Text>
        <Text style={styles.modalText}>
          {I18n.t('fromYourCLOC')}
        </Text>
        {this.state.amountType === 'USD' ? (
          <Text style={styles.modalText}>
            {I18n.t('toYour')}
          </Text>
        ) : (
          <Text style={styles.modalText}>
            {I18n.t('toThisAddress')}
          </Text>
        )}

        {this.state.amountType === 'USD' ? (
          <Text style={[styles.modalText, {
            fontWeight: '500',
            lineHeight: 26
          }]}>
            Chase checking account
          </Text>
        ) : (
          <Text style={[styles.modalText, {
            fontWeight: '500',
            lineHeight: 26
          }]}>
            {this.state.walletAddress}
          </Text>
        )}

        {this.state.amountType !== 'USD' ? (
          <View>
            <Text style={styles.modalText}>
              {I18n.t('pleaseDoubleCheckThisAddress')}
            </Text>
            <Text style={styles.modalText}>
              {I18n.t('anIncorrectAddress')}
            </Text>
            <Text style={styles.modalText}>
              {I18n.t('totalLoss')}
            </Text>
          </View>
        ) : null}

        <View style={{
          marginTop: DimensionManager.verticalScale(12.5),
          marginBottom: DimensionManager.verticalScale(12.5),

        }}>
          {this.renderModalData('valueOfCLOC', 200000)}
          {this.renderModalData('toChaseChecking', 10000)}
          {this.renderModalData('afterTransaction', 190000)}
        </View>
        <Text style={styles.modalText}>
          {I18n.t('thisShouldTakeACoupleOf')}
        </Text>
        <Text style={styles.modalText}>
          {I18n.t('daysToComplete')}
        </Text>

        <TouchableOpacityView
          style={{
            width: DimensionManager.scale(207),
            alignSelf: 'center',
            marginTop: DimensionManager.verticalScale(20),
            marginBottom: DimensionManager.verticalScale(20),
          }}
          active={true}
          label={I18n.t('makeTransfer')}
          onPress={() => {
            this.props.navigation.navigate('TransferConfirmed');
          }} />

      </View>
    );
  }

  renderModalData(lang, values) {
    return (
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
        <Text style={styles.modalText}>
          {I18n.t(lang)}
        </Text>
        <Text style={[styles.modalText, {
          paddingLeft: DimensionManager.scale(6)
        }]}>
          ${values}
        </Text>
      </View>
    )
  }

  renderPreviewModal() {
    return (
      <Modal
        isVisible={this.state.showPreview}
        backdropColor={Colors.reduxsagaBlack}
        backdropOpacity={0.5}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: Colors.transparent,
          marginBottom: DimensionManager.verticalScale(33),
        }}>
          <View style={{
            flexDirection: 'column',
          }}>
            <TouchableOpacity
              onPress={() => this.setState({
                showPreview: false
            })}>
              <Image
                source={require('../../Common/Images/x-icon.png')}
                style={{
                  marginTop: DimensionManager.verticalScale(14),
                  marginRight: DimensionManager.scale(14),
                  height: DimensionManager.verticalScale(20),
                  width: DimensionManager.scale(20),
                  resizeMode: 'contain',
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <Text style={[Fonts.style.h5TextBold,{
              textAlign: 'center',
              color: Colors.reduxsagaBlack,
              opacity: 1,
              fontWeight: '500',
              fontSize: DimensionManager.scale(18),
            }]}>So...Just to be clear:</Text>
          </View>

          <View style={{
            marginTop: DimensionManager.verticalScale(15),
            marginBottom: DimensionManager.verticalScale(15)

          }}>
            {this.renderLine()}
          </View>

          <View style={{
            marginTop: DimensionManager.verticalScale(15)
          }}>
            {this.renderModalText()}
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const { navigation } = this.props;
    const { dispatch } = navigation;

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
          title={I18n.t('withDrawFromCLOC')} />
          {this.renderHeader()}

          <ScrollView
            horizontal={false}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          >
            {this.renderTransfer()}
            {this.renderAmount()}
            {this.renderAmountSelection()}
            {this.renderBankSelection()}
            {this.renderPreviewModal()}

            <View style={{
              backgroundColor: Colors.transparent
            }}>
              <TouchableOpacityView
                style={{
                  width: DimensionManager.scale(295),
                  alignSelf: 'center',
                  marginTop: DimensionManager.verticalScale(20),
                  marginBottom: DimensionManager.verticalScale(20),
                }}
                active={true}
                label={I18n.t('preview')}
                onPress={() => {
                  this.setState({
                    showPreview: true
                  })
                }} />
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    height: DimensionManager.verticalScale(44),
    backgroundColor: Colors.reduxsagaDarkBlue
  },
  loanBalance: {
    height: DimensionManager.verticalScale(26),
    backgroundColor: Colors.reduxsagaDarkBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanHeadText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.6,
    color: Colors.transparent,
    marginTop: DimensionManager.verticalScale(-30),
  },
  loanContentView: {
    marginTop: DimensionManager.verticalScale(5),
    marginBottom: DimensionManager.verticalScale(18),
  },
  transferText: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(17),
    textAlign: 'center'
  },
  walletAddress: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(19),
    textAlign: 'left',
  },
  amount: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(48),
    textAlign: 'center',
    alignSelf: 'center'
  },
  amountType: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(18),
    textAlign: 'center',
    alignSelf: 'center'
  },
  amountSelect: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaGreen,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center',
    fontStyle: 'normal',
  },
  modalText: {
    ...Fonts.style.textMediumGT,
    fontWeight: 'normal',
    color: Colors.reduxsagaBlack,
    fontSize: DimensionManager.scale(14),
    textAlign: 'center',
  },
});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CLOCDistributionView));
