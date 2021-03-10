import configs from '@configs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox as CheckBoxElement} from 'react-native-elements';

const CheckBox = ({navigation, title, checked, onPress}) => {
  return (
    <>
      <CheckBoxElement
        title={title}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        containerStyle={styles.containerStyle}
        checkedColor={configs.colors.primary.Sapphire.base}
        onPress={() => onPress()}
        textStyle={styles.textCheckBox}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: configs.colors.neutral.White.base,
    borderWidth: 0,
  },
  textCheckBox: {
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
  },
});

export default CheckBox;
