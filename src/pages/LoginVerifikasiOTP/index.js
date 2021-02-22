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

const {width: screenWidth} = Dimensions.get('screen');

const LoginVerifikasiOTP = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);
  const [otp, setotp] = useState('');
  const [isErrorOTP, setisErrorOTP] = useState(false);
  const [errorOTPDesc, seterrorOTPDesc] = useState(false);
  const [isTimeout, setisTimeout] = useState(false);

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
            pinCount={4}
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
              until={5}
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
            onPress={() => {
              Keyboard.dismiss();
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                seterrorOTPDesc('Kode verifikasi salah');
                seterrorOTPDesc(
                  'kode verifikasi sudah tidak berlaku, silahkan kirim ulang',
                );
                setisErrorOTP(true);
                navigation.reset({
                  index: 0,
                  routes: [{name: configs.screens.stack.main}],
                });
              }, 1000);
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
    backgroundColor: 'white',
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
