import api from '@actions/api';
import localstorage from '@actions/constants/localstorage';
import {Button, HeaderLogin, Loading, TextInput} from '@components';
import configs from '@configs';
import utilities from '@utilities';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const ProfileGantiPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [hideOldPassword, sethideOldPassword] = useState(true);
  const [hidePassword, sethidePassword] = useState(true);
  const [regexCheck1, setregexCheck1] = useState(false);
  const [regexCheck2, setregexCheck2] = useState(false);
  const [regexCheck3, setregexCheck3] = useState(false);
  const [isErrorOldPassword, setisErrorOldPassword] = useState(false);
  const [isErrorNewPassword, setisErrorNewPassword] = useState(false);
  const [errorInfoOldPassword, seterrorInfoOldPassword] = useState(false);
  const [errorInfoNewPassword, seterrorInfoNewPassword] = useState(false);
  const [oldPassword, setoldPassword] = useState('');
  const [password, setpassword] = useState('');
  const [accessToken, setaccessToken] = useState('');

  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    let token = await utilities.asyncstorage.readEncryptStorage({
      key: localstorage.AUTHENTICATION.ACCESS_TOKEN,
    });
    setaccessToken(token);
  };

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
      !isErrorNewPassword
    ) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [
    isErrorOldPassword,
    isErrorNewPassword,
    password,
    regexCheck1,
    regexCheck2,
    regexCheck3,
  ]);

  const changePassword = async () => {
    await dispatch(
      api.Password.postChangePassword({
        oldPassword: oldPassword,
        newPassword: password,
        navigation: navigation,
        accessToken: accessToken,
      }),
    )
      .then(async (res) => {
        let {error_code, errors, success} = res;

        if (success) {
          this.RBSheet.open();
        } else {
          if (error_code === 'inline_validations') {
            errors.map((item) => {
              let errorMessages = item.messages.join('\n');

              if (item.field === 'OldPassword') {
                setisErrorOldPassword(true);
                seterrorInfoOldPassword(errorMessages);
              }
              if (item.field === 'NewPassword') {
                setisErrorNewPassword(true);
                seterrorInfoNewPassword(errorMessages);
              }
            });
          }
        }
      })
      .catch((e) => {
        return console.log('Catch Error', e.toString());
      });
  };

  return (
    <>
      <SafeAreaView style={styles.body}>
        <HeaderLogin title={'Ubah Password'} navigation={navigation} />
        <Loading isLoading={loadingRedux} />
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
                }}
                rightIcon={hideOldPassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconType={'material-community'}
                onRightIconPress={() => sethideOldPassword(!hideOldPassword)}
                isError={isErrorOldPassword}
                errorInfo={errorInfoOldPassword}
                focusAfterError={() => {
                  setisErrorOldPassword(false);
                  seterrorInfoOldPassword(false);
                }}
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

              <Text style={styles.label}>Buat Password Baru</Text>
              <TextInput
                placeholder={'Password Baru'}
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
                isError={isErrorNewPassword}
                errorInfo={errorInfoNewPassword}
                focusAfterError={() => {
                  setisErrorNewPassword(false);
                  seterrorInfoNewPassword(false);
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
                changePassword();
              }}
              disabled={isBtnDisabled}
            />
          </View>
          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={screenHeight * 0.25}
            onClose={() => {
              navigation.goBack();
            }}
            customStyles={{
              container: {
                paddingBottom: RFValue(16),
                borderRadius: RFValue(16),
              },
            }}>
            <View style={styles.rbSheetView}>
              <Text style={styles.rbSheetTitle}>Berhasil Diubah</Text>
              <Text style={styles.rbSheetDesc}>
                Password Anda Telah Berhasil diubah
              </Text>
              <View style={styles.containerBottomSheet}>
                <Button
                  text={'Kembali Ke Halaman Sebelumnya'}
                  onPress={() => {
                    this.RBSheet.close();
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
          </RBSheet>
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
  label: {
    color: configs.colors.neutral.Grey.dark,
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.S,
    marginBottom: RFValue(4),
  },
  rbSheetDesc: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    marginBottom: RFValue(24),
  },
  rbSheetTitle: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    marginBottom: RFValue(8),
  },
  rbSheetView: {padding: RFValue(16), flex: 1},
  containerBottomSheet: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default ProfileGantiPassword;
