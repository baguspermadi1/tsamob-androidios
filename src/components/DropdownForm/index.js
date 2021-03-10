import configs from '@configs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const DropdownForm = ({
  valueText,
  placeholder,
  isError,
  errorInfo,
  style,
  onSelect,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.containerComponentInput,
          borderColor: isError
            ? configs.colors.secondary.Ruby.light
            : configs.colors.neutral.White.base,
          ...style,
        }}
        onPress={() => onSelect()}>
        <View style={styles.containerInput}>
          {valueText ? (
            <View>
              <Text style={styles.placeholderActive}>{placeholder}</Text>
              <Text
                style={{
                  fontSize: configs.sizes.Text.M,
                  fontFamily: configs.fonts.OpenSans.SemiBold,
                }}>
                {valueText}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholderInactive}>{placeholder}</Text>
          )}
        </View>
        <Icon name={'arrow-drop-down'} size={configs.sizes.Icon.XXL} />
      </TouchableOpacity>
      {isError && <Text style={styles.errorInfo}>{errorInfo}</Text>}
    </>
  );
};

export default DropdownForm;

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
    width: '92%',
    paddingHorizontal: RFValue(8),
  },
  inputContainer: {borderBottomWidth: 0},
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
  },
  placeholderActive: {
    color: configs.colors.neutral.states.blur,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Bold,
    marginBottom: RFValue(8),
  },
  placeholderInactive: {
    color: configs.colors.neutral.states.inactive,
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.Regular,
  },
});
