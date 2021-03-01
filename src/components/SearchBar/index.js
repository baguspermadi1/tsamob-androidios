import configs from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const SearchBar = ({valueText, placeholder, onChangeText, style, onCancel}) => {
  return (
    <>
      <View
        style={{
          ...styles.containerComponentInput,
          ...style,
        }}>
        <Icon
          name={'search'}
          containerStyle={styles.searchIcon}
          color={configs.colors.primary.Sapphire.base}
          size={configs.sizes.Icon.XXL}
        />
        <Input
          inputStyle={{
            fontSize: configs.sizes.Text.M,
            fontFamily: configs.fonts.OpenSans.SemiBold,
          }}
          value={valueText}
          placeholder={placeholder}
          containerStyle={styles.containerInput}
          inputContainerStyle={styles.inputContainer}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
        {valueText ? (
          <Icon
            name={'cancel'}
            onPress={onCancel}
            containerStyle={{marginHorizontal: RFValue(4)}}
            color={configs.colors.neutral.Grey.base}
            size={configs.sizes.Icon.L}
          />
        ) : null}
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  containerComponentInput: {
    height: RFValue(48),
    backgroundColor: configs.colors.neutral.Grey.light,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(4),
  },
  containerInput: {
    height: '0%',
    width: '70%',
  },
  inputContainer: {borderBottomWidth: 0},
  searchIcon: {
    marginRight: RFValue(8),
    width: RFValue(48),
    height: RFValue(48),
    backgroundColor: '#E2E2E2',
    borderTopLeftRadius: RFValue(6),
    borderBottomLeftRadius: RFValue(6),
    justifyContent: 'center',
  },
});
