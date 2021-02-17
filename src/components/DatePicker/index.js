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

const DatePicker = ({
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
  const [heightRBSheet, setheightRBSheet] = useState(0);

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
        onPress={() => this[RBSheet + idDropDown].open()}>
        <View style={styles.containerInput}>
          {valueText ? (
            <View>
              <Text
                style={{
                  color: configs.colors.neutral.Grey.dark,
                  fontSize: configs.sizes.Text.S,
                  fontFamily: configs.fonts.OpenSans.Bold,
                  marginBottom: RFValue(4),
                }}>
                {placeholder}
              </Text>
              <Text
                style={{
                  fontSize: configs.sizes.Text.M,
                  fontFamily: configs.fonts.OpenSans.Regular,
                }}>
                {valueText}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                color: '#9AA5AE',
                fontSize: configs.sizes.Text.L,
                fontFamily: configs.fonts.OpenSans.Regular,
              }}>
              {placeholder}
            </Text>
          )}
        </View>
        <Icon name={'arrow-drop-down'} size={configs.sizes.Icon.XXL} />
      </TouchableOpacity>
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
          <Text
            style={{
              fontFamily: configs.fonts.OpenSans.Bold,
              fontSize: configs.sizes.Text.L,
              color: configs.colors.neutral.Grey.dark,
              textAlign: 'center',
              paddingVertical: RFValue(20),
            }}>
            Tanggal Lahir
          </Text>
          <FlatList
            data={['Mr']}
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

export default DatePicker;

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
  rbSheetSeparator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    width: '100%',
    height: RFValue(1),
  },
  rbSheetView: {padding: RFValue(16), flex: 1},
});
