import api from '@actions/api';
import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  Loading,
  TextInput,
} from '@components';
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
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const LupaPassword = ({navigation, route}) => {
  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [isPwdError, setisPwdError] = useState(false);
  const [infoPwdError, setinfoPwdError] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [regexCheck1, setregexCheck1] = useState(false);
  const [regexCheck2, setregexCheck2] = useState(false);
  const [regexCheck3, setregexCheck3] = useState(false);
  const [password, setpassword] = useState('');
  const [titleSheet, settitleSheet] = useState('');
  const [descSheet, setdescSheet] = useState('');

  const {resetToken} = route.params;
  console.log('Reset Token', resetToken);

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

    if (regexCheck1 && regexCheck2 && regexCheck3 && resetToken) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [password, regexCheck1, regexCheck2, regexCheck3, resetToken]);

  const resetPassword = async () => {
    await dispatch(
      api.Password.postResetPassword({
        resetToken: resetToken,
        newPassword: password,
      }),
    )
      .then(async (res) => {
        let {error_code, message, title, success} = res;

        if (success) {
          navigation.navigate(configs.screens.forgotPwd.berhasil);
        } else {
          if (error_code === 'token_used') {
            settitleSheet(title);
            setdescSheet(message);
            this.RBSheet.open();
          }
        }
      })
      .catch((e) => {
        return console.log('Catch Error', e.toString());
      });
  };

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <Loading isLoading={loadingRedux} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <BackNonLogin navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
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
            errorInfo={infoPwdError}
            focusAfterError={() => {
              setisPwdError(false);
              setinfoPwdError(false);
            }}
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
              resetPassword();
            }}
            disabled={isBtnDisabled}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={screenHeight * 0.25}
          customStyles={{
            container: {
              paddingBottom: RFValue(16),
              borderRadius: RFValue(16),
            },
          }}>
          <View style={styles.rbSheetView}>
            <Text style={styles.rbSheetTitle}>{titleSheet}</Text>
            <Text style={styles.rbSheetDesc}>{descSheet}</Text>
            <View style={styles.containerBottomSheet}>
              <Button
                text={'Kembali Ke Halaman Login'}
                onPress={async () => {
                  this.RBSheet.close();
                  await utilities.navigateRoute.resetToLogin({
                    navigation: navigation,
                  });
                }}
              />
            </View>
          </View>
        </RBSheet>
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

export default LupaPassword;
