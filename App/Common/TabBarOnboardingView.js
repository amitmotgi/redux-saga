import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Images, Colors, Fonts, DimensionManager } from '../Themes';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';

class TabBarOnboardingView extends Component {

  render () {
    const {
      navigation
    } = this.props;

    return (
      <View style={{
        flexDirection: 'row',
        height: DimensionManager.verticalScale(90),
        backgroundColor: Colors.reduxsagaSkyBlue,
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            style={{
              alignItems:'center'
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={{
              position: 'absolute',
              left: DimensionManager.scale(8),
            }}>
            <IconOcticons
              name="chevron-left"
              size={36}
              color={Colors.reduxsagaBlue} />
            </View>
            <Text style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'flex-start',
              color: Colors.reduxsagaBlue,
              fontSize: DimensionManager.scale(Fonts.size.h5),
              marginTop: DimensionManager.verticalScale(5)
            }}>
             BACK
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
            <Text style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'flex-start',
              color: Colors.reduxsagaBlue,
              fontSize: DimensionManager.scale(Fonts.size.h7),
              marginTop: DimensionManager.verticalScale(5)
            }}>
             Step {this.props.stepValue} of 4
            </Text>
          </TouchableOpacity>
        </View>
        {!this.props.hideNextButton ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
          }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                width: DimensionManager.scale(100),
                height: DimensionManager.verticalScale(40),
                backgroundColor: Colors.reduxsagaBlue,
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate(this.props.nextScreen);
              }}>
              <Text style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                color: Colors.transparent,
                fontSize: DimensionManager.scale(Fonts.size.h5),
                marginTop: DimensionManager.verticalScale(10),
              }}> NEXT </Text>
            </TouchableOpacity>
          </View>
        ) : null}

      </View>
    );
  }
}

export default withNavigation(TabBarOnboardingView);
