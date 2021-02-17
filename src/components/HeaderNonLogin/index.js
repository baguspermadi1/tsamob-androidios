import configs from '@configs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const Header = ({navigation, title, description}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-left"
          color={configs.colors.primary.Sapphire.base}
          size={configs.sizes.Icon.M * 2}
        />
      </TouchableOpacity>
      <Text style={styles.headerLabel}>{title}</Text>
      <Text style={styles.headerDescription}>{description}</Text>
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
  headerLabel: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.XXXL,
    fontFamily: configs.fonts.OpenSans.Bold,
    marginBottom: RFValue(8),
  },
  headerDescription: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.Regular,
    marginBottom: RFValue(16),
  },
});

export default Header;
