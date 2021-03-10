import api from '@actions/api';
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
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
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
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiBuatAkun = ({navigation}) => {
  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const [phoneNumber, setphoneNumber] = useState('');
  const [kodeDaerah, setkodeDaerah] = useState('');
  const [nopol, setnopol] = useState('');
  const [seriDaerah, setseriDaerah] = useState('');
  const [errorCode, seterrorCode] = useState('');
  const [rbSheetTitleValidate, setrbSheetTitleValidate] = useState('');
  const [rbSheetDescValidate, setrbSheetDescValidate] = useState('');
  const [isPhoneError, setisPhoneError] = useState(false);
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [dataCheckRegistration, setdataCheckRegistration] = useState({});

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

  const checkRegistration = async () => {
    await dispatch(
      api.Registration.postCheckRegistration({
        phoneNumber: `0${phoneNumber}`,
        licensePlate: `${kodeDaerah}${nopol}${seriDaerah}`,
      }),
    )
      .then(async (res) => {
        let {error_code, message, title, data} = res;
        setdataCheckRegistration(data);
        seterrorCode(error_code);
        setrbSheetTitleValidate(title);
        setrbSheetDescValidate(message);
        this.RBSheetValidate.open();
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
              if (text.charAt(0) !== '0') {
                setphoneNumber(text);
              }
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
              length={2}
            />
            <PlatInput
              label={'Nopol'}
              placeholder={'1234'}
              valueText={nopol}
              keyboardType="number-pad"
              onChangeText={(text) => setnopol(text)}
              length={4}
            />
            <PlatInput
              label={'Seri Daerah'}
              placeholder={'ZZ'}
              valueText={seriDaerah}
              keyboardType="default"
              onChangeText={(text) => setseriDaerah(text.toUpperCase())}
              length={3}
            />
          </View>
        </ScrollView>
        <View style={styles.containerBottom}>
          <Text style={styles.descriptionText}>
            Dengan membuat akun, Anda menyetujui{' '}
            <Text
              onPress={() => {
                this.RBSheetInfo.open();
                seterrorCode('Syarat Ketentuan');
              }}
              style={styles.underlineText}>
              Syarat Ketentuan
            </Text>{' '}
            dan{' '}
            <Text
              onPress={() => {
                this.RBSheetInfo.open();
                seterrorCode('Kebijakan Privasi');
              }}
              style={styles.underlineText}>
              Kebijakan Privasi
            </Text>
          </Text>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              checkRegistration();
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
                {errorCode}
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
            errorCode === 'contract_end' ? screenHeight * 0.33 : undefined
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
                  errorCode === 'nopol_not_registered'
                    ? 'Coba Lagi'
                    : errorCode === 'contract_end'
                    ? 'Hubungi Kami'
                    : errorCode === 'account_registered'
                    ? 'Login'
                    : errorCode === 'waiting_activation'
                    ? 'Mengerti'
                    : 'Lengkapi Data'
                }
                onPress={() => {
                  this.RBSheetValidate.close();
                  if (errorCode === 'contract_end') {
                    this.RBSheetValidate.close();
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: false,
                      dataCheckRegistration: dataCheckRegistration,
                    });
                  } else if (errorCode === 'account_registered') {
                    navigation.reset({
                      index: 0,
                      routes: [{name: configs.screens.login.main}],
                    });
                  } else if (errorCode === 'personal_data_complete') {
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: false,
                      dataCheckRegistration: dataCheckRegistration,
                    });
                  } else if (
                    errorCode === 'connect_phone_number' ||
                    errorCode === 'phone_not_registered'
                  ) {
                    navigation.navigate(configs.screens.regist.dataDiri, {
                      phoneNumber: phoneNumber,
                      kodeDaerah: kodeDaerah,
                      nopol: nopol,
                      seriDaerah: seriDaerah,
                      showCompanyDataUnit: true,
                      dataCheckRegistration: dataCheckRegistration,
                    });
                  }
                }}
              />
              {errorCode === 'contract_end' && (
                <Button
                  type={'underline'}
                  text={'Mengerti'}
                  onPress={() => {
                    this.RBSheetValidate.close();
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
