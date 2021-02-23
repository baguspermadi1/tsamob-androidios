import {BackNonLogin, Button, HeaderNonLogin} from '@components';
import configs from '@configs';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const LupaPasswordBerhasil = ({navigation}) => {
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
            title={'Berhasil!'}
            description={
              'Kata Sandi baru anda berhasil diubah, silahkan melanjutkan kehalaman Login untuk masuk ke akun.'
            }
          />
        </View>
        <View style={styles.containerBottom}>
          <Button
            text={'Login'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.reset({
                index: 0,
                routes: [{name: configs.screens.login.main}],
              });
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

export default LupaPasswordBerhasil;
