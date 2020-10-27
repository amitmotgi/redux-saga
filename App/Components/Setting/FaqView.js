import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  SafeAreaView
} from 'react-native';
import { Colors, Fonts, DimensionManager } from '../../Themes';
import i18n from '../../I18n';
import { withNavigation } from 'react-navigation';
import HeaderBarDashboardView from '../../Common/HeaderBarDashboardView';

class FaqView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      faqList: [
        {
          groupName: 'USING YOUR ACCOUNT', data: [
            { name: 'How much can I borrow from reduxsaga', title: '', content: '' },
            { name: 'What is LTV and how is it calculated?', title: '', content: '' },
            { name: 'What is the term of my reduxsagait line?', title: '', content: '' },
            { name: 'What is the origination process?', title: '', content: '' },
            { name: 'What if the value of my collateral decreases?', title: '', content: '' },
            { name: 'What if the value of my collateral increases?', title: '', content: '' },
            { name: 'What benefits do I receive from staking LBA?', title: '', content: '' }
          ]
          ,
        },
        {
          groupName: 'LEARN ABOUT PRICING & FEES', data: [
            { name: 'What is the cost of my reduxsagait line?', title: '', content: '' },
            { name: 'How much do I get for my crypto assets?', title: '', content: '' },
            { name: 'What disbursement options do I have?', title: '', content: '' },
            { name: 'How do I repay my reduxsagait line?', title: '', content: '' }
          ]
          ,
        },
        {
          groupName: 'SECURITY & FRAUD', data: [
            { name: 'How do I know my collateral is safe?', title: '', content: '' },
            { name: 'Is there OFAC or other sanctions screening?', title: '', content: '' },
            { name: 'Does reduxsaga have a KYC program?', title: '', content: '' }
          ]
          ,
        },
        {
          groupName: 'RESOLVE ISSUES', data: [
            { name: 'How will I receive notification from reduxsaga?', title: '', content: '' },
            { name: 'Who can I contact with questions', title: '', content: '' },
          ]
          ,
        },

      ]
    };
  }

  renderSelection(title, index) {
    console.log('renderSelection', index + ':' + title)
    return (
      <View style={{
        marginTop: title === 'USING YOUR ACCOUNT' ? DimensionManager.verticalScale(41) : DimensionManager.verticalScale(59),
      }}>
        <Text style={[Fonts.style.textSmallBoldGT, {
          color: Colors.reduxsagaSkyLightGray,
          marginLeft: DimensionManager.scale(20),
        }]}>
          {title}
        </Text>
        <View style={{
          marginTop: DimensionManager.verticalScale(12),
          borderWidth: 1,
          borderColor: Colors.reduxsagaExtraLine,
          opacity: 0.6
        }}
        />
      </View>
    );
  }
  renderItem = (item) => {

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('FaqDetail', {
            title: item.name,
            content:item.connect ,
          });
        }}
      >
        <View style={{
          backgroundColor: Colors.transparent
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: DimensionManager.scale(20),
              marginRight: DimensionManager.scale(20),
              marginTop: DimensionManager.verticalScale(22),
              marginBottom: DimensionManager.verticalScale(18),
            }}>
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaDarkBlue,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: DimensionManager.scale(14),
            }]}>
              {item.name}
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
          <View style={{
            borderWidth: 1,
            borderColor: Colors.reduxsagaExtraLine,
            opacity: 0.6
          }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  renderList = () => {
    const { navigation } = this.props;
    const { faqList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          renderSectionHeader={({ section: { groupName } }) => this.renderSelection(groupName)}
          renderItem={({ item }) => this.renderItem(item)}
          sections={faqList}
        // ItemSeparatorComponent={() => <View style={{
        //   borderWidth: 1,
        //   borderColor: Colors.reduxsagaExtraLine,
        //   opacity: 0.2
        // }}
        // />}
        />
      </View>
    );
  }


  render() {
    return (
      <SafeAreaView style={styles.wrapper} >
        <View style={styles.safeArea} />
        <HeaderBarDashboardView
          title={i18n.t('faqHeader')}
          hideNextBtn={true}
          hideBackBtn={false}
          hideStep={true}
        />
        {this.renderList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FaqView));
