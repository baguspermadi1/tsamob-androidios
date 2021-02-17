import configs from '@configs';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const NumberInput = ({
  valueText,
  placeholder,
  isError,
  errorInfo,
  onChangeText,
}) => {
  const [isFocus, setisFocus] = useState(false);

  return (
    <>
      <View
        style={{
          ...styles.containerComponentInput,
          borderColor:
            isFocus && !isError
              ? configs.colors.primary.Sapphire.base
              : isError
              ? configs.colors.secondary.Ruby.light
              : configs.colors.neutral.White.base,
        }}>
        <Text
          style={{
            color: configs.colors.primary.Sapphire.darker,
            fontSize: configs.sizes.Text.L,
            fontFamily: configs.fonts.OpenSans.SemiBold,
            paddingHorizontal: RFValue(8),
          }}>
          +62
        </Text>
        <View
          style={{
            width: RFValue(1),
            height: configs.sizes.Text.XL * 2,
            backgroundColor: configs.colors.neutral.Grey.light,
            marginHorizontal: RFValue(8),
          }}
        />
        <Input
          value={valueText}
          placeholder={placeholder}
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.inputContainer}
          keyboardType={'number-pad'}
          onFocus={(e) => setisFocus(true)}
          onBlur={(e) => setisFocus(false)}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
      </View>
      {isError && <Text style={styles.errorInfo}>{errorInfo}</Text>}
    </>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  containerComponentInput: {
    height: RFValue(64),
    width: '100%',
    backgroundColor: configs.colors.neutral.White.base,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
    borderWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
  containerInput: {
    width: '80%',
    height: '50%',
  },
  inputContainer: {borderBottomWidth: 0},
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
  },
});
