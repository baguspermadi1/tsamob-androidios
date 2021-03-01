import {Button, Loading} from '@components';
import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const menu = [
  {
    name: 'Daftar Pemakai Kendaraan',
    screen: configs.screens.profile.daftarPemakaiKendaraan.main,
  },
  {name: 'View Unit', screen: configs.screens.profile.viewUnit},
  {name: 'Request Update Unit', screen: configs.screens.profile.requestUMD},
  {name: 'Ganti Password', screen: configs.screens.profile.gantiPass},
  {name: 'Hubungi Kami', screen: configs.screens.profile.hubungiKami},
  {name: 'Keluar', screen: configs.screens.profile.logout},
];

const StackProfile = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Loading isLoading={isLoading} />
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
        ListHeaderComponent={() => (
          <View style={styles.containerTop}>
            <View style={styles.containerImage}>
              <Image source={configs.images.trac_logo} style={styles.image} />
            </View>
            <Text
              style={{
                color: configs.colors.neutral.White.base,
                fontFamily: configs.fonts.OpenSans.Bold,
                fontSize: configs.sizes.Text.L,
              }}>
              Basuki Andrian
            </Text>
            <Text
              style={{
                color: configs.colors.neutral.White.base,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.S,
                marginTop: RFValue(4),
                marginBottom: RFValue(16),
              }}>
              +628 12 6116 8290
            </Text>
            <Button
              text={'Edit Profile'}
              btnSize={'small'}
              styleButton={{
                backgroundColor: configs.colors.neutral.White.base,
                width: RFValue(120),
              }}
              styleText={{color: configs.colors.primary.Sapphire.base}}
            />
          </View>
        )}
        contentContainerStyle={{
          backgroundColor: configs.colors.neutral.White.base,
          paddingBottom: screenHeight * 0.15,
        }}
        showsVerticalScrollIndicator={false}
        data={menu}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.containerMenu}
            onPress={() => {
              if (item.screen === 'Keluar') {
                navigation.reset({
                  index: 0,
                  routes: [{name: configs.screens.login.main}],
                });
              } else {
                navigation.navigate(item.screen);
              }
            }}>
            <View style={styles.containerImgMenu} />
            <Text
              style={{
                color: configs.colors.neutral.Grey.dark,
                fontFamily: configs.fonts.OpenSans.SemiBold,
                fontSize: configs.sizes.Text.M,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.scrollinset}>
        <View style={styles.topBounce} />
        <View style={styles.bottomBounce} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    backgroundColor: configs.colors.primary.Sapphire.base,
    height: screenHeight * 0.32,
    alignItems: 'center',
  },
  containerImage: {
    backgroundColor: configs.colors.neutral.White.base,
    height: screenWidth * 0.25,
    width: screenWidth * 0.25,
    borderRadius: screenWidth * 0.25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(16),
  },
  image: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    resizeMode: 'contain',
  },
  containerMenu: {
    paddingHorizontal: RFValue(24),
    height: RFValue(56),
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerImgMenu: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: screenWidth * 0.1,
    width: screenWidth * 0.1,
    borderRadius: RFValue(8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(16),
  },
  separator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    height: RFValue(1),
    width: screenWidth - RFValue(24),
    alignSelf: 'flex-end',
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
});

export default StackProfile;
