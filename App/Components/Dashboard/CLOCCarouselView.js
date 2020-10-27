import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import i18n from '../../I18n';
import Colors from '../../Themes/Colors';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Fonts from '../../Themes/Fonts';
import { itemWidth, sliderWidth } from '../../Utils/SliderUtils';

class CLOCCarouselView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      sliderActiveSlideDefault: 0
    };
  }

  renderItem = ({ item, index }) => {
    const currencyNumber = i18n.toNumber(211234.12111, { precision: 2 });
    const currencyInteger = currencyNumber.slice(0,currencyNumber.length - 3);
    const currencyDecimals = currencyNumber.slice(currencyNumber.length - 3);
    return (
      <View style={styles.slide}>
        <View style={styles.imgView}>
          <Image style={styles.image}
                 source={require('../../Components/Images/lba-icon.png')} />
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.title}>
            Bitcoin Total Assets --
            {item.title}
          </Text>
          <View style={styles.currencyTitle}>
            <Text style={styles.currencyTitleFirst}>$</Text>
            <Text style={styles.currencyTitleSecond}>
              {currencyInteger}
            </Text>
            <View style={styles.currencyTitleThird}>
              <Text style={styles.currencyTitleThirdText}>{currencyDecimals}</Text>
              <Text style={styles.currencyTitleThirdText}>USD</Text>
            </View>
          </View>
          <View>
            <Text style={styles.currencySubhead}>
              {i18n.toNumber(35.07954642, { precision: 8 })} BTC
            </Text>
          </View>
          <View style={styles.assetsBottom}>
            <View style={styles.assetsBetweenView}>
              <Text style={styles.assetsFirstText}>Wallet Assets</Text>
              <Text style={styles.assetsSecondText}>18.50159052</Text>
              <Text style={styles.assetsThirdText}>BTC</Text>
            </View>
            <View style={styles.cutOffRule} />
            <View style={styles.assetsBetweenView}>
              <Text style={styles.assetsFirstText}>Vault Assets</Text>
              <Text style={styles.assetsSecondText}>16.25460240</Text>
              <Text style={styles.assetsThirdText}>BTC</Text>
            </View>
          </View>
          <View  style={styles.slideBottom}
          >
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              console.log('onPress');
            }}
          >
            <Text style={styles.bottomText}>Market News </Text>
            <Image source={require('../Images/arrow.png')} style={styles.iconImage} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    // console.log('Carousel')
    const entries = [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }];
    return (
      <View>
        <Carousel
          firstItem={this.state.sliderActiveSlideDefault}
          ref={c => (this.sliderRef = c)}
          layout={'default'}
          data={entries}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={1} // if have shadow on Android,inactiveSlideOpacity=1
          loop
          loopClonesPerSide={2}
          // autoplay={true}
          // autoplayDelay={500}
          // autoplayInterval={3000}
          onSnapToItem={index => this.setState({ sliderActiveSlide: index })}
        />
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={this.state.sliderActiveSlide}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.paginationDotContainer}
          dotColor={Colors.reduxsagaGray}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#fff'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          carouselRef={this.sliderRef}
          tappableDots={!!this.sliderRef}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    height: verticalScale(382 + 45 / 2),
    marginBottom: verticalScale(10),
    // backgroundColor: 'red',
  },
  imgView:{
    // backgroundColor:'red',
    height: verticalScale(45),
    width: verticalScale(45),
    position: 'absolute',
    top: 0,
    marginLeft: verticalScale(-45 / 2),
    left: '50%',
    zIndex: 1,
    elevation: 7 // =slideContent.elevation+1
  },
  image: {
    height:'100%',
    width:'100%'
  },
  slideContent: {
    height: verticalScale(382),
    backgroundColor: Colors.transparent,
    marginTop: verticalScale(45 / 2),
    // marginHorizontal:scale(3),
    borderWidth:scale(1),
    borderColor:Colors.reduxsagaLightGray,
    shadowColor: Colors.reduxsagaBlack,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.19,
    shadowRadius: 6,
    elevation: 6
  },
  title: {
    ...Fonts.style.textMediumGT,
    textAlign: 'center',
    color: '#191919',
    marginTop: verticalScale(25)
  },
  currencyTitle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currencyTitleFirst: {
    ...Fonts.style.textSmallBoldGT,
    color: Colors.reduxsagaBlack,
    marginTop: verticalScale(10),
    marginRight: scale(3)
  },
  currencyTitleSecond: {
    ...Fonts.style.semiTextBold,
    color: Colors.reduxsagaBlack
  },
  currencyTitleThird: {
    marginTop: verticalScale(16)
  },
  currencyTitleThirdText: {
    ...Fonts.style.textSmallBoldGT,
    color: Colors.reduxsagaGray
  },
  currencySubhead: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaGray,
    textAlign: 'center'
  },
  assetsBottom: {
    // backgroundColor: 'red',
    height: verticalScale(97),
    position: 'absolute',
    bottom: verticalScale(54),
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  assetsBetweenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  assetsFirstText: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaGray,
    textAlign: 'center'
  },
  assetsSecondText: {
    ...Fonts.style.textBoldGT,
    opacity: 1,
    color: Colors.reduxsagaBlack,
    textAlign: 'center',
    marginVertical: verticalScale(8)
  },
  assetsThirdText: {
    ...Fonts.style.textMediumGT,
    color: Colors.reduxsagaGray,
    textAlign: 'center'
  },
  cutOffRule: {
    width: scale(1),
    height: verticalScale(61),
    backgroundColor: Colors.reduxsagaBlack,
    opacity: 0.15
  },
  slideBottom: {
    width: '100%',
    height: verticalScale(54),
    position: 'absolute',
    bottom: 0,
    borderTopWidth: verticalScale(1),
    borderColor: Colors.reduxsagaExtraLightGray
  },
  bottomButton:{
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
  iconImage: {
    marginLeft: scale(5)
  },
  paginationContainer: {
    paddingVertical: scale(10)
  },
  paginationDotContainer: {
    marginHorizontal: scale(3)
  },
  paginationDot: {
    // backgroundColor: 'red',
    width: verticalScale(8),
    height: verticalScale(8),
    borderRadius: verticalScale(4),
    borderWidth: verticalScale(1),
    borderColor: Colors.reduxsagaGray
    // marginHorizontal: scale(5)
  }
});
export default CLOCCarouselView;
