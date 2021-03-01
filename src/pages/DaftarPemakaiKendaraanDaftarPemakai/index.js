import {Loading, SearchBar} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
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
    name: 'Andi',
    phone: '0812123123123',
    role: 'User Pemakai',
    statusKontrak: 'Status 1',
    unit: [
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
    ],
  },
  {
    name: 'Andi',
    phone: '0812123123123',
    role: 'User Pemakai',
    statusKontrak: 'Status 1',
    unit: [
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
    ],
  },
  {
    name: 'Andi',
    phone: '0812123123123',
    role: 'User Pemakai',
    statusKontrak: 'Status 1',
    unit: [
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
      {
        merk: 'Toyota',
        model: 'Fortuner',
        nomor: 'B 1313 GG',
        lokasi: 'Jakarta',
      },
    ],
  },
];

const DaftarPemakaiKendaraanDaftarPemakai = ({navigation}) => {
  const [searchText, setsearchText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [unit, setunit] = useState([]);
  const [pemakai, setpemakai] = useState({});

  return (
    <>
      <Loading isLoading={isLoading} />
      <SearchBar
        placeholder={'Cari Pemakai'}
        valueText={searchText}
        onChangeText={(text) => setsearchText(text)}
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
              setunit(item.unit);
              setpemakai(item);
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                this.RBSheetKendaraan.open();
              }, 1000);
            }}>
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
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <RBSheet
        ref={(ref) => {
          this.RBSheetKendaraan = ref;
        }}
        height={screenHeight * 0.9}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderRadius: RFValue(16),
          },
        }}>
        <ScrollView style={styles.rbSheetView}>
          <Text style={styles.labelHead}>Nama Pemakai</Text>
          <Text style={styles.valueHead}>{pemakai.name}</Text>
          <Text style={styles.labelHead}>Role</Text>
          <Text style={styles.valueHead}>{pemakai.role}</Text>
          <Text style={styles.labelHead}>No Handphone</Text>
          <Text style={styles.valueHead}>{pemakai.phone}</Text>
          <Text style={styles.labelHead}>Status Kontrak</Text>
          <Text style={styles.valueHead}>{pemakai.statusKontrak}</Text>
          <View style={{...styles.separator, marginVertical: RFValue(12)}} />
          <FlatList
            data={unit}
            scrollEnabled={false}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item, index}) => (
              <View style={styles.flContainer}>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.SemiBold,
                    fontSize: configs.sizes.Text.L,
                    color: configs.colors.neutral.Grey.dark,
                    marginVertical: RFValue(8),
                  }}>
                  Unit {index + 1}
                </Text>
                <View style={styles.groupingFL}>
                  <Text style={styles.flUnitHead}>Merk Kendaraan</Text>
                  <Text style={styles.flunitValue}>{item.merk}</Text>
                </View>
                <View style={styles.groupingFL}>
                  <Text style={styles.flUnitHead}>Model Kendaraan</Text>
                  <Text style={styles.flunitValue}>{item.model}</Text>
                </View>

                <View style={styles.groupingFL}>
                  <Text style={styles.flUnitHead}>Nomor Kendaraan</Text>
                  <Text style={styles.flunitValue}>{item.nomor}</Text>
                </View>

                <View style={styles.groupingFL}>
                  <Text style={styles.flUnitHead}>Lokasi Kendaraan</Text>
                  <Text style={styles.flunitValue}>{item.lokasi}</Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
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
  elementList: {
    padding: RFValue(16),
    justifyContent: 'center',
  },
  rbSheetView: {padding: RFValue(16), marginVertical: RFValue(16)},
  labelHead: {
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.S,
    color: configs.colors.neutral.Grey.base,
    marginBottom: RFValue(8),
  },
  valueHead: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Black.base,
    marginBottom: RFValue(16),
  },
  flUnitHead: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
  },
  flunitValue: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
  },
  groupingFL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(16),
  },
});

export default DaftarPemakaiKendaraanDaftarPemakai;
