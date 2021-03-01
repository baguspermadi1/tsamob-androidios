import api from '@actions/api';
import {Button, HeaderNonLogin, Loading, TextInput} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
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
import CountDown from 'react-native-countdown-component';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isErrorEmail, setisErrorEmail] = useState(false);
  const [isErrorPassword, setisErrorPassword] = useState(false);
  const [errorInfoEmail, seterrorInfoEmail] = useState(false);
  const [errorInfoPassword, seterrorInfoPassword] = useState(false);
  const [rbSheetTitleActive, setrbSheetTitleActive] = useState('');
  const [rbSheetDescriptionActive, setrbSheetDescriptionActive] = useState('');
  const [errorCode, seterrorCode] = useState('');

  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const fetchLogin = async () => {
    await dispatch(
      api.Login.postLoginCustomer({email: email, password: password}),
    )
      .then(async (res) => {
        if (res.http_code === 200) {
          navigation.navigate(configs.screens.login.verifikasi, {
            login_token: res.data.login_token,
          });
        } else if (res.http_code === 400) {
          if (res.errors.Username) {
            setisErrorEmail(true);
            seterrorInfoEmail(res.errors?.Username);
          }

          if (res.errors.Password) {
            setisErrorPassword(true);
            seterrorInfoPassword(res.errors.Password);
          }
        } else if (res.error_code === 'wrong_password') {
          seterrorCode(res.error_code);
          setisErrorEmail(true);
          setisErrorPassword(true);
          seterrorInfoPassword('Username / Password yang anda masukkan salah!');
        }
      })
      .catch(() => {
        return console.log('error');
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderNonLogin navigation={navigation} title={'Login'} />
          <TextInput
            placeholder={'No. Handphone / Email'}
            placeholderActive={'Contoh : 0856 789 1011'}
            style={{marginBottom: RFValue(8)}}
            valueText={email}
            keyboardType={'default'}
            onChangeText={(text) => {
              setemail(text);
            }}
            isError={isErrorEmail}
            errorInfo={errorInfoEmail}
            focusAfterError={() => {
              setisErrorEmail(false);
              seterrorInfoEmail(false);
            }}
          />
          <TextInput
            placeholder={'Password'}
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
            isError={isErrorPassword}
            errorInfo={errorInfoPassword}
            focusAfterError={() => {
              setisErrorPassword(false);
              seterrorInfoPassword(false);
              if (errorCode === 'wrong_password') {
                setisErrorEmail(false);
                seterrorInfoEmail(false);
              }
            }}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() =>
              navigation.navigate(configs.screens.forgotPwd.email)
            }>
            <Text style={styles.forgotPasswordTxt}>Lupa Password</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              fetchLogin();
            }}
          />
          <Button
            text={'Daftar Akun Baru'}
            type={'outline'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate(configs.screens.regist.buatAkun);
            }}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={
            rbSheetTitleActive.includes('Berlaku') ||
            rbSheetTitleActive.includes('Dibekukan') ||
            rbSheetTitleActive.includes('Peringatan')
              ? screenHeight * 0.4
              : undefined
          }
          customStyles={{
            container: {
              paddingBottom: RFValue(16),
              borderRadius: RFValue(16),
            },
          }}>
          <View style={styles.rbSheetView}>
            <Text style={styles.rbSheetTitle}>{rbSheetTitleActive}</Text>
            <Text style={styles.rbSheetDesc}>{rbSheetDescriptionActive}</Text>

            <View style={{marginBottom: RFValue(24)}}>
              <CountDown
                until={70}
                size={RFValue(20)}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                digitTxtStyle={{color: configs.colors.neutral.Grey.dark}}
                showSeparator
                digitStyle={{
                  backgroundColor: configs.colors.neutral.White.base,
                }}
              />
            </View>

            <View style={styles.containerBottomSheet}>
              <Button
                text={'Mengerti'}
                onPress={() => {
                  this.RBSheet.close();
                  navigation.navigate(configs.screens.login.verifikasi);
                }}
              />
              {rbSheetTitleActive.includes('Berlaku') && (
                <Button
                  type={'underline'}
                  text={'Lihat Daftar Nomor CS Wilayah'}
                  onPress={() => {
                    console.log('Lihat Daftar Nomor CS Wilayah');
                    this.RBSheet.close();
                  }}
                />
              )}
              {rbSheetTitleActive.includes('Peringatan') && (
                <Button
                  type={'underline'}
                  text={'Lupa Password'}
                  onPress={() => {
                    navigation.navigate(configs.screens.forgotPwd.email);
                    this.RBSheet.close();
                  }}
                />
              )}
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
  forgotPassword: {
    width: screenWidth / 3,
    alignSelf: 'flex-end',
  },
  forgotPasswordTxt: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.M,
    fontFamily: configs.fonts.OpenSans.Bold,
    textDecorationLine: 'underline',
  },
});

export default Login;
