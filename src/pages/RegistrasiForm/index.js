import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  PlatInput,
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

const RegistrasiForm = ({navigation}) => {
  const [namaPerusahaan, setnamaPerusahaan] = useState('');
  const [kodeDaerah, setkodeDaerah] = useState('');
  const [nopol, setnopol] = useState('');
  const [seriDaerah, setseriDaerah] = useState('');
  const [isBtnDisabled, setisBtnDisabled] = useState(true);

  useEffect(() => {
    if (namaPerusahaan && kodeDaerah && nopol && seriDaerah) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [namaPerusahaan, kodeDaerah, nopol, seriDaerah]);

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
            title={'Registrasi'}
            description={
              'Lengkapi form registrasi untuk mendaftarkan akun anda'
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
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate(configs.screens.regist.dataDiri);
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
  containerBody: {flexDirection: 'row', justifyContent: 'space-between'},
  containerBottom: {
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default RegistrasiForm;
