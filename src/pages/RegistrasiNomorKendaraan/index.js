import {Button, HeaderNonLogin, PlatInput} from '@components';
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
  Text,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {OpacityDotsLoader} from 'react-native-indicator';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiNomorKendaraan = ({navigation}) => {
  const [kodeDaerah, setkodeDaerah] = useState('');
  const [nopol, setnopol] = useState('');
  const [seriDaerah, setseriDaerah] = useState('');
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [rbSheetTitleActive, setrbSheetTitleActive] = useState('');
  const [rbSheetDescriptionActive, setrbSheetDescriptionActive] = useState('');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (kodeDaerah && nopol && seriDaerah) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [kodeDaerah, nopol, seriDaerah]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <ScrollView>
          <HeaderNonLogin
            navigation={navigation}
            title={'Nomor Kendaraan'}
            description={'Masukan Nomor Kendaraan yang ingin anda gunakan'}
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
          <Overlay overlayStyle={styles.loadingIndicator} isVisible={isLoading}>
            <View>
              <OpacityDotsLoader
                color={configs.colors.primary.Sapphire.base}
                size={configs.sizes.Icon.XS}
                speed={150}
              />
            </View>
          </Overlay>
        </ScrollView>

        <View style={styles.containerBottom}>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                setrbSheetTitleActive('Hubungkan Nomer Handphone');
                setrbSheetDescriptionActive(
                  'Nomor Polisi Kendaraan anda belum terhubung dengan nomer ponsel. Silahkan melanjutkan dengan melengkapi data diri & kendaraan',
                );
                // setrbSheetTitleActive('Kontrak Sudah Tidak Berlaku');
                // setrbSheetDescriptionActive(
                //   'Silahkan hubungi Customer Servis wilayah anda untuk informasi lebih lanjut',
                // );
                this.RBSheet.open();
              }, 1000);
            }}
            disabled={isBtnDisabled}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={
            rbSheetTitleActive.includes('Berlaku')
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
            <Text style={styles.rbSheetTitle}>{rbSheetTitleActive}</Text>
            <Text style={styles.rbSheetDesc}>{rbSheetDescriptionActive}</Text>

            <View style={styles.containerBottomSheet}>
              <Button
                text={'Lengkapi Data'}
                onPress={() => {
                  console.log('Lengkapi Data');
                  this.RBSheet.close();
                  navigation.navigate('Registrasi Form');
                }}
              />
              {rbSheetTitleActive.includes('Berlaku') && (
                <Button
                  type={'underline'}
                  text={'Lihat Daftar Nomor Wilayah'}
                  onPress={() => {
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
  containerBottomSheet: {
    bottom: 0,
    position: 'absolute',
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
  containerBody: {flexDirection: 'row', justifyContent: 'space-between'},
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
});

export default RegistrasiNomorKendaraan;
