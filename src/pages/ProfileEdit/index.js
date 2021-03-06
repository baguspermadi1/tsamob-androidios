import {
  Button,
  CheckBox,
  DatePickerSimple,
  HeaderLogin,
  TextInput,
} from '@components';
import configs from '@configs';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const ProfileEdit = ({navigation}) => {
  const [tanggalLahir, settanggalLahir] = useState('');
  const [namaCustomer, setnamaCustomer] = useState('');
  const [title, settitle] = useState('');

  return (
    <>
      <SafeAreaView style={styles.body}>
        <HeaderLogin title={'View Profile'} navigation={navigation} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={styles.keyboardAvoiding}
          enabled>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: configs.colors.neutral.Bluish.base,
            }}>
            <View
              style={{
                backgroundColor: configs.colors.primary.Sapphire.base,
                height: screenHeight / 8,
                borderBottomLeftRadius: RFValue(24),
                borderBottomRightRadius: RFValue(24),
              }}>
              <View style={styles.containerImage}>
                <Image source={configs.images.trac_logo} style={styles.image} />
              </View>
            </View>

            <View
              style={{
                marginTop: screenHeight / 10,
                paddingHorizontal: RFValue(16),
              }}>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>Nama Perusahaan</Text>
                <Text style={styles.value}>Bruce Enterprises</Text>
              </View>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>Nama Customer</Text>
                <View style={styles.rowUbah}>
                  <Text style={styles.value}>Bruce Wayne</Text>
                  <TouchableOpacity onPress={() => this.RBSheetCustomer.open()}>
                    <Text style={styles.actionBold}>Ubah</Text>
                  </TouchableOpacity>
                  <RBSheet
                    ref={(ref) => {
                      this.RBSheetCustomer = ref;
                    }}
                    height={screenHeight * 0.4}
                    customStyles={{
                      container: {
                        paddingBottom: RFValue(16),
                        borderTopLeftRadius: RFValue(16),
                        borderTopRightRadius: RFValue(16),
                      },
                    }}>
                    <View style={{padding: RFValue(16)}}>
                      <Text style={styles.titleRBSheet}>Nama Customer</Text>
                      <View style={styles.containerBox}>
                        <CheckBox
                          title={'Bapak'}
                          onPress={() => settitle('Bapak')}
                          checked={title === 'Bapak'}
                        />
                        <CheckBox
                          title={'Ibu'}
                          onPress={() => settitle('Ibu')}
                          checked={title === 'Ibu'}
                        />
                      </View>
                      <TextInput
                        valueText={namaCustomer}
                        placeholder={'Nama Customer'}
                        style={styles.customStylesInput}
                        onChangeText={(text) => setnamaCustomer(text)}
                        useLineStyles
                      />
                      <Button
                        text={'Simpan'}
                        onPress={() => {
                          this.RBSheetCustomer.close();
                          console.log('close');
                        }}
                      />
                    </View>
                  </RBSheet>
                </View>
              </View>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>No Ponsel</Text>
                <Text style={styles.value}>081288004492</Text>
              </View>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>wyvern@wynenterprise.com</Text>
              </View>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>Tanggal Lahir</Text>
                <View style={styles.rowUbah}>
                  <Text style={styles.value}>
                    {tanggalLahir
                      ? moment(tanggalLahir, 'DD/MM/YYYY').format(
                          'DD MMMM YYYY',
                        )
                      : ''}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this[RBSheet + 'RBSheetTTL'].open()}>
                    <Text style={styles.actionBold}>Ubah</Text>
                  </TouchableOpacity>
                  <DatePickerSimple
                    onSelect={(text) => {
                      settanggalLahir(text);
                      console.log(text);
                    }}
                    idDropDown={'RBSheetTTL'}
                  />
                </View>
              </View>
              <View style={{marginBottom: RFValue(16)}}>
                <Text style={styles.label}>Role</Text>
                <View style={styles.rowUbah}>
                  <Text style={styles.value}>User Pemakai</Text>
                </View>
              </View>
            </View>
          </ScrollView>
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
  keyboardAvoiding: {flex: 1},
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    flex: 1,
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
    backgroundColor: configs.colors.neutral.Bluish.base,
  },
  containerImage: {
    backgroundColor: configs.colors.neutral.White.base,
    height: screenWidth * 0.35,
    width: screenWidth * 0.35,
    borderRadius: screenWidth * 0.35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(16),
    bottom: -screenHeight * 0.015,
  },
  image: {
    width: screenWidth * 0.32,
    height: screenWidth * 0.32,
    borderRadius: screenWidth * 0.3,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.base,
  },
  value: {
    marginTop: RFValue(4),
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
  },
  actionBold: {
    marginTop: RFValue(4),
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.primary.Sapphire.base,
  },
  rowUbah: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customStylesInput: {
    borderWidth: 0,
    borderBottomWidth: RFValue(1),
    marginTop: RFValue(8),
    paddingHorizontal: 0,
    width: screenWidth - RFValue(48),
    marginHorizontal: RFValue(8),
    marginBottom: RFValue(40),
  },
  containerBox: {flexDirection: 'row'},
  titleRBSheet: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    marginBottom: RFValue(16),
  },
});

export default ProfileEdit;
