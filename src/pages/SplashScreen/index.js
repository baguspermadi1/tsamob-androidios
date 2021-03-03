import localstorage from '@actions/constants/localstorage';
import configs from '@configs';
import utilities from '@utilities';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {appVersion} from '../../../app.json';

const {width: screenWidth} = Dimensions.get('screen');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    let token = await utilities.asyncstorage.readEncryptStorage({
      key: localstorage.AUTHENTICATION.ACCESS_TOKEN,
    });
    let screen = '';
    if (token) {
      screen = configs.screens.stack.main;
    } else {
      screen = configs.screens.login.main;
    }

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: screen}],
      });
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.containerImage}>
          <Image source={configs.images.trac_logo} style={styles.image} />
        </View>
        <Text style={styles.appsName}>Service Apps</Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.version}>Version {appVersion}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.primary.Sapphire.base,
    padding: RFValue(16),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: 'contain',
    tintColor: configs.colors.neutral.White.base,
  },
  containerBottom: {
    bottom: RFValue(0),
  },
  version: {
    color: configs.colors.neutral.White.base,
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.S,
    textAlign: 'center',
  },
  appsName: {
    color: configs.colors.neutral.White.base,
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.XL,
  },
});

export default SplashScreen;
