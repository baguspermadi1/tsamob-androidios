import {Button, DropdownInput, HeaderLogin, Loading} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const RequestUpdateUnitEndUser = ({navigation}) => {
  const [unitSaatIni, setunitSaatIni] = useState('');
  const [noRangkaSaatIni, setnoRangkaSaatIni] = useState('');
  const [unitBaru, setunitBaru] = useState('');
  const [noRangkaBaru, setnoRangkaBaru] = useState('');
  const [rbSheetTitleValidate, setrbSheetTitleValidate] = useState('');
  const [rbSheetDescValidate, setrbSheetDescValidate] = useState('');
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.body}>
        <HeaderLogin title={'Request Update Unit'} navigation={navigation} />
        <Loading isLoading={isLoading} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={styles.avoidingView}
          enabled>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: configs.colors.neutral.White.base,
            }}>
            <View
              style={{
                marginTop: RFValue(24),
              }}>
              <Text
                style={{
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.XXL,
                  marginBottom: RFValue(16),
                }}>
                Unit Saat Ini
              </Text>
              <DropdownInput
                label={'Nomor Kendaraan'}
                style={{marginBottom: RFValue(8)}}
                selectText={unitSaatIni}
                onSelect={(value) => {
                  setunitSaatIni(value.plat);
                  setnoRangkaSaatIni(value.nomorRangka);
                }}
                dataList={[
                  {plat: 'B 1234 BSL', nomorRangka: 'ALDIJAO324SADKJ8H'},
                  {plat: 'D 9203 KSD', nomorRangka: 'ASDKLJ2310CSAD123'},
                ]}
                selectTitle={'plat'}
                idDropDown={'RBSheetUnitSaatIni'}
                headerText={'Pilih Unit Saat Ini'}
                placeholder={'Cari Unit'}
              />
              <View style={{marginVertical: RFValue(8)}}>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.Regular,
                    fontSize: configs.sizes.Text.S,
                  }}>
                  Nomor Rangka
                </Text>
                <View style={styles.inputStatic}>
                  <Text
                    style={{
                      fontSize: configs.sizes.Text.M,
                      fontFamily: configs.fonts.OpenSans.SemiBold,
                    }}>
                    {noRangkaSaatIni}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: RFValue(24),
              }}>
              <Text
                style={{
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.XXL,
                  marginBottom: RFValue(16),
                }}>
                Unit Baru
              </Text>
              <DropdownInput
                label={'Nomor Kendaraan'}
                style={{marginBottom: RFValue(8)}}
                selectText={unitBaru}
                onSelect={(value) => {
                  setunitBaru(value.plat);
                  setnoRangkaBaru(value.nomorRangka);
                }}
                dataList={[
                  {plat: 'B 1234 BSD', nomorRangka: 'ASDKLJ2310CSAD123'},
                  {plat: 'D 9203 KSD', nomorRangka: 'ASDKLJ2310CSAD132'},
                  {plat: 'L 2253 DKV', nomorRangka: 'ASDKLJ23ASDAA1235'},
                  {plat: 'E 7203 POE', nomorRangka: 'ALDIJAO324SADKJ8H'},
                ]}
                selectTitle={'plat'}
                idDropDown={'RBSheetUnitBaru'}
                headerText={'Pilih Unit Baru'}
                placeholder={'Cari Unit'}
              />
              <View style={{marginVertical: RFValue(8)}}>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.Regular,
                    fontSize: configs.sizes.Text.S,
                  }}>
                  Nomor Rangka
                </Text>
                <View style={styles.inputStatic}>
                  <Text
                    style={{
                      fontSize: configs.sizes.Text.M,
                      fontFamily: configs.fonts.OpenSans.SemiBold,
                    }}>
                    {noRangkaBaru}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.containerBottom}>
            <Button
              text={'Send Request'}
              onPress={() => {
                Keyboard.dismiss();
                setisLoading(true);
                setTimeout(() => {
                  setrbSheetTitleValidate(
                    'Unit terhubung dengan user pengguna lain',
                  );
                  setrbSheetDescValidate(
                    'Unit yang Anda pilih terdaftar dengan user atas nama Arif, Darto, Febri',
                  );
                  setisLoading(false);
                  this.RBSheetValidate.open();
                }, 1000);
              }}
            />
          </View>
          <RBSheet
            ref={(ref) => {
              this.RBSheetValidate = ref;
            }}
            height={screenHeight * 0.33}
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
                  text={'Mengerti'}
                  onPress={() => {
                    this.RBSheetValidate.close();
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
          </RBSheet>
        </KeyboardAvoidingView>
        <View style={styles.scrollinset}>
          <View style={styles.topBounce} />
          <View style={styles.bottomBounce} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.White.base,
    flex: 1,
  },
  avoidingView: {
    backgroundColor: configs.colors.neutral.White.base,
    flex: 1,
    padding: RFValue(16),
  },
  scrollinset: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  topBounce: {
    flex: 1,
    backgroundColor: configs.colors.primary.Sapphire.base,
  },
  bottomBounce: {
    flex: 1,
    backgroundColor: configs.colors.neutral.White.base,
  },
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(8),
  },
  txtCheckRegex: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
  },
  containerBottom: {
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  forgotPassword: {
    width: screenWidth / 3,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: RFValue(30),
  },
  forgotPasswordTxt: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.M,
    fontFamily: configs.fonts.OpenSans.Bold,
    textDecorationLine: 'underline',
  },
  label: {
    color: configs.colors.neutral.Grey.dark,
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.S,
    marginBottom: RFValue(4),
  },
  inputStatic: {
    height: RFValue(40),
    width: '100%',
    backgroundColor: configs.colors.neutral.White.base,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(8),
    borderBottomWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
  rbSheetTitle: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    marginBottom: RFValue(8),
  },
  rbSheetView: {padding: RFValue(32), flex: 1},
  rbSheetDescValidate: {textAlign: 'center'},
  rbSheetDesc: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'auto',
  },
  containerBottomSheet: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default RequestUpdateUnitEndUser;
