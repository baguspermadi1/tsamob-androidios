import {HeaderNonLogin} from '@components';
import configs from '@configs';
import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiBuatPassword = ({navigation}) => {
  return (
    <KeyboardAvoidingView style={styles.body} enabled behavior={'padding'}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <HeaderNonLogin
          navigation={navigation}
          title={'Buat Password'}
          description={'Masukan email anda dan buat password untuk kemanan'}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    padding: RFValue(16),
    flex: 1,
  },
});

export default RegistrasiBuatPassword;
