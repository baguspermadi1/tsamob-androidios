import api from '@actions/api';
import localstorage from '@actions/constants/localstorage';
import {BackNonLogin, Button, HeaderNonLogin, Loading} from '@components';
import configs from '@configs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import utilities from '@utilities';
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
  const {login_token} = route.params;

  const fetchVerifyOTP = async (otpCode) => {
    await dispatch(
      api.Authentication.postVerifyOTP({
        loginToken: login_token,
        otpCode: otpCode,
      }),
    )
      .then(async (res) => {
        let {error_code, success, message, data} = res;

        if (success) {
          await utilities.asyncstorage.storeEncryptStorage({
            key: localstorage.AUTHENTICATION.ACCESS_TOKEN,
            value: data.access_token,
          });
          navigation.reset({
            index: 0,
            routes: [{name: configs.screens.stack.main}],
          });
        } else if (error_code === 'wrong_otp') {
          setisErrorOTP(true);
          seterrorOTPDesc(message);
        } else if (error_code === 'otp_expired') {
          setisErrorOTP(true);
          seterrorOTPDesc(message);
          setisTimeout(true);
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
                  0857483xxxx
                </Text>
              </Text>
            }
          />
          <OTPInputView
            style={{height: RFValue(72)}}
            pinCount={4}
            codeInputFieldStyle={{
              ...styles.codeInputField,
              borderColor: isErrorOTP
                ? configs.colors.secondary.Ruby.light
                : configs.colors.neutral.White.base,
            }}
            codeInputHighlightStyle={{
              borderColor: configs.colors.primary.Sapphire.base,
            }}
            onCodeFilled={(code) => fetchVerifyOTP(code)}
            onCodeChanged={(code) => {
              setotp(code);
              setisErrorOTP(false);
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
              fetchVerifyOTP(otp);
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
