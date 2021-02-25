import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const PlatInput = ({
  label,
  valueText,
  placeholder,
  onChangeText,
  keyboardType,
}) => {
  const [isFocus, setisFocus] = useState(false);
  const [colorFocus, setcolorFocus] = useState(null);

  useEffect(() => {
    if (isFocus) {
      setcolorFocus(configs.colors.primary.Sapphire.base);
    } else {
      setcolorFocus(configs.colors.neutral.states.blur);
    }
  }, [isFocus]);

  return (
    <>
      <View
        style={{
          ...styles.containerComponentInput,
          borderColor: isFocus
            ? configs.colors.primary.Sapphire.base
            : configs.colors.neutral.White.base,
        }}>
        <Input
          value={valueText}
          label={label}
          labelStyle={{
            ...styles.label,
            color: colorFocus,
          }}
          placeholder={placeholder}
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          keyboardType={keyboardType}
          onFocus={(e) => setisFocus(true)}
          onBlur={(e) => setisFocus(false)}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
      </View>
    </>
  );
};

export default PlatInput;

const styles = StyleSheet.create({
  containerComponentInput: {
    height: RFValue(64),
    width: '32%',
    backgroundColor: configs.colors.neutral.White.base,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(2),
    borderWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
  containerInput: {
    height: '70%',
  },
  label: {
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.SemiBold,
  },
  input: {
    fontSize: configs.sizes.Text.M,
    fontFamily: configs.fonts.OpenSans.SemiBold,
    color: configs.colors.primary.Sapphire.dark,
  },
  inputContainer: {borderBottomWidth: 0},
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
  },
});
