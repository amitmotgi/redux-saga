import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import i18n from '../I18n';

class BottomBarView extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { navigation } = this.props;

    return (
      <View style={{
        flexDirection: 'row',
        height: DimensionManager.verticalScale(83),
        backgroundColor: Colors.reduxsagaFooter,
        paddingBottom: DimensionManager.verticalScale(16)
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          marginLeft: DimensionManager.scale(13),
          marginRight: DimensionManager.scale(13),
        }}>
          <TouchableOpacity
            style={{
              alignItems:'center'
            }}
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Image
              style={{
                width: DimensionManager.scale(17),
                height: DimensionManager.scale(17),
                resizeMode: 'contain'
              }}
              source={require('./Images/dashboard.png')} />
            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5)

            }]}>
            Dashboard
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            style={{
              alignItems:'center'
            }}
            onPress={() => {
              navigation.navigate('Welcome');
            }}>
            <Image
              style={{
                width: DimensionManager.scale(22.6),
                height: DimensionManager.verticalScale(17.2),
                resizeMode: 'contain'
              }}
              source={require('./Images/assets.png')} />

            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5)

            }]}>
              Activity
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            style={{
              alignItems:'center'
            }}
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Image
              style={{
                width: DimensionManager.scale(22.6),
                height: DimensionManager.verticalScale(15.4),
                resizeMode: 'contain'
              }}
              source={require('./Images/activity.png')} />

            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5)
            }]}>
              Wallet
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            style={{
              alignItems:'center'
            }}
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <Image
              style={{
                width: DimensionManager.scale(25.3),
                height: DimensionManager.verticalScale(16.3),
                resizeMode: 'contain'
              }}
              source={require('./Images/transfer.png')} />

            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5)
            }]}>
              C-LOC
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            style={{
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Loans');
            }}>
            <Image
              style={{
                width: DimensionManager.scale(25.3),
                height: DimensionManager.verticalScale(16.3),
                resizeMode: 'contain'
              }}
              source={require('./Images/settings.png')} />

            <Text style={[Fonts.style.textMediumGT, {
              color: Colors.reduxsagaBlack,
              marginTop: DimensionManager.verticalScale(5)
            }]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    ...Fonts.style.h1BoldGT,
    color: Colors.transparent,
    textAlign: 'center'
  }
});

export default withNavigation(BottomBarView);
