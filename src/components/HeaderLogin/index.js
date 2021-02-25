import configs from '@configs';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const HeaderLogin = ({navigation, title, backFunction}) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={styles.containerIcon}
          onPress={backFunction ? backFunction : () => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={configs.sizes.Icon.XXL}
            color="white"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: configs.colors.neutral.White.base,
            fontFamily: configs.fonts.OpenSans.Bold,
            fontSize: configs.sizes.Text.M,
          }}>
          {title}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    flex: 1,
  },
  containerHeader: {
    backgroundColor: configs.colors.primary.Sapphire.base,
    height: RFValue(56),
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerIcon: {
    padding: RFValue(16),
    alignItems: 'center',
    marginRight: RFValue(4),
  },
});

export default HeaderLogin;
