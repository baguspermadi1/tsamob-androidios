import configs from '@configs';
import React from 'react';
import {BackHandler, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const Header = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() =>
          navigation.canGoBack() ? navigation.goBack() : BackHandler.exitApp()
        }>
        <Icon
          name="chevron-left"
          color={configs.colors.primary.Sapphire.base}
          size={configs.sizes.Icon.M * 2}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    width: configs.sizes.Icon.L * 2,
    height: configs.sizes.Icon.L * 2,
    backgroundColor: configs.colors.neutral.White.base,
    justifyContent: 'center',
    borderRadius: configs.sizes.Icon.L * 2,
    marginBottom: RFValue(24),
  },
});

export default Header;
