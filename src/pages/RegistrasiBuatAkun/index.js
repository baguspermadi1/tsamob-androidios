import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  Loading,
  NumberInput,
  PlatInput,
} from '@components';
import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const ERRORCODE = [
  {
    code: 'ERROR001',
    title: 'Nomor Kendaraan Tidak Terdaftar',
    desc: 'Mohon periksa kembali nomor kendaraan Anda',
  },
  {
    code: 'ERROR002',
    title: 'Kontrak Sudah Tidak Berlaku',
    desc: 'Silahkan klik tombol Hubungi Kami  untuk informasi lebih lanjut',
  },
  {
    code: 'ERROR003',
    title: 'Anda Sudah Terdaftar',
    desc:
      'Nomor kendaraan dan nomor ponsel Anda sudah terdaftar, silahkan melanjutkan dengan Login',
  },
  {
    code: 'ERROR004',
    title: 'Aktivasi Akun Anda',
    desc:
      'Akun Anda belum dilakukan aktivasi, silahkan lakukan aktivasi dengan mengklik tautan yang dikirimkan melalui email',
  },
  {
    code: 'ERROR005',
    title: 'Lengkapi Data Diri',
    desc:
      'Nomor ponsel dan nomor kendaraan sudah terdaftar, mohon lengkapi data pendukung lainnya',
  },
  {
    code: 'ERROR006',
    title: 'Hubungkan Nomer Ponsel',
    desc:
      'Nomor kendaraan Anda belum terhubung dengan nomer ponsel. Silahkan melanjutkan dengan melengkapi data diri & kendaraan',
  },
  {
    code: 'ERROR007',
    title: 'Nomor Ponsel Tidak Terdaftar',
    desc: 'Silahkan melanjutkan dengan melengkapi data diri & kendaraan',
  },
];

