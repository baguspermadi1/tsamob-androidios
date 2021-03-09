import {
  BackNonLogin,
  Button,
  DatePickerSimple,
  Dropdown,
  DropdownForm,
  HeaderNonLogin,
  InputWithSelector,
  Loading,
  PlatInput,
  TextInput,
} from '@components';
import configs from '@configs';
import moment from 'moment';
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
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

const {width: screenWidth} = Dimensions.get('screen');

const RegistrasiDataDiri = ({navigation, route}) => {
  const loadingRedux = useSelector((state) => state.loading);

  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [namaPerusahaan, setnamaPerusahaan] = useState('');
  const [kodeDaerah, setkodeDaerah] = useState('');
  const [nopol, setnopol] = useState('');
  const [seriDaerah, setseriDaerah] = useState('');
  const [title, settitle] = useState('Mr');
  const [namaLengkap, setnamaLengkap] = useState('');
  const [tanggalLahir, settanggalLahir] = useState('');
  const [role, setrole] = useState('UP');
  const [nomorHandphone, setnomorHandphone] = useState('');
  const [email, setemail] = useState('');
  const [licensePlate, setlicensePlate] = useState('');

  const {
    showCompanyDataUnit,
    dataCheckRegistration,
    kodeDaerah: paramKodeDaerah,
    nopol: paramNopol,
    seriDaerah: paramseriDaerah,
  } = route.params;

  useEffect(() => {
    let {
      ContactPersonDateOfBirth,
      ContactPersonEmail,
      ContactPersonName,
      ContactPersonPhoneNumber,
      ContactPersonTitle,
      CustomerName,
      IsPic,
      LicensePlate,
    } = dataCheckRegistration;

    setnamaPerusahaan(CustomerName);
    setlicensePlate(LicensePlate);
    if (ContactPersonTitle) {
      settitle(ContactPersonTitle);
    } else {
      settitle('Mr');
    }
    setnamaLengkap(ContactPersonName);
    if (ContactPersonDateOfBirth) {
      settanggalLahir(
        moment(ContactPersonDateOfBirth, 'YYYY-MM-DD').format('DD-MM-YYYY'),
      );
    }
    if (IsPic) {
      setrole('PIC');
    } else {
      setrole('UP');
    }
    setnomorHandphone(ContactPersonPhoneNumber);
    setemail(ContactPersonEmail);
    setkodeDaerah(paramKodeDaerah);
    setnopol(paramNopol);
    setseriDaerah(paramseriDaerah);
  }, [dataCheckRegistration, paramKodeDaerah, paramNopol, paramseriDaerah]);

  useEffect(() => {
    if (showCompanyDataUnit) {
      if (
        namaPerusahaan &&
        kodeDaerah &&
        nopol &&
        seriDaerah &&
        title &&
        namaLengkap &&
        tanggalLahir &&
        role &&
        nomorHandphone &&
        email
      ) {
        setisBtnDisabled(false);
      } else {
        setisBtnDisabled(true);
      }
    } else {
      if (
        title &&
        namaLengkap &&
        tanggalLahir &&
        role &&
        nomorHandphone &&
        email
      ) {
        setisBtnDisabled(false);
      } else {
        setisBtnDisabled(true);
      }
    }
  }, [
    title,
    namaLengkap,
    tanggalLahir,
    role,
    nomorHandphone,
    email,
    showCompanyDataUnit,
    namaPerusahaan,
    kodeDaerah,
    nopol,
    seriDaerah,
  ]);

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
          {showCompanyDataUnit && (
            <View>
              <HeaderNonLogin
                navigation={navigation}
                title={'Data Perusahaan dan Unit'}
                description={
                  'Lengkapi form data perusahaan dan unit untuk mendaftarkan akun Anda'
                }
              />
              <TextInput
                placeholder={'Nama Perusahaan'}
                style={{marginBottom: RFValue(16)}}
                valueText={namaPerusahaan}
                onChangeText={(text) => {
                  setnamaPerusahaan(text);
                }}
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
            </View>
          )}
          <HeaderNonLogin
            navigation={navigation}
            title={'Data Diri'}
            description={'Lengkapi form data diri untuk mendaftarkan akun Anda'}
          />
          <InputWithSelector
            placeholder={'Nama Lengkap'}
            style={{marginBottom: RFValue(8)}}
            valueText={namaLengkap}
            onChangeText={(text) => {
              setnamaLengkap(text);
            }}
            selectText={title}
            onSelect={(value) => settitle(value)}
            idDropDown={'RBSheetNamaLengkap'}
            dataSelector={['Mr', 'Mrs']}
          />
          <DropdownForm
            placeholder={'Tanggal Lahir'}
            style={{marginBottom: RFValue(8)}}
            valueText={tanggalLahir}
            onSelect={() => this[RBSheet + 'RBSheetTTL'].open()}
          />
          <DatePickerSimple
            onSelect={(text) => {
              settanggalLahir(text);
            }}
            idDropDown={'RBSheetTTL'}
          />
          <Dropdown
            placeholder={'Pilih Role'}
            style={{marginBottom: RFValue(8)}}
            selectText={role}
            onSelect={(value) => setrole(value.name)}
            dataList={[
              {name: 'UP', description: 'User Pengguna'},
              {name: 'PIC', description: 'Penanggung Jawab'},
            ]}
            selectDescription={'description'}
            selectTitle={'name'}
            idDropDown={'RBSheetRole'}
          />
          <TextInput
            placeholder={'Nomer Handphone'}
            placeholderActive={'Contoh: 0812 6823 0410'}
            style={{marginBottom: RFValue(8)}}
            valueText={nomorHandphone}
            keyboardType={'number-pad'}
            onChangeText={(text) => {
              setnomorHandphone(text);
            }}
          />
          <TextInput
            placeholder={'Email Anda'}
            placeholderActive={'Contoh : johndoe@mail.com'}
            style={{marginBottom: RFValue(8)}}
            valueText={email}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              setemail(text);
            }}
          />
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate(configs.screens.regist.buatPassword, {
                namaPerusahaan: namaPerusahaan,
                kodeDaerah: kodeDaerah,
                nopol: nopol,
                seriDaerah: seriDaerah,
                title: title,
                namaLengkap: namaLengkap,
                tanggalLahir: tanggalLahir,
                role: role,
                nomorHandphone: nomorHandphone,
                email: email,
                licensePlate: showCompanyDataUnit
                  ? `${kodeDaerah}${nopol}${seriDaerah}`
                  : licensePlate,
                showCompanyDataUnit: showCompanyDataUnit,
              });
            }}
            disabled={isBtnDisabled}
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
    backgroundColor: 'transparent',
  },
  containerBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(24),
  },
});

export default RegistrasiDataDiri;
