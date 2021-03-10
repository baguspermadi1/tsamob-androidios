import {Loading, SearchBar} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const dummy = [
  {
    plat: 'B 1231 BB',
    merk: 'Ford',
    model: 'asd',
    lokasi: 'jakarta',
    pemakai: [
      {nama: 'Andi 1', phone: '081231231'},
      {nama: 'Andi 2', phone: '081231231'},
      {nama: 'Andi 3', phone: '081231231'},
    ],
  },
  {
    plat: 'B 1231 BB',
    merk: 'Ford',
    model: 'asd',
    lokasi: 'jakarta',
    pemakai: [
      {nama: 'Andi 1', phone: '081231231'},
      {nama: 'Andi 2', phone: '081231231'},
      {nama: 'Andi 3', phone: '081231231'},
    ],
  },
  {
    plat: 'B 1231 BB',
    merk: 'Ford',
    model: 'asd',
    lokasi: 'jakarta',
    pemakai: [
      {nama: 'Andi 1', phone: '081231231'},
      {nama: 'Andi 2', phone: '081231231'},
      {nama: 'Andi 3', phone: '081231231'},
    ],
  },
];

const DaftarPemakaiKendaraanDaftarKendaraan = ({navigation}) => {
  const [searchText, setsearchText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [pemakai, setpemakai] = useState([]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <SearchBar
        placeholder={'Cari Kendaraan'}
        valueText={searchText}
        onChangeText={(text) => setsearchText(text)}
        onCancel={() => setsearchText('')}
        style={{
          margin: RFValue(16),
          marginBottom: RFValue(16),
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
              }, 2000);
            }}
            refreshing={false}
          />
        }
        showsVerticalScrollIndicator={false}
        data={dummy}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.elementList}
            onPress={() => {
              setpemakai(item.pemakai);
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                this.RBSheetPemakai.open();
              }, 1000);
            }}>
            <View style={styles.topList}>
              <Text
                style={{
                  color: configs.colors.neutral.Grey.dark,
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.M,
                  marginBottom: RFValue(4),
                }}>
                {item.plat}
              </Text>

              <Text
                style={{
                  color: configs.colors.primary.Sapphire.base,
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.M,
                }}>
                Lihat Pemakai
              </Text>
            </View>
            <View style={styles.separator} />
            <Text
              style={{
                color: configs.colors.neutral.Grey.base,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(16),
              }}>
              Merk Kendaraan
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.Grey.dark,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(4),
              }}>
              {item.merk}
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.Grey.base,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(16),
              }}>
              Model Kendaraan
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.Grey.dark,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(4),
              }}>
              {item.model}
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.Grey.base,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(16),
              }}>
              Lokasi Kendaraan
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.Grey.dark,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
                marginTop: RFValue(4),
              }}>
              {item.lokasi}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separatorList} />}
      />
      <RBSheet
        ref={(ref) => {
          this.RBSheetPemakai = ref;
        }}
        height={screenHeight * 0.5}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderRadius: RFValue(16),
          },
        }}>
        <View style={styles.viewRBSheet}>
          <Text style={styles.rbSheetTitle}>Daftar Pemakai</Text>

          <FlatList
            data={pemakai}
            contentContainerStyle={styles.rbSheetView}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item, index}) => (
              <View style={styles.flContainer}>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.Regular,
                    fontSize: configs.sizes.Text.L,
                    color: configs.colors.neutral.Grey.dark,
                  }}>
                  {item.nama}
                </Text>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.Regular,
                    fontSize: configs.sizes.Text.L,
                    color: configs.colors.neutral.Grey.dark,
                  }}>
                  {item.phone}
                </Text>
              </View>
            )}
          />
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: RFValue(1),
    width: screenWidth - RFValue(32),
    alignSelf: 'center',
  },
  separatorList: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: RFValue(8),
    width: screenWidth,
  },
  elementList: {
    justifyContent: 'center',
    padding: RFValue(16),
  },
  topList: {flexDirection: 'row', justifyContent: 'space-between'},
  rbSheetView: {padding: RFValue(16), paddingBottom: RFValue(64)},
  rbSheetTitle: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
    margin: RFValue(16),
  },
  flContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
  },
});

export default DaftarPemakaiKendaraanDaftarKendaraan;
