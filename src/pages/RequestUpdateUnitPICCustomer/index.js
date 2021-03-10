import {
  Button,
  DropdownInput,
  HeaderLogin,
  Loading,
  MultipleDropdown,
} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const RequestUpdateUnitPICCustomer = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);
  const [unit, setunit] = useState('');
  const [noRangka, setnoRangka] = useState('');
  const [penggunaBaru, setpenggunaBaru] = useState([]);

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
                padding: RFValue(16),
              }}>
              <DropdownInput
                label={'Nomor Kendaraan'}
                style={{marginBottom: RFValue(8)}}
                selectText={unit}
                onSelect={(value) => {
                  setunit(value.plat);
                  setnoRangka(value.nomorRangka);
                }}
                dataList={[
                  {plat: 'B 1234 BSL', nomorRangka: 'ALDIJAO324SADKJ8H'},
                  {plat: 'D 9203 KSD', nomorRangka: 'ASDKLJ2310CSAD123'},
                ]}
                selectTitle={'plat'}
                idDropDown={'RBSheetUnit'}
                headerText={'Pilih Unit'}
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
                    {noRangka}
                  </Text>
                </View>
              </View>
            </View>
            {unit !== '' && (
              <>
                <View style={styles.separatorSection} />
                <View
                  style={{
                    padding: RFValue(16),
                  }}>
                  <Text
                    style={{
                      fontFamily: configs.fonts.OpenSans.SemiBold,
                      fontSize: configs.sizes.Text.L,
                      marginBottom: RFValue(16),
                    }}>
                    Daftar Pengguna Saat Ini
                  </Text>
                  <FlatList
                    scrollEnabled={false}
                    data={[
                      {name: 'Anton', phone: '0812288330022'},
                      {name: 'Budi', phone: '0812288330022'},
                      {name: 'Febri', phone: '0812288330022'},
                    ]}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    renderItem={({item}) => (
                      <View style={styles.containerSaatIni}>
                        <Text
                          style={{
                            color: configs.colors.neutral.Grey.dark,
                            fontFamily: configs.fonts.OpenSans.SemiBold,
                            fontSize: configs.sizes.Text.L,
                            marginBottom: RFValue(4),
                          }}>
                          {item.name}
                        </Text>

                        <Text
                          style={{
                            color: configs.colors.neutral.Grey.dark,
                            fontFamily: configs.fonts.OpenSans.SemiBold,
                            fontSize: configs.sizes.Text.S,
                          }}>
                          {item.phone}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <View style={styles.separatorSection} />
                <View
                  style={{
                    padding: RFValue(16),
                  }}>
                  <Text
                    style={{
                      fontFamily: configs.fonts.OpenSans.SemiBold,
                      fontSize: configs.sizes.Text.L,
                      marginBottom: RFValue(16),
                    }}>
                    Tambah Pengguna Baru
                  </Text>
                  <MultipleDropdown
                    label={'Tambahkan Pengguna'}
                    placeholder={'Lihat Daftar User'}
                    idDropDown={'PenggunaBaru'}
                    dataList={[
                      {name: 'Anton', phone: '089922774422'},
                      {name: 'Budi', phone: '082233445566'},
                      {name: 'Febri', phone: '089922664422'},
                    ]}
                    headerText={'Cari Pengguna'}
                    placeholderSearch={'Cari Pengguna'}
                    selectTitle={'name'}
                    selectSecondary={'phone'}
                    onSelect={(value) => {
                      let newDataPenggunaBaru = penggunaBaru.filter(
                        (item) => item.name === value.name,
                      );
                      if (newDataPenggunaBaru.length <= 0) {
                        setpenggunaBaru([...penggunaBaru, value]);
                      } else {
                        newDataPenggunaBaru = penggunaBaru.filter(
                          (item) => item.name !== value.name,
                        );
                        setpenggunaBaru(newDataPenggunaBaru);
                      }
                    }}
                    selectedData={penggunaBaru}
                    onRemove={(value) => {
                      let newDataPenggunaBaru = penggunaBaru.filter(
                        (item) => item.name !== value.name,
                      );
                      setpenggunaBaru(newDataPenggunaBaru);
                    }}
                  />
                  {/* </View> */}
                </View>
              </>
            )}
          </ScrollView>
          <View style={styles.containerBottom}>
            <Button
              text={'Send Request'}
              onPress={() => {
                Keyboard.dismiss();
                setisLoading(true);
                setTimeout(() => {
                  setisLoading(false);
                  navigation.goBack();
                }, 1000);
              }}
            />
          </View>
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
  containerBottom: {
    bottom: RFValue(0),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  inputStatic: {
    minHeight: RFValue(40),
    width: '100%',
    backgroundColor: configs.colors.neutral.Grey.light,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
    borderBottomWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
  separatorSection: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: RFValue(8),
    width: screenWidth,
  },
  separator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: RFValue(1),
    width: screenWidth - RFValue(32),
    alignSelf: 'center',
  },
  containerSaatIni: {
    paddingVertical: RFValue(12),
    justifyContent: 'center',
  },
});

export default RequestUpdateUnitPICCustomer;
