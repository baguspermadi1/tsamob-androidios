import {BackNonLogin, Button, HeaderNonLogin, Loading} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const LupaPasswordEmailLink = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <BackNonLogin navigation={navigation} />
        <HeaderNonLogin
          navigation={navigation}
          title={'Atur Ulang Kata Sandi!'}
          customDescription={
            <Text
              style={{
                color: configs.colors.primary.Sapphire.darker,
                fontSize: configs.sizes.Text.L,
                fontFamily: configs.fonts.OpenSans.Regular,
                marginBottom: RFValue(16),
              }}>
              Tautan untuk mengatur ulang kata sandi sudah dikirimkan ke alamat
              email anda :{' '}
              <Text
                style={{
                  color: configs.colors.primary.Sapphire.darker,
                  fontSize: configs.sizes.Text.L,
                  fontFamily: configs.fonts.OpenSans.Bold,
                  marginBottom: RFValue(16),
                }}>
                {route.params.email}
              </Text>
            </Text>
          }
        />
        <Loading isLoading={isLoading} />
        <View style={styles.containerResend}>
          <Text
            style={{
              color: configs.colors.primary.Sapphire.darker,
              fontSize: configs.sizes.Text.L,
              fontFamily: configs.fonts.OpenSans.Regular,
            }}>
            Belum menerima email?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
              }, 1000);
            }}>
            <Text
              style={{
                color: configs.colors.primary.Sapphire.darker,
                fontSize: configs.sizes.Text.L,
                fontFamily: configs.fonts.OpenSans.Bold,
              }}>
              Kirim Ulang
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
          <Button
            text={'Selesai'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.reset({
                index: 0,
                routes: [{name: configs.screens.forgotPwd.main}],
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
  containerResend: {
    flexDirection: 'row',
    marginTop: RFValue(16),
    marginBottom: RFValue(32),
  },
});

export default LupaPasswordEmailLink;
