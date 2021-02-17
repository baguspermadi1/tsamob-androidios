import configs from '@configs';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const InputWithSelector = ({
  valueText,
  placeholder,
  isError,
  errorInfo,
  style,
  onChangeText,
  selectText,
  onSelect,
  idDropDown,
}) => {
  const [isFocus, setisFocus] = useState(false);
  const [heightRBSheet, setheightRBSheet] = useState(0);

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
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => this[RBSheet + idDropDown].open()}>
          <Text
            style={{
              color: configs.colors.primary.Sapphire.darker,
              fontSize: configs.sizes.Text.L,
              fontFamily: configs.fonts.OpenSans.SemiBold,
              paddingHorizontal: RFValue(8),
            }}>
            {selectText}
          </Text>
          <Icon name={'arrow-drop-down'} size={configs.sizes.Icon.XXL} />
        </TouchableOpacity>
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
          keyboardType={'default'}
          onFocus={(e) => setisFocus(true)}
          onBlur={(e) => setisFocus(false)}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
      </View>
      {isError && <Text style={styles.errorInfo}>{errorInfo}</Text>}
      <RBSheet
        ref={(ref) => {
          this[RBSheet + idDropDown] = ref;
        }}
        height={screenHeight * 0.35}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderRadius: RFValue(16),
          },
        }}>
        <View
          style={{flex: 1}}
          onLayout={(event) =>
            setheightRBSheet(event.nativeEvent.layout.height)
          }>
          <FlatList
            data={['Mr', 'Mrs']}
            contentContainerStyle={styles.rbSheetView}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => (
              <View style={styles.rbSheetSeparator} />
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  height: heightRBSheet * 0.45,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => onSelect(item)}>
                <Text
                  style={{
                    fontFamily: configs.fonts.OpenSans.Bold,
                    fontSize: configs.sizes.Text.XL,
                    color: configs.colors.neutral.Grey.dark,
                    alignSelf: 'center',
                    textAlign: 'center',
                    flex: 1,
                  }}>
                  {item}
                </Text>
                {selectText === item ? (
                  <Icon
                    name={'check-circle'}
                    size={configs.sizes.Icon.XXL}
                    color={configs.colors.primary.Sapphire.base}
                    containerStyle={{
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                    }}
                  />
                ) : (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                      width: configs.sizes.Icon.XXL,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </RBSheet>
    </>
  );
};

export default InputWithSelector;

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
    width: '70%',
    height: '50%',
  },
  inputContainer: {borderBottomWidth: 0},
  errorInfo: {
    color: configs.colors.secondary.Ruby.light,
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Regular,
    alignSelf: 'flex-end',
  },
  rbSheetSeparator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    width: '100%',
    height: RFValue(1),
  },
  rbSheetView: {padding: RFValue(16), flex: 1},
});
