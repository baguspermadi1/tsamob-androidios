import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  Loading,
  NumberInput,
} from '@components';
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
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RegistrasiBuatAkun = ({navigation}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [isPhoneError, setisPhoneError] = useState(false);
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [rbSheetActive, setrbSheetActive] = useState('');
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
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
              if (text.length < 10 || text.length > 11) {
                setisPhoneError(true);
                setisBtnDisabled(true);
              } else {
                setisPhoneError(false);
                setisBtnDisabled(false);
              }
              setphoneNumber(text);
            }}
            isError={isPhoneError}
            errorInfo={'Nomor Tidak Valid'}
            focusAfterError={() => setisPhoneError(false)}
          />
          <Loading isLoading={isLoading} />
        </ScrollView>
        <View style={styles.containerBottom}>
          <Text style={styles.descriptionText}>
            Dengan membuat akun, Anda menyetujui{' '}
            <Text
              onPress={() => {
                this.RBSheet.open();
                setrbSheetActive('Syarat Ketentuan');
              }}
              style={styles.underlineText}>
              Syarat Ketentuan
            </Text>{' '}
            dan{' '}
            <Text
              onPress={() => {
                this.RBSheet.open();
                setrbSheetActive('Kebijakan Privasi');
              }}
              style={styles.underlineText}>
              Kebijakan Privasi
            </Text>
          </Text>
          <Button
            text={'Lanjutkan'}
            onPress={() => {
              Keyboard.dismiss();
              console.log('lanjutkan');
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                navigation.navigate(configs.screens.regist.noKendaraan, {
                  phoneNumber: phoneNumber,
                });
              }, 2000);
            }}
            disabled={isBtnDisabled}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
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
                {rbSheetActive}
              </Text>
              <Text
                style={styles.rbSheetClose}
                onPress={() => this.RBSheet.close()}>
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
});

export default RegistrasiBuatAkun;
