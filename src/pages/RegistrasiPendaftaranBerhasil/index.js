import {BackNonLogin, Button, HeaderNonLogin} from '@components';
import configs from '@configs';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiPendaftaranBerhasil = ({navigation}) => {
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <View>
          <BackNonLogin navigation={navigation} />
          <HeaderNonLogin
            navigation={navigation}
            title={'Pendaftaran Berhasil!'}
            description={
              'Data pendukung registrasi anda telah berhasil dilengkapi, silahkan cek email anda untuk informasi aktifasi akun.'
            }
          />
        </View>
        <View style={styles.containerBottom}>
          <Button
            text={'Selesai'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('Login');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    padding: RFValue(16),
    flex: 1,
  },
  containerBottom: {
    marginTop: RFValue(8),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default RegistrasiPendaftaranBerhasil;
