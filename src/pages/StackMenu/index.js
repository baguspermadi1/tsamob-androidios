import configs from '@configs';
import {StackHome, StackNotifikasi, StackProfile, StackRequest} from '@pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  const navigateToFirstScreen = () => {
    props.navigation.navigate(configs.screens.stack.home);
  };

  const navigateToSecondScreen = () => {
    props.navigation.navigate(configs.screens.stack.request);
  };

  const navigateToThirdScreen = () => {
    props.navigation.navigate(configs.screens.stack.notifikasi);
  };

  const navigateToFourthScreen = () => {
    props.navigation.navigate(configs.screens.stack.profile);
  };

  const activeRoute = props.state.routeNames[props.state.index];

  let menuColor1 = '';
  let menuColor2 = '';
  let menuColor3 = '';
  let menuColor4 = '';
  let backgroundColor1 = '';
  let backgroundColor2 = '';
  let backgroundColor3 = '';
  let backgroundColor4 = '';

  if (activeRoute === configs.screens.stack.home) {
    menuColor1 = configs.colors.primary.Sapphire.base;
    backgroundColor1 = '#E5E8F1';
  } else {
    menuColor1 = '#BDBDBD';
    backgroundColor1 = '#FFFFFF';
  }

  if (activeRoute === configs.screens.stack.request) {
    menuColor2 = configs.colors.primary.Sapphire.base;
    backgroundColor2 = '#E5E8F1';
  } else {
    menuColor2 = '#BDBDBD';
    backgroundColor2 = '#FFFFFF';
  }

  if (activeRoute === configs.screens.stack.notifikasi) {
    menuColor3 = configs.colors.primary.Sapphire.base;
    backgroundColor3 = '#E5E8F1';
  } else {
    menuColor3 = '#BDBDBD';
    backgroundColor3 = '#FFFFFF';
  }

  if (activeRoute === configs.screens.stack.profile) {
    menuColor4 = configs.colors.primary.Sapphire.base;
    backgroundColor4 = '#E5E8F1';
  } else {
    menuColor4 = '#BDBDBD';
    backgroundColor4 = '#FFFFFF';
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={navigateToFirstScreen}
        activeOpacity={0.6}
        style={{...styles.buttonMenu, backgroundColor: backgroundColor1}}>
        <Image
          source={configs.images.home}
          style={{
            ...styles.bottomIcon,
            tintColor: menuColor1,
          }}
        />
        <Text style={{...styles.textMenu, color: menuColor1}}>
          {configs.screens.stack.home}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToSecondScreen}
        activeOpacity={0.6}
        style={{...styles.buttonMenu, backgroundColor: backgroundColor2}}>
        <Image
          source={configs.images.request}
          style={{
            ...styles.bottomIcon,
            tintColor: menuColor2,
          }}
        />
        <Text style={{...styles.textMenu, color: menuColor2}}>
          {configs.screens.stack.request}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToThirdScreen}
        activeOpacity={0.6}
        style={{...styles.buttonMenu, backgroundColor: backgroundColor3}}>
        <Image
          source={configs.images.notification}
          style={{
            ...styles.bottomIcon,
            tintColor: menuColor3,
          }}
        />
        <Text style={{...styles.textMenu, color: menuColor3}}>
          {configs.screens.stack.notifikasi}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToFourthScreen}
        activeOpacity={0.6}
        style={{...styles.buttonMenu, backgroundColor: backgroundColor4}}>
        <Image
          source={configs.images.profile}
          style={{
            ...styles.bottomIcon,
            tintColor: menuColor4,
          }}
        />
        <Text style={{...styles.textMenu, color: menuColor4}}>
          {configs.screens.stack.profile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const StackMenu = ({navigation}) => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name={configs.screens.stack.home} component={StackHome} />
      <Tab.Screen
        name={configs.screens.stack.request}
        component={StackRequest}
      />
      <Tab.Screen
        name={configs.screens.stack.notifikasi}
        component={StackNotifikasi}
      />
      <Tab.Screen
        name={configs.screens.stack.profile}
        component={StackProfile}
      />
    </Tab.Navigator>
  );
};

export default StackMenu;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: RFValue(12),
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    bottom: RFValue(20),
  },
  buttonMenu: {
    height: RFValue(60),
    width: RFValue(60),
    margin: RFValue(8),
    borderRadius: RFValue(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  textMenu: {
    textAlign: 'center',
    fontSize: configs.sizes.Text.XS,
    fontFamily: configs.fonts.OpenSans.Bold,
  },
  bottomIcon: {
    width: configs.sizes.Icon.XL,
    height: configs.sizes.Icon.XL,
    marginBottom: RFValue(6),
    resizeMode: 'contain',
  },
});
