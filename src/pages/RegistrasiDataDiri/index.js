import {
  BackNonLogin,
  Button,
  DatePicker,
  Dropdown,
  HeaderNonLogin,
  InputWithSelector,
  TextInput,
} from '@components';
import configs from '@configs';
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
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const RegistrasiDataDiri = ({navigation}) => {
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [title, settitle] = useState('Bapak');
  const [namaLengkap, setnamaLengkap] = useState('');
  const [tanggalLahir, settanggalLahir] = useState('');
  const [role, setrole] = useState('PIC');
  const [nomorHandphone, setnomorHandphone] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
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
  }, [title, namaLengkap, tanggalLahir, role, nomorHandphone, email]);

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
          <HeaderNonLogin
            navigation={navigation}
            title={'Data Diri'}
            description={
              'Lengkapi form registrasi untuk mendaftarkan akun anda'
            }
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
            dataSelector={['Bapak', 'Ibu']}
          />
          <DatePicker
            placeholder={'Tanggal Lahir'}
            style={{marginBottom: RFValue(8)}}
            valueText={tanggalLahir}
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
              {name: 'PIC', description: 'Penanggung Jawab'},
              {name: 'UP', description: 'User Pengguna'},
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
              navigation.navigate(configs.screens.regist.buatPassword);
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
  },
});

export default RegistrasiDataDiri;
