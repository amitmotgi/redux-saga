import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Slider from 'react-native-slider';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale, scale } from '../../Themes/DimensionManager';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import { getSeparationOfFormatCurrency, toFormatNumber } from '../../Utils/CurrencyUtils';
import AddCollateralModal from './AddCollateralModal';

class CollateralCardView extends Component {
  static propTypes = {
    collateralName: PropTypes.string,
    /*
    * collateral image
    * object--->{uri:""},
    * number--->require('../Images/wallet.png'
    * */
    collateralUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    availableDollar: PropTypes.number,
    walletDollar: PropTypes.number,
    collateralValue: PropTypes.number,
    minSliderCount: PropTypes.number,
    maxSliderCount: PropTypes.number,
    sliderValue: PropTypes.number
  }
  static defaultProps = {
    collateralName: 'BTC',
    collateralUrl: require('../Images/wallet.png'),
    availableDollar: 0,
    walletDollar: 0,
    collateralValue: 0,
    minSliderCount: 0,
    maxSliderCount: 1,
    sliderValue: 0 // ===walletDollar  ???
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.initializeAddModalData()
    };
  }

  initializeAddModalData = () => {
    return {
      transferCurrency: '',
      transferCurrencyAddress:'',
      isAddModalVisible: false
    };
  }

  walletDollarView = () => {
    const { walletDollar } = this.props;
    const { unit, currencyInteger, currencyDecimalAndPoint } = getSeparationOfFormatCurrency({
      val: walletDollar
    });
    return (
      <View style={styles.walletDollarView}>
        <Text style={styles.walletDollarText}>{unit}</Text>
        <Text style={[styles.walletDollarText, styles.walletDollarTextInt]}>{currencyInteger}</Text>
        <Text style={[styles.walletDollarText, styles.walletDollarTextDecimal]}>
          {currencyDecimalAndPoint}
        </Text>
      </View>
    );
  }

  headRowFirstView = () => {
    const { collateralUrl, collateralName } = this.props;
    return (
      <View style={styles.headRow}>
        <View style={styles.headContentWallet}>
          <Image style={styles.headContentWalletImg} source={collateralUrl} />
          <Text style={styles.headContentWalletText}>{collateralName} Wallet</Text>
        </View>
        {this.walletDollarView()}
      </View>
    );
  }

  headRowSecondView = () => {
    const { availableDollar, collateralName, collateralValue } = this.props;
    const { currencyValue } = getSeparationOfFormatCurrency({ val: availableDollar });
    const collateralVal = toFormatNumber({ val: collateralValue });
    return (
      <View style={[styles.headRow, styles.headRowSecond]}>
        <View>
          <Text style={styles.availableText}>{currencyValue} Available</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.availableText, styles.availableTextExtra]}>{collateralVal}</Text>
          <Text style={styles.availableText}> {collateralName}</Text>
        </View>
      </View>
    );
  }

  collateralCardContentHead = () => {
    const { collateralName } = this.props;
    return (
      <View style={styles.collateralCardContentHead}>
        <View style={styles.headContent}>
          {this.headRowFirstView()}
          {this.headRowSecondView()}
        </View>
        <TouchableOpacity //style={styles.headContentAddIcon}
          onPress={() => {
            console.log('headContentAddIcon');
            this.setState({
              isAddModalVisible: true,
              transferCurrency: collateralName,
              transferCurrencyAddress:'3Hodshkfehfdslfgjkdshge3289hnfdjk32g'
            });
          }}
        >
          <View style={styles.headContentAddIcon}>
            {/* TODO use image addIcon not text (set fontSize >h6,can't center) and not <Icon>(can't set shadow) */}
            <Text style={styles.headAddIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  sliderViewPage = () => {
    const { minSliderCount, maxSliderCount, sliderValue } = this.props;
    // TODO if trackTintColor gradient,
    // https://github.com/jeanregisser/react-native-slider/pull/141
    // https://github.com/jeanregisser/react-native-slider/issues/99
    return (
      <View>
        <Slider
          value={sliderValue}
          minimumValue={minSliderCount}
          maximumValue={maxSliderCount}
          trackStyle={sliderStyle.track}
          thumbStyle={sliderStyle.thumb}
          minimumTrackTintColor={Colors.reduxsagaActiveBlue}
          maximumTrackTintColor={Colors.reduxsagaLightGray}
          onValueChange={val => console.log('%c sliderVal', 'color:red', val)}
        />
      </View>
    );
  }

  collateralCardContent = () => {
    return (
      <View style={styles.collateralCardContent}>
        {this.collateralCardContentHead()}
        {this.sliderViewPage()}
      </View>
    );
  }

  onCancel = () => {
    // this.setState({
    //   ...this.initializeAddModalData()
    // });
    this.setState({
      isAddModalVisible:false
    });
  }

  addModalPage = () => {
    const { isAddModalVisible,transferCurrency,transferCurrencyAddress } = this.state;
    return <AddCollateralModal
      isVisible={isAddModalVisible}
      transferCurrency={transferCurrency}
      onCancel={this.onCancel}
      transferCurrencyAddress={transferCurrencyAddress}
    />;
  }

  render() {
    // console.log('%c Colll', 'color:red', this.props);
    return (
      <View style={styles.collateralCardView}>
        {this.collateralCardContent()}
        {this.addModalPage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collateralCardView: {
    height: verticalScale(130),
    borderWidth: verticalScale(1),
    backgroundColor: Colors.transparent,
    borderColor: Colors.reduxsagaLightGray,
    shadowColor: Colors.reduxsagaBlack,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.19,
    shadowRadius: 10,
    elevation: 6
  },
  collateralCardContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(23)
  },
  collateralCardContentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headContent: {
    marginRight: scale(20),
    flex: 1
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headRowSecond: {
    marginTop: verticalScale(8)
  },
  headContentWallet: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headContentWalletImg: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain'
  },
  headContentWalletText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    color: Colors.reduxsagaBlack,
    marginLeft: scale(4)
  },
  walletDollarView: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  walletDollarText: {
    ...Fonts.style.h5TextBold,
    color: Colors.reduxsagaBlack,
    fontSize: 22
  },
  walletDollarTextInt: {
    textDecorationLine: 'underline'
  },
  walletDollarTextDecimal: {
    fontSize: Fonts.size.medium
  },
  availableText: {
    ...Fonts.style.textMediumGT,
    fontWeight: '500',
    opacity: 0.4,
    color: Colors.reduxsagaBlack
  },
  availableTextExtra: {
    textDecorationLine: 'underline'
  },
  headContentAddIcon: {
    height: verticalScale(36),
    width: verticalScale(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(18),
    backgroundColor: Colors.reduxsagaGreen,
    shadowColor: Colors.reduxsagaBlack,
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowOpacity: 0.19,
    shadowRadius: 10,
    elevation: 6
  },
  headAddIcon: {
    fontSize: Fonts.size.h6,
    color: Colors.transparent
  }
});

const sliderStyle = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1
  },
  thumb: {
    width: verticalScale(24),
    height: verticalScale(24),
    borderRadius: 24 / 2,
    backgroundColor: Colors.reduxsagaGreen,
    shadowColor: Colors.reduxsagaBlack,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: 4,
    shadowOpacity: 0.19,
    elevation: 6
  }
});

export default CollateralCardView;
