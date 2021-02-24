import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const TextInput = ({
  valueText,
  placeholder,
  placeholderActive,
  isError,
  errorInfo,
  onChangeText,
  style,
  keyboardType,
  showPassword,
  rightIcon,
  rightIconColor,
  rightIconType,
  onRightIconPress,
  leftIcon,
  leftIconColor,
  leftIconType,
  onLeftIconPress,
  focusAfterError,
}) => {
  const [isFocus, setisFocus] = useState(false);
  const [colorFocus, setcolorFocus] = useState(false);
  const [height, setheight] = useState('0%');
  const [width, setwidth] = useState('0%');

  useEffect(() => {
    if (isFocus) {
      setcolorFocus(configs.colors.primary.Sapphire.base);
    } else {
      setcolorFocus('#86939E');
    }
  }, [isFocus]);

  useEffect(() => {
    if (valueText || isFocus) {
      setheight('70%');
    } else {
      setheight('60%');
    }
  }, [isFocus, valueText]);

  useEffect(() => {
    if (leftIcon || rightIcon) {
      setwidth('88%');
    } else {
      setwidth('100%');
    }
  }, [leftIcon, rightIcon]);

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
          ...style,
        }}>
        {leftIcon ? (
          <Icon
            name={leftIcon}
            type={leftIconType}
            onPress={onLeftIconPress}
            containerStyle={{marginHorizontal: RFValue(8)}}
            color={
              leftIconColor ? leftIconColor : configs.colors.neutral.Grey.base
            }
          />
        ) : null}
        <Input
          label={valueText || isFocus ? placeholder : ''}
          labelStyle={{
            ...styles.label,
            color: colorFocus,
          }}
          inputStyle={{
            fontSize: configs.sizes.Text.M,
            fontFamily: configs.fonts.OpenSans.SemiBold,
          }}
          secureTextEntry={showPassword}
          value={valueText}
          placeholder={valueText || isFocus ? placeholderActive : placeholder}
          containerStyle={{
            height: height,
            width: width,
          }}
          inputContainerStyle={styles.inputContainer}
          keyboardType={keyboardType ? keyboardType : 'default'}
          onFocus={(e) => {
            setisFocus(true);
            if (focusAfterError) {
              focusAfterError();
            }
          }}
          onBlur={(e) => setisFocus(false)}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
        {rightIcon ? (
          <Icon
            name={rightIcon}
            type={rightIconType}
            onPress={onRightIconPress}
            containerStyle={{marginHorizontal: RFValue(8)}}
            color={
              rightIconColor ? rightIconColor : configs.colors.neutral.Grey.base
            }
          />
        ) : null}
      </View>
      {isError && <Text style={styles.errorInfo}>{errorInfo}</Text>}
    </>
  );
};

export default TextInput;

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
    height: '70%',
  },
  inputContainer: {borderBottomWidth: 0},
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
    marginBottom: RFValue(16),
  },
  label: {
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
  },
});
