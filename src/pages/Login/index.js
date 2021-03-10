import api from '@actions/api';
import {Button, HeaderNonLogin, Loading, TextInput} from '@components';
import configs from '@configs';
import moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
import {
  Dimensions,
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
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hidePassword, sethidePassword] = useState(true);
  const [isErrUsername, setisErrUsername] = useState(false);
  const [isErrPassword, setisErrPassword] = useState(false);
  const [errInfoUsername, seterrInfoUsername] = useState(false);
  const [errInfoPassword, seterrInfoPassword] = useState(false);
  const [rbSheetErrTitle, setrbSheetErrTitle] = useState('');
  const [rbSheetErrDesc, setrbSheetErrDesc] = useState('');
  const [errorCode, seterrorCode] = useState('');
  const [countdown, setcountdown] = useState(0);

  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const fetchLogin = async () => {
    setisErrUsername(false);
    setisErrPassword(false);
    seterrInfoUsername(false);
    seterrInfoPassword(false);
    await dispatch(
      api.Authentication.postLoginCustomer({email: email, password: password}),
    )
      .then(async (res) => {
        let {error_code, success, errors, data, message, title} = res;

        if (success) {
          navigation.navigate(configs.screens.login.verifikasi, {
            login_token: data.login_token,
          });
        } else {
          seterrorCode(error_code);
          if (error_code === 'inline_validations') {
            errors.map((item) => {
              let errorMessages = item.messages.join('\n');

              if (item.field === 'Username') {
                setisErrUsername(true);
                seterrInfoUsername(errorMessages);
              }
              if (item.field === 'Password') {
                setisErrPassword(true);
                seterrInfoPassword(errorMessages);
              }
            });
          } else if (error_code === 'wrong_password') {
            setisErrUsername(true);
            setisErrPassword(true);
            seterrInfoPassword('Username / Password yang anda masukkan salah!');

            if (data.attempt >= 3) {
              setrbSheetErrTitle(title);
              setrbSheetErrDesc(message);
              this.RBSheet.open();
            }
          } else if (error_code === 'account_locked') {
            const now = moment();
            const later = moment(data.can_login_at);
            const diffSeconds = moment.duration(later.diff(now)).asSeconds();
            const countdownSecond =
              diffSeconds !== null && !isNaN(diffSeconds) ? diffSeconds : 0;

            moment.locale('id');
            const descDate = message.replace(
              data.can_login_at,
              moment(data.can_login_at)
                .locale('id')
                .format('DD MMMM YYYY HH:mm:ss'),
            );
            setcountdown(countdownSecond);
            setrbSheetErrTitle(title);
            setrbSheetErrDesc(descDate);
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
            isError={isErrUsername}
            errorInfo={errInfoUsername}
            focusAfterError={() => {
              setisErrUsername(false);
              seterrInfoUsername(false);
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
            isError={isErrPassword}
            errorInfo={errInfoPassword}
            focusAfterError={() => {
              setisErrPassword(false);
              seterrInfoPassword(false);
              if (errorCode === 'wrong_password') {
                setisErrUsername(false);
                seterrInfoUsername(false);
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
              fetchLogin();
            }}
          />
          <Button
            text={'Daftar Akun Baru'}
            type={'outline'}
            onPress={() => {
              navigation.navigate(configs.screens.regist.buatAkun);
            }}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={
            rbSheetErrTitle.includes('Berlaku') ||
            rbSheetErrTitle.includes('Dibekukan') ||
            errorCode === 'wrong_password'
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
            <Text style={styles.rbSheetTitle}>{rbSheetErrTitle}</Text>
            <Text style={styles.rbSheetDesc}>{rbSheetErrDesc}</Text>

            {rbSheetErrTitle.includes('Dibekukan') && (
              <View style={{marginBottom: RFValue(24)}}>
                <CountDown
                  until={countdown}
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
            )}

            <View style={styles.containerBottomSheet}>
              <Button text={'Mengerti'} onPress={() => this.RBSheet.close()} />
              {rbSheetErrTitle.includes('Berlaku') && (
                <Button
                  type={'underline'}
                  text={'Lihat Daftar Nomor CS Wilayah'}
                  onPress={() => this.RBSheet.close()}
                />
              )}
              {errorCode === 'wrong_password' && (
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
