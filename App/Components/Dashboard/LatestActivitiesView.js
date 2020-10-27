import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Fonts from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';
import i18n from '../../I18n';

class LatestActivitiesView extends Component {
  constructor(props) {
    super(props);
    const data = {
      date: '2018-08-15',
      account: 'XXXX-XX-436',
      transferedTo: '20000.00',
      rightMoney: '10000.00'
    };
    const dataSource = [...new Array(5)].map((i, index) => ({ ...data, id: index }));
    this.state = {
      dataSource: dataSource
    };
  }

  formatDate(val) {
    const date = i18n.toTime('date.formats.short', val);
    return i18n.strftime(new Date(date), '%-m/%d');
  }

  formatNumber(val, precision = 2){
    i18n.toNumber(val, { precision: precision });
  }

  formatCurrency({val, precision = 2,unit = '$'}) {
    i18n.toCurrency(val, { precision: precision,unit });
  }

  activitiesHead() {
    return (
      <View style={[styles.inlineLayout, styles.head]}>
        <View style={styles.firstView}>
          <Image source={require('../Images/check-mark-copy.png')} style={styles.headMarkImage} />
        </View>
        <View style={styles.secondView}>
          <Text style={styles.headContent}>Next Payment due 8/15</Text>
        </View>
        <TouchableOpacity
          style={[styles.thirdView, styles.headRight]}
          onPress={() => console.log('pay now')}
        >
          <Text style={styles.payNow}>Pay Now</Text>
          <Image source={require('../Images/arrow-black.png')} style={styles.headRightImage} />
        </TouchableOpacity>
      </View>
    );
  }

  activitiesList = () => {
    const { dataSource } = this.state;

    const contentChildren = data => {
      return (
        <View key={data.id} style={[styles.inlineLayout, styles.listItem]}>
          <View style={styles.firstView}>
            <Text style={[styles.listItemText]}>{this.formatDate(data.date)}</Text>
          </View>
          <View style={[styles.secondView, styles.listItemContent]}>
            <View style={[styles.contentLayout, { marginBottom: verticalScale(7) }]}>
              <View style={styles.contentImage}>
                <Image style={styles.currencyImage} source={require('../Images/lba-icon.png')} />
              </View>
              <Text style={[styles.listItemText]}>{this.formatCurrency({val:data.transferedTo})} </Text>
              <Text style={[styles.listItemText, { opacity: 0.6 }]}>transfered to</Text>
            </View>
            <View style={styles.contentLayout}>
              <View style={styles.contentImage}>
                <Image style={styles.accountImage} source={require('../Images/assets.png')} />
              </View>
              <Text style={[styles.listItemText]}>Account {data.account}</Text>
            </View>
          </View>
          <View style={styles.thirdView}>
            <Text style={[styles.listItemText]}>{this.formatCurrency({val:data.rightMoney})}</Text>
          </View>
        </View>
      );
    };
    const page = dataSource.map(i => contentChildren(i));
    return (
      <View style={styles.content}>
        <ScrollView
          nestedScrollEnabled={true}
        >{page}</ScrollView>
      </View>
    );
  }

  activitiesBottom() {
    return (
      <View style={[styles.inlineLayout, styles.bottom]}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            console.log('onPress');
          }}
        >
          <Text style={styles.bottomText}>More Activities</Text>
          <Image source={require('../Images/arrow.png')} style={styles.bottomImage} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.activitiesHead()}
        {this.activitiesList()}
        {this.activitiesBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: verticalScale(330),
    justifyContent: 'space-between'
  },
  inlineLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  head: {
    height: verticalScale(60),
    // opacity: 0.2,
    backgroundColor: Colors.reduxsagaExtraLightRed,
    borderTopWidth: verticalScale(1),
    borderBottomWidth: verticalScale(1),
    borderColor: Colors.reduxsagaLightGray
  },
  headContent: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack
  },
  headRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headRightImage: {
    marginLeft: scale(5)
  },
  payNow: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack,
    textAlign: 'right',
    fontWeight: '500'
  },
  content: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  listItem: {
    height: verticalScale(70),
    borderBottomWidth: verticalScale(1),
    borderColor: Colors.reduxsagaLightGray
  },
  listItemText: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaBlack
  },
  listItemContent: {
    flex: 1,
    justifyContent: 'center'
  },
  contentImage: {
    width: scale(21),
    height: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(4),
    resizeMode: 'contain'
  },
  currencyImage: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain'
  },
  accountImage: {
    width: scale(21),
    height: scale(12),
    resizeMode: 'contain'
  },
  bottom: {
    height: verticalScale(60),
    borderTopWidth: verticalScale(1),
    borderColor: Colors.reduxsagaExtraLightGray
  },
  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    ...Fonts.style.textMediumGT,
    opacity: 1,
    color: Colors.reduxsagaActiveBlue,
    textAlign: 'center'
  },
  bottomImage: {
    marginLeft: scale(5)
  },
  firstView: {
    width: scale(30),
    marginLeft: scale(20),
    marginRight: scale(25)
  },
  secondView: {
    flex: 1
  },
  thirdView: {
    width: scale(75),
    marginRight: scale(20)
  }
});

export default LatestActivitiesView;
