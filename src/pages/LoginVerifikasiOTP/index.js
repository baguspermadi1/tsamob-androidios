import api from '@actions/api';
import {BackNonLogin, Button, HeaderNonLogin, Loading} from '@components';
import configs from '@configs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
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
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth} = Dimensions.get('screen');

const LoginVerifikasiOTP = ({navigation, route}) => {
  const [otp, setotp] = useState('');
  const [isErrorOTP, setisErrorOTP] = useState(false);
  const [errorOTPDesc, seterrorOTPDesc] = useState(false);
  const [isTimeout, setisTimeout] = useState(false);

  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const fetchVerifyOTP = async () => {
    await dispatch(
      api.Login.postVerifyOTP({
        loginToken: route.params.login_token,
        otpCode: otp,
      }),
    )
      .then((res) => {
        if (res.http_code === 200) {
          navigation.reset({
            index: 0,
            routes: [{name: configs.screens.stack.main}],
          });
        } else if (res.error_code === 'wrong_otp') {
          setisErrorOTP(true);
          seterrorOTPDesc('Kode verifikasi salah');
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
        <BackNonLogin navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderNonLogin
            navigation={navigation}
            title={'Verifikasi'}
            customDescription={
              <Text
                style={{
                  color: configs.colors.primary.Sapphire.darker,
                  fontSize: configs.sizes.Text.L,
                  fontFamily: configs.fonts.OpenSans.Regular,
                  marginBottom: RFValue(16),
                }}>
                Masukan kode verifikasi yang telah dikirimkan melalu sms ke No.{' '}
                <Text
                  style={{
                    color: configs.colors.primary.Sapphire.darker,
                    fontSize: configs.sizes.Text.L,
                    fontFamily: configs.fonts.OpenSans.Bold,
                    marginBottom: RFValue(16),
                  }}>
                  08574839222
                </Text>
              </Text>
            }
          />
          <OTPInputView
            style={{height: RFValue(72)}}
            pinCount={6}
            code={otp}
            autoFocusOnLoad
            codeInputFieldStyle={{
              ...styles.codeInputField,
              borderColor: isErrorOTP
                ? configs.colors.secondary.Ruby.light
                : configs.colors.neutral.White.base,
            }}
            codeInputHighlightStyle={{
              borderColor: configs.colors.primary.Sapphire.base,
            }}
            onCodeFilled={(code) => {
              setotp(code);
              setTimeout(() => {
                fetchVerifyOTP();
              }, 1000);
            }}
            onCodeChanged={(code) => {
              setisErrorOTP(false);
              setotp(code);
            }}
          />
          {isErrorOTP && <Text style={styles.errorInfo}>{errorOTPDesc}</Text>}

          <Text
            style={{
              color: configs.colors.primary.Sapphire.darker,
              fontSize: configs.sizes.Text.L,
              fontFamily: configs.fonts.OpenSans.Regular,
              marginTop: isErrorOTP ? RFValue(16) : RFValue(48),
            }}>
            Belum menerima kode verifikasi?
          </Text>
          {isTimeout ? (
            <TouchableOpacity onPress={() => setisTimeout(false)}>
              <Text style={styles.trySend}>Kirim Ulang</Text>
            </TouchableOpacity>
          ) : (
            <CountDown
              until={60}
              size={RFValue(20)}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              digitTxtStyle={{
                color: configs.colors.neutral.Grey.dark,
                fontSize: configs.sizes.Text.L,
              }}
              separatorStyle={{
                color: configs.colors.neutral.Grey.dark,
                fontSize: configs.sizes.Text.L,
              }}
              showSeparator
              digitStyle={{
                backgroundColor: configs.colors.neutral.Bluish.base,
                height: RFValue(24),
                width: RFValue(20),
              }}
              style={styles.countdown}
              onFinish={() => setisTimeout(true)}
            />
          )}
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Login'}
            disabled={otp.length < 4}
            onPress={() => {
              Keyboard.dismiss();
              fetchVerifyOTP();
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
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
    marginBottom: RFValue(16),
  },
  codeInputField: {
    width: RFValue(64),
    height: RFValue(64),
    borderWidth: 1,
    borderRadius: RFValue(6),
    backgroundColor: configs.colors.neutral.White.base,
    color: configs.colors.primary.Sapphire.base,
    fontSize: configs.sizes.Text.M * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trySend: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.Bold,
    textDecorationLine: 'underline',
  },
  countdown: {
    alignSelf: 'flex-start',
  },
});

export default LoginVerifikasiOTP;