const RegistrasiBuatAkun = ({navigation}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [kodeDaerah, setkodeDaerah] = useState('');
  const [nopol, setnopol] = useState('');
  const [seriDaerah, setseriDaerah] = useState('');
  const [rbSheetInfoActive, setrbSheetInfoActive] = useState('');
  const [rbSheetCodeValidate, setrbSheetCodeValidate] = useState('');
  const [rbSheetTitleValidate, setrbSheetTitleValidate] = useState('');
  const [rbSheetDescValidate, setrbSheetDescValidate] = useState('');
  const [isPhoneError, setisPhoneError] = useState(false);
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (
      kodeDaerah &&
      nopol &&
      seriDaerah &&
      phoneNumber.length >= 10 &&
      phoneNumber.length <= 11
    ) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [kodeDaerah, nopol, phoneNumber, seriDaerah]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <BackNonLogin navigation={navigation} />
        <Loading isLoading={isLoading} />
        <ScrollView>
          <HeaderNonLogin
            navigation={navigation}
            title={'Buat Akun'}
            description={'Masukan nomor ponsel Anda untuk membuat akun'}
          />
          <NumberInput
            placeholder={'856-789-1011'}
            valueText={phoneNumber}
            onChangeText={(text) => {
              if ((text.length > 0 && text.length < 10) || text.length > 11) {
                setisPhoneError(true);
              } else {
                setisPhoneError(false);
              }
              setphoneNumber(text);
            }}
            isError={isPhoneError}
            errorInfo={'Nomor Tidak Valid'}
            focusAfterError={() => setisPhoneError(false)}
          />
          <HeaderNonLogin
            navigation={navigation}
            description={'Masukan nomor kendaraan yang ingin didaftarkan'}
            styleContainer={{marginTop: RFValue(8)}}
          />
          <View style={styles.containerBody}>
            <PlatInput
              label={'Kode Daerah'}
              placeholder={'B'}
              valueText={kodeDaerah}
              keyboardType="default"
              onChangeText={(text) => setkodeDaerah(text.toUpperCase())}
            />
            <PlatInput
              label={'Nopol'}
              placeholder={'1234'}
              valueText={nopol}
              keyboardType="number-pad"
              onChangeText={(text) => setnopol(text)}
            />
            <PlatInput
              label={'Seri Daerah'}
              placeholder={'ZZ'}
              valueText={seriDaerah}
              keyboardType="default"
              onChangeText={(text) => setseriDaerah(text.toUpperCase())}
            />
          </View>
        </ScrollView>
        <View style={styles.containerBottom}>
          <Text style={styles.descriptionText}>
            Dengan membuat akun, Anda menyetujui{' '}
            <Text
              onPress={() => {
                this.RBSheetInfo.open();
                setrbSheetInfoActive('Syarat Ketentuan');
              }}
              style={styles.underlineText}>
              Syarat Ketentuan
            </Text>{' '}
            dan{' '}
            <Text
              onPress={() => {
                this.RBSheetInfo.open();
                setrbSheetInfoActive('Kebijakan Privasi');
              }}
              style={styles.underlineText}>
              Kebijakan Privasi
            </Text>
          </Text>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                setrbSheetCodeValidate(ERRORCODE[5].code);
                setrbSheetTitleValidate(ERRORCODE[5].title);
                setrbSheetDescValidate(ERRORCODE[5].desc);
                this.RBSheetValidate.open();
              }, 2000);
            }}
            disabled={isBtnDisabled}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheetInfo = ref;
          }}
          height={screenHeight * 0.95}
          customStyles={{
            container: {
              paddingBottom: RFValue(64),
              borderRadius: RFValue(16),
            },
          }}>
          <View style={{padding: RFValue(16)}}>
            <View style={styles.rbSheetLabel}>
              <Text
                style={{
                  fontFamily: configs.fonts.OpenSans.Bold,
                  fontSize: configs.sizes.Text.L,
                  color: configs.colors.neutral.Grey.dark,
                }}>
                {rbSheetInfoActive}
              </Text>
              <Text
                style={styles.rbSheetClose}
                onPress={() => this.RBSheetInfo.close()}>
                Tutup
              </Text>
            </View>
            <View style={styles.rbSheetSeparator} />
            <ScrollView>
              <Text style={styles.rbSheetDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </Text>
            </ScrollView>
          </View>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.RBSheetValidate = ref;
          }}
          height={
            rbSheetCodeValidate === ERRORCODE[1].code
              ? screenHeight * 0.33
              : undefined
          }
          customStyles={{
            container: {
              paddingBottom: RFValue(16),
              borderRadius: RFValue(16),
            },
          }}>
          <View style={styles.rbSheetView}>
            <Text style={styles.rbSheetTitle}>{rbSheetTitleValidate}</Text>
            <Text style={[styles.rbSheetDesc, styles.rbSheetDescValidate]}>
              {rbSheetDescValidate}
            </Text>

            <View style={styles.containerBottomSheet}>
              <Button
                text={
                  rbSheetCodeValidate === ERRORCODE[0].code
                    ? 'Coba Lagi'
                    : rbSheetCodeValidate === ERRORCODE[1].code
                    ? 'Hubungi Kami'
                    : rbSheetCodeValidate === ERRORCODE[2].code
                    ? 'Login'
                    : rbSheetCodeValidate === ERRORCODE[3].code
                    ? 'Mengerti'
                    : 'Lengkapi Data'
                }
                onPress={() => {
                  this.RBSheetValidate.close();
                  if (rbSheetCodeValidate === ERRORCODE[1].code) {
                    Linking.openURL('tel:081268006675');
                  } else if (rbSheetCodeValidate === ERRORCODE[2].code) {
                    navigation.reset({
                      index: 0,
                      routes: [{name: configs.screens.login.main}],
                    });
                  } else if (rbSheetCodeValidate === ERRORCODE[4].code) {
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: false,
                    });
                  } else if (
                    rbSheetCodeValidate === ERRORCODE[5].code ||
                    rbSheetCodeValidate === ERRORCODE[6].code
                  ) {
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: true,
                    });
                  }
                }}
              />
              {rbSheetCodeValidate === ERRORCODE[1].code && (
                <Button
                  type={'underline'}
                  text={'Mengerti'}
                  onPress={() => {
                    this.RBSheetValidate.close();
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: false,
                    });
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
  descriptionText: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    textAlign: 'center',
    marginBottom: RFValue(16),
  },
  underlineText: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Bold,
    textDecorationLine: 'underline',
  },
  loadingIndicator: {
    width: configs.sizes.Icon.XXL * 3,
    height: configs.sizes.Icon.XXL * 3,
    backgroundColor: configs.colors.neutral.White.base,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: configs.sizes.Icon.XXL * 3,
  },
  rbSheetDesc: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'auto',
  },
  rbSheetSeparator: {
    backgroundColor: configs.colors.neutral.Grey.base,
    width: '100%',
    height: RFValue(1),
    marginBottom: RFValue(16),
  },
  rbSheetClose: {
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.primary.Sapphire.base,
  },
  rbSheetLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(24),
  },
  containerBottomSheet: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  containerBody: {flexDirection: 'row', justifyContent: 'space-between'},
  rbSheetTitle: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    marginBottom: RFValue(8),
  },
  rbSheetDescValidate: {textAlign: 'center'},
  rbSheetView: {padding: RFValue(16), flex: 1},
});

export default RegistrasiBuatAkun;
