/* eslint-disable react-native/no-inline-styles */
import configs from '@configs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const Button = ({text, onPress, disabled, type}) => {
  let typeButton = type ? type : 'solid';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? null : onPress}
      style={{
        ...styles.buttonContainer,
        backgroundColor: disabled
          ? '#DDDDDD'
          : typeButton === 'solid'
          ? configs.colors.primary.Sapphire.base
          : configs.colors.neutral.White.base,
        borderWidth: typeButton === 'solid' ? RFValue(0) : RFValue(1),
        borderColor: disabled
          ? '#DDDDDD'
          : configs.colors.primary.Sapphire.base,
      }}>
      <Text
        style={{
          color:
            typeButton === 'solid'
              ? configs.colors.neutral.White.base
              : configs.colors.primary.Sapphire.base,
          fontSize: configs.sizes.Text.L,
          fontFamily: configs.fonts.OpenSans.SemiBold,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    height: RFValue(56),
    width: '100%',
    borderRadius: RFValue(56),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
    marginBottom: RFValue(8),
  },
  buttonText: {
    color: configs.colors.neutral.White.base,
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.SemiBold,
  },
});
