import {HeaderLogin} from '@components';
import configs from '@configs';
import {
  DaftarPemakaiKendaraanDaftarKendaraan,
  DaftarPemakaiKendaraanDaftarPemakai,
} from '@pages';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const DaftarPemakaiKendaraanStack = ({navigation}) => {
  return (
    <SafeAreaView style={styles.body}>
      <HeaderLogin title={'Daftar Pemakai Kendaraan'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.avoidingView}
        enabled>
        <Tab.Navigator
          initialRouteName="Daftar Kendaraan"
          tabBarOptions={{
            indicatorStyle: {
              backgroundColor: configs.colors.primary.Sapphire.base,
            },
            labelStyle: {
              textTransform: 'none',
              fontSize: configs.sizes.Text.M,
              fontFamily: configs.fonts.OpenSans.SemiBold,
            },
            inactiveTintColor: configs.colors.neutral.Grey.base,
            activeTintColor: configs.colors.primary.Sapphire.base,
            style: {backgroundColor: configs.colors.neutral.Grey.lighter},
          }}
          sceneContainerStyle={{
            backgroundColor: configs.colors.neutral.White.base,
          }}>
          <Tab.Screen
            name="Daftar Kendaraan"
            component={DaftarPemakaiKendaraanDaftarKendaraan}
          />
          <Tab.Screen
            name="Daftar Pemakai"
            component={DaftarPemakaiKendaraanDaftarPemakai}
          />
        </Tab.Navigator>
      </KeyboardAvoidingView>
      <View style={styles.scrollinset}>
        <View style={styles.topBounce} />
        <View style={styles.bottomBounce} />
      </View>
    </SafeAreaView>
  );
};

export default DaftarPemakaiKendaraanStack;

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.White.base,
    flex: 1,
  },
  avoidingView: {
    backgroundColor: configs.colors.neutral.White.base,
    flex: 1,
  },
  scrollinset: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  topBounce: {
    flex: 1,
    backgroundColor: configs.colors.primary.Sapphire.base,
  },
  bottomBounce: {
    flex: 1,
    backgroundColor: configs.colors.neutral.White.base,
  },
});
