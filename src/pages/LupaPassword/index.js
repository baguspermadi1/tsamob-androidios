import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  Loading,
  TextInput,
} from '@components';
import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const LupaPassword = ({navigation, route}) => {
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isPwdError, setisPwdError] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [regexCheck1, setregexCheck1] = useState(false);
  const [regexCheck2, setregexCheck2] = useState(false);
  const [regexCheck3, setregexCheck3] = useState(false);
  const [password, setpassword] = useState('');
  const {resetToken} = route.params;

  useEffect(() => {
    if (new RegExp(/(?=.*\d)/).test(password)) {
      setregexCheck3(true);
    } else {
      setregexCheck3(false);
    }
    if (new RegExp(/(?=.*[A-Z])/).test(password)) {
      setregexCheck2(true);
    } else {
      setregexCheck2(false);
    }
    if (new RegExp(/[A-Za-z0-9]{6}/).test(password)) {
      setregexCheck1(true);
    } else {
      setregexCheck1(false);
    }

    if (regexCheck1 && regexCheck2 && regexCheck3) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [password, regexCheck1, regexCheck2, regexCheck3]);
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
          <Loading isLoading={isLoading} />
          <HeaderNonLogin
            navigation={navigation}
            title={'Atur Ulang Kata Sandi'}
            description={'Masukan kata sandi baru untuk akun Anda'}
          />
          <TextInput
            placeholder={'Password'}
            placeholderActive={'Password (Min 6 Karakter)'}
            style={{marginBottom: isPwdError ? RFValue(8) : RFValue(40)}}
            valueText={password}
            showPassword={hidePassword}
            keyboardType={'default'}
            onChangeText={(text) => {
              setpassword(text);
            }}
            rightIcon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            rightIconType={'material-community'}
            onRightIconPress={() => sethidePassword(!hidePassword)}
            isError={isPwdError}
            errorInfo={'Password Tidak Boleh Sama'}
            focusAfterError={() => setisPwdError(false)}
          />

          <View style={styles.viewIcon}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                regexCheck1
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                ...styles.txtCheckRegex,
                color: regexCheck1
                  ? configs.colors.primary.Sapphire.darker
                  : configs.colors.neutral.Grey.base,
              }}>
              Terdiri min. 6 karakter
            </Text>
          </View>
          <View style={styles.viewIcon}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                regexCheck2
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                ...styles.txtCheckRegex,
                color: regexCheck2
                  ? configs.colors.primary.Sapphire.darker
                  : configs.colors.neutral.Grey.base,
              }}>
              Mengandung Huruf Besar
            </Text>
          </View>
          <View style={styles.viewIcon}>
            <Icon
              name="check"
              size={configs.sizes.Icon.XL}
              containerStyle={{marginRight: RFValue(8)}}
              color={
                regexCheck3
                  ? configs.colors.primary.Sapphire.base
                  : configs.colors.neutral.Grey.base
              }
            />
            <Text
              style={{
                ...styles.txtCheckRegex,
                color: regexCheck3
                  ? configs.colors.primary.Sapphire.darker
                  : configs.colors.neutral.Grey.base,
              }}>
              Mengandung Angka
            </Text>
          </View>
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Selanjutnya'}
            onPress={() => {
              Keyboard.dismiss();
              setisLoading(true);
              setisPwdError(true);
              setTimeout(() => {
                setisLoading(false);
                navigation.navigate(configs.screens.forgotPwd.berhasil);
              }, 1000);
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
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(8),
  },
  txtCheckRegex: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
  },
});

export default LupaPassword;
