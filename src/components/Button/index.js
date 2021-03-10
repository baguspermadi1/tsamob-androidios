import configs from '@configs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const Button = ({
  text,
  onPress,
  disabled,
  type,
  styleButton,
  styleText,
  btnSize,
}) => {
  type = type ? type : 'solid';
  btnSize = btnSize ? btnSize : 'large';

  let btnColor, brdrColor, brdrWidth, btnHeight, txtSize, txtColor;

  if (btnSize === 'small') {
    btnHeight = RFValue(40);
    txtSize = configs.sizes.Text.S;
  } else if (btnSize === 'medium') {
    btnHeight = RFValue(48);
    txtSize = configs.sizes.Text.M;
  } else {
    btnHeight = RFValue(56);
    txtSize = configs.sizes.Text.L;
  }

  if (!disabled) {
    if (type === 'solid') {
      btnColor = configs.colors.primary.Sapphire.base;
      brdrColor = configs.colors.primary.Sapphire.base;
      brdrWidth = RFValue(0);
      txtColor = configs.colors.neutral.White.base;
    } else {
      btnColor = null;
      brdrColor = configs.colors.primary.Sapphire.base;
      brdrWidth = RFValue(1);
      txtColor = configs.colors.primary.Sapphire.base;
    }
  } else {
    btnColor = configs.colors.neutral.states.disabled;
    brdrColor = configs.colors.neutral.states.disabled;
    txtColor = configs.colors.neutral.White.base;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? null : onPress}
      style={{
        ...styles.buttonContainer,
        height: btnHeight,
        backgroundColor: btnColor,
        borderWidth: brdrWidth,
        borderColor: brdrColor,
        ...styleButton,
      }}>
      <Text
        style={{
          color: txtColor,
          fontSize: txtSize,
          fontFamily: configs.fonts.OpenSans.SemiBold,
          ...styleText,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: RFValue(56),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
    marginBottom: RFValue(8),
  },
  buttonText: {
    fontFamily: configs.fonts.OpenSans.SemiBold,
  },
});
