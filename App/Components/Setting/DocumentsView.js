import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class DocumentsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doucumentList: [
        { date: '11/15/2018', linkUrl: 'https://twitter.com/ihavereduxsaga' },
        { date: '10/15/2018', linkUrl: 'https://www.facebook.com/ihavereduxsaga/' },
        { date: '09/15/2018', linkUrl: 'https://t.me/ihavereduxsaga' },
        { date: '08/15/2018', linkUrl: 'https://www.linkedin.com/company/ihavereduxsaga/' },
        { date: '07/15/2018', linkUrl: 'https://www.linkedin.com/company/ihavereduxsaga/' },
        { date: '06/15/2018', linkUrl: 'https://www.linkedin.com/company/ihavereduxsaga/' }
      ],
      contractualList: [
        { name: 'Line of reduxsagait agreement', date: '06/15/2018', linkUrl: 'https://twitter.com/ihavereduxsaga' }
      ]
    };
  }

  renderLine() {
    return (
      <View style={{
        borderWidth: 1,
        borderColor: Colors.reduxsagaLine,
        opacity: 0.2
      }}
      />
    );
  }

  renderHeaderDoucument = () => {
    return (
      <View style={{
        backgroundColor: '#9fbafb',
        marginTop: DimensionManager.verticalScale(33),
        width: '100%',
        height: DimensionManager.verticalScale(46),
        justifyContent: 'center'
      }}>
        <Text style={[Fonts.style.textSmallBoldGT, {
          color: Colors.transparent,
          marginLeft: DimensionManager.scale(20),
          opacity: 1
        }]}>
          {i18n.t('mmstatements')}
        </Text>
      </View>
    )
  }

  renderHeaderContractual = () => {
    return (
      <View style={{
        backgroundColor: '#9fbafb',
        width: '100%',
        height: DimensionManager.verticalScale(46),
        justifyContent: 'center'
      }}>
        <Text style={[Fonts.style.textSmallBoldGT, {
          color: Colors.transparent,
          marginLeft: DimensionManager.scale(20),
          opacity: 1
        }]}>
          {i18n.t('contradtualDoc')}
        </Text>
      </View>
    )
  }

  renderDocumentList = () => {
    const { navigation } = this.props;
    const { doucumentList } = this.state;
    return (
      <View style={{ flex: 0 }}>
        <FlatList
          data={doucumentList}
          ListHeaderComponent={this.renderHeaderDoucument}
          renderItem={({ item, index }) => (
            <View style={{
              backgroundColor: index % 2 === 1
                ? Colors.reduxsagaExtraLightBlue
                : Colors.transparent
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: DimensionManager.scale(27),
                  marginRight: DimensionManager.scale(12),
                  marginTop: DimensionManager.verticalScale(12),
                  marginBottom: DimensionManager.verticalScale(16),
                }}>
                <Text style={[Fonts.style.textMediumGT, {
                  color: Colors.reduxsagaDarkBlue,
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: DimensionManager.scale(14),
                }]}>
                  {item.date}
                </Text>
                <View style={{
                  flexDirection: 'row',
                }}>
                  <Image
                    source={require('../../Components/Images/arrow.png')}
                    style={{
                      height: DimensionManager.verticalScale(14),
                      width: DimensionManager.scale(8),
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        /></View>
    );
  }
  renderContractualList = () => {
    const { navigation } = this.props;
    const { contractualList } = this.state;
    return (
      <View style={{ flex: 0 }}>
        <FlatList
          data={contractualList}
          ListHeaderComponent={this.renderHeaderContractual}
          renderItem={({ item, index }) => (
            <View style={{
              backgroundColor: index % 2 === 1
                ? Colors.reduxsagaExtraLightBlue
                : Colors.transparent

            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: DimensionManager.scale(27),
                  marginRight: DimensionManager.scale(12),
                  marginTop: DimensionManager.verticalScale(14),
                  marginBottom: DimensionManager.verticalScale(14),

                }}>
                <Text style={[Fonts.style.textMediumGT, {
                  color: Colors.reduxsagaDarkBlue,
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: DimensionManager.scale(14),
                }]}>
                  {item.name} {item.date}
                </Text>
                <View style={{
                  flexDirection: 'row',
                }}>
                  <Image
                    source={require('../../Components/Images/arrow.png')}
                    style={{
                      height: DimensionManager.verticalScale(14),
                      width: DimensionManager.scale(8),
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        /></View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('documentsHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
        />
        <View style={{ flex: 1 }}>
          <Text style={[Fonts.style.textRegularNormalGT, {
            color: Colors.reduxsagaBlack,
            marginLeft: DimensionManager.scale(20),
            marginTop: DimensionManager.verticalScale(33),
            marginRight: DimensionManager.scale(20),
            lineHeight: DimensionManager.verticalScale(18) * 1.5
          }]}>
            {i18n.t('tipDOcumtents')}
          </Text>
          {this.renderDocumentList()}
          {this.renderContractualList()}
          {this.renderLine()}
        </View>
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

});

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DocumentsView));
