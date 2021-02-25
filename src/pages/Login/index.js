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

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isErrorEmail, setisErrorEmail] = useState(false);
  const [isErrorPassword, setisErrorPassword] = useState(false);
  const [rbSheetTitleActive, setrbSheetTitleActive] = useState('');
  const [rbSheetDescriptionActive, setrbSheetDescriptionActive] = useState('');

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Loading isLoading={isLoading} />

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
            errorInfo={'No. Handphone / Email Tidak Terdaftar'}
            focusAfterError={() => setisErrorEmail(false)}
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
            errorInfo={'Username atau Password yang anda masukkan salah!'}
            focusAfterError={() => setisErrorPassword(false)}
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
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                setrbSheetTitleActive('Kontrak Sudah Tidak Berlaku');
                setrbSheetDescriptionActive(
                  'Silahkan hubungi Customer Servis wilayah anda untuk informasi lebih lanjut',
                );
                setrbSheetTitleActive('Aktifasi Akun Anda');
                setrbSheetDescriptionActive(
                  'Silahkan aktifasi akun anda terlebih dahulu dengan menggunakan tautan halaman yang dikirimkan melalui email',
                );
                setrbSheetTitleActive('Peringatan');
                setrbSheetDescriptionActive(
                  'Anda sudah 3x salah memasukan Password / Kata Sandi, akun anda akan dibekukan ketika anda sudah 5x salah berturut-turut',
                );
                setrbSheetTitleActive('Akun Dibekukan Sementara');
                setrbSheetDescriptionActive(
                  'Anda telah salah memasukan Password / Kata Sandi 5x, untuk kemanan akun dibekukan sementara selama ',
                );
                setisErrorPassword(true);
                this.RBSheet.open();
              }, 1000);
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
