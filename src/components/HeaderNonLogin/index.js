import configs from '@configs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const Header = ({
  navigation,
  title,
  description,
  customDescription,
  styleContainer,
}) => {
  return (
    <View style={styleContainer}>
      {title && <Text style={styles.headerLabel}>{title}</Text>}
      {customDescription ? (
        customDescription
      ) : (
        <Text style={styles.headerDescription}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    color: configs.colors.primary.Sapphire.darker,
    fontSize: configs.sizes.Text.XXL,
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
