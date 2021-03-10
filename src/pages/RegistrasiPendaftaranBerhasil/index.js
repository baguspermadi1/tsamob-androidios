import {BackNonLogin, Button, HeaderNonLogin} from '@components';
import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const RegistrasiPendaftaranBerhasil = ({navigation, route}) => {
  const [headerTitle, setheaderTitle] = useState('Pembuatan Akun Berhasil');
  const [headerDesc, setheaderDesc] = useState(
    'Segera lakukan aktivasi akun Anda dengan mengklik tautan yang dikirimkan melalui email',
  );

  const {showCompanyDataUnit} = route.params;

  useEffect(() => {
    if (showCompanyDataUnit) {
      setheaderTitle('Akun Dalam Proses Verifikasi');
      setheaderDesc(
        'Akun Anda sedang dalam proses verifikasi, mohon tunggu email selanjutnya.',
      );
    } else {
      setheaderTitle('Pembuatan Akun Berhasil');
      setheaderDesc(
        'Segera lakukan aktivasi akun Anda dengan mengklik tautan yang dikirimkan melalui email',
      );
    }
  }, [showCompanyDataUnit]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <View>
          <BackNonLogin navigation={navigation} />
          <HeaderNonLogin
            navigation={navigation}
            title={headerTitle}
            description={headerDesc}
          />
        </View>
        <View style={styles.containerBottom}>
          <Button
            text={'Selesai'}
            onPress={() => {
              Keyboard.dismiss();
              navigation.reset({
                index: 0,
                routes: [{name: configs.screens.login.main}],
              });
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
    marginTop: RFValue(8),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default RegistrasiPendaftaranBerhasil;
