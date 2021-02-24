import {Button} from '@components';
import configs from '@configs';
import React from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const StackProfile = ({navigation}) => {
  return (
    <>
      <View style={{backgroundColor: configs.colors.primary.Sapphire.base}}>
        <SafeAreaView>
          <StatusBar
            barStyle="light-content"
            backgroundColor={configs.colors.primary.Sapphire.base}
          />
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
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
        <FlatList
          contentContainerStyle={{
            backgroundColor: configs.colors.neutral.White.base,
            paddingBottom: RFValue(108),
            paddingTop: RFValue(16),
          }}
          showsVerticalScrollIndicator={false}
          data={[
            'Daftar Pemakai Kendaraan',
            'View Unit',
            'Request UMD',
            'Ganti Password',
            'Setting',
            'Hubungi Kami',
            'Keluar',
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.containerMenu}
              onPress={() => {
                if (item.toLowerCase().includes('keluar')) {
                  navigation.reset({
                    index: 0,
                    routes: [{name: configs.screens.login.main}],
                  });
                }
              }}>
              <View style={styles.containerImgMenu} />
              <Text
                style={{
                  color: configs.colors.neutral.Grey.dark,
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                  fontSize: configs.sizes.Text.M,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.White.base,
    flex: 1,
  },
  containerTop: {
    backgroundColor: configs.colors.primary.Sapphire.base,
    height: screenHeight * 0.32,
    alignItems: 'center',
  },
  containerImage: {
    backgroundColor: 'white',
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
    backgroundColor: '#F0F0F0',
    height: RFValue(1),
    width: screenWidth - RFValue(24),
    alignSelf: 'flex-end',
  },
});

export default StackProfile;
