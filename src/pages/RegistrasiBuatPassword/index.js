import {BackNonLogin, Button, HeaderNonLogin, TextInput} from '@components';
import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {ScrollView} from 'react-native';
import {Platform, View} from 'react-native';
import {Keyboard} from 'react-native';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiBuatPassword = ({navigation}) => {
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [hidePassword, sethidePassword] = useState(true);
  const [password, setpassword] = useState('');

  useEffect(() => {
    if (
      new RegExp(/(?=.*\d)/).test(password) &&
      new RegExp(/(?=.*[A-Z])/).test(password) &&
      new RegExp(/[A-Za-z0-9]{6}/).test(password)
    ) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [password]);
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <BackNonLogin navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderNonLogin
            navigation={navigation}
            title={'Buat Password'}
            description={'Masukan email anda dan buat password untuk kemanan'}
          />
          <TextInput
            placeholder={'Password'}
            placeholderActive={'Password (Min 6 Karakter)'}
            style={{marginBottom: RFValue(8)}}
            valueText={password}
            showPassword={hidePassword}
            keyboardType={'default'}
            onChangeText={(text) => {
              setpassword(text);
            }}
            rightIcon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            rightIconType={'material-community'}
            onRightIconPress={() => sethidePassword(!hidePassword)}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: RFValue(8),
            }}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                new RegExp(/[A-Za-z0-9]{6}/).test(password)
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                fontFamily: configs.fonts.OpenSans.Regular,
                fontSize: configs.sizes.Text.M,
                color: configs.colors.neutral.Grey.base,
              }}>
              Terdiri min. 6 karakter
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: RFValue(8),
            }}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                new RegExp(/(?=.*[A-Z])/).test(password)
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                fontFamily: configs.fonts.OpenSans.Regular,
                fontSize: configs.sizes.Text.M,
                color: configs.colors.neutral.Grey.base,
              }}>
              Mengandung Huruf Besar
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: RFValue(8),
            }}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                new RegExp(/(?=.*\d)/).test(password)
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                fontFamily: configs.fonts.OpenSans.Regular,
                fontSize: configs.sizes.Text.M,
                color: configs.colors.neutral.Grey.base,
              }}>
              Mengandung Angka
            </Text>
          </View>
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('Registrasi Pendaftaran Berhasil');
            }}
            disabled={isBtnDisabled}
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
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default RegistrasiBuatPassword;
