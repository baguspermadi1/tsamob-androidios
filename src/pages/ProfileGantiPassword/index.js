import {Button, TextInput} from '@components';
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
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const ProfileGantiPassword = ({navigation}) => {
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [hideOldPassword, sethideOldPassword] = useState(true);
  const [hidePassword, sethidePassword] = useState(true);
  const [regexCheck1, setregexCheck1] = useState(false);
  const [regexCheck2, setregexCheck2] = useState(false);
  const [regexCheck3, setregexCheck3] = useState(false);
  const [isErrorOldPassword, setisErrorOldPassword] = useState(false);
  const [isErrorPassword, setisErrorPassword] = useState(false);
  const [errorInfoPassword, seterrorInfoPassword] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const [password, setpassword] = useState('');

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

    if (
      regexCheck1 &&
      regexCheck2 &&
      regexCheck3 &&
      !isErrorOldPassword &&
      !isErrorPassword
    ) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [
    isErrorOldPassword,
    isErrorPassword,
    password,
    regexCheck1,
    regexCheck2,
    regexCheck3,
  ]);

  return (
    <>
      <SafeAreaView style={styles.body}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            backgroundColor: configs.colors.primary.Sapphire.base,
            height: RFValue(56),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              padding: RFValue(16),
              alignItems: 'center',
              marginRight: RFValue(4),
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={configs.sizes.Icon.XXL}
              color="white"
            />
          </TouchableOpacity>
          <Text
            style={{
              color: configs.colors.neutral.White.base,
              fontFamily: configs.fonts.OpenSans.Bold,
              fontSize: configs.sizes.Text.M,
            }}>
            Ubah Password
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={styles.avoidingView}
          enabled>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: configs.colors.neutral.Bluish.base,
            }}>
            <View style={{marginTop: RFValue(24), marginBottom: RFValue(42)}}>
              <TextInput
                placeholder={'Password Lama'}
                style={{marginBottom: RFValue(8)}}
                valueText={oldPassword}
                showPassword={hideOldPassword}
                keyboardType={'default'}
                onChangeText={(text) => {
                  setoldPassword(text);
                  if (password === text) {
                    setisErrorPassword(true);
                    seterrorInfoPassword(
                      'Password Tidak Boleh Sama Dengan Yang Lama',
                    );
                  } else {
                    setisErrorPassword(false);
                  }
                }}
                rightIcon={hideOldPassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconType={'material-community'}
                onRightIconPress={() => sethideOldPassword(!hideOldPassword)}
                isError={isErrorOldPassword}
                errorInfo={'Password Anda Salah'}
                focusAfterError={() => setisErrorOldPassword(false)}
              />

              <TouchableOpacity
                style={{
                  ...styles.forgotPassword,
                  marginTop: isErrorOldPassword ? RFValue(4) : RFValue(16),
                }}
                onPress={() =>
                  navigation.navigate(configs.screens.forgotPwd.email)
                }>
                <Text style={styles.forgotPasswordTxt}>Lupa Password</Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: '#5C616F',
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.S,
                  marginBottom: RFValue(4),
                }}>
                Buat Password Baru
              </Text>
              <TextInput
                placeholder={'Password Baru'}
                placeholderActive={'Password (Min 6 Karakter)'}
                style={{marginBottom: RFValue(8)}}
                valueText={password}
                showPassword={hidePassword}
                keyboardType={'default'}
                onChangeText={(text) => {
                  setpassword(text);
                  if (text === oldPassword) {
                    setisErrorPassword(true);
                    seterrorInfoPassword(
                      'Password Tidak Boleh Sama Dengan Yang Lama',
                    );
                  } else {
                    setisErrorPassword(false);
                  }
                }}
                rightIcon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconType={'material-community'}
                onRightIconPress={() => sethidePassword(!hidePassword)}
                isError={isErrorPassword}
                errorInfo={errorInfoPassword}
                focusAfterError={() => {
                  if (password === oldPassword) {
                    setisErrorPassword(true);
                    seterrorInfoPassword(
                      'Password Tidak Boleh Sama Dengan Yang Lama',
                    );
                  } else {
                    setisErrorPassword(false);
                  }
                }}
              />
            </View>

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
              text={'Ubah Password'}
              onPress={() => {
                Keyboard.dismiss();
                console.log('berhasil diubah');
                setisErrorOldPassword(true);
                seterrorInfoPassword('Password Anda Salah');
              }}
              disabled={isBtnDisabled}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.scrollinset}>
          <View style={styles.topBounce} />
          <View style={styles.bottomBounce} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    flex: 1,
  },
  avoidingView: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    flex: 1,
    padding: RFValue(16),
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
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(8),
  },
  txtCheckRegex: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
  },
  containerBottom: {
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  forgotPassword: {
    width: screenWidth / 3,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: RFValue(30),
  },
  forgotPasswordTxt: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.M,
    fontFamily: configs.fonts.OpenSans.Bold,
    textDecorationLine: 'underline',
  },
});

export default ProfileGantiPassword;
