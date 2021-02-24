import configs from '@configs';
import Picker from '@gregfrench/react-native-wheel-picker';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from '../Button';
var PickerItem = Picker.Item;

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const DatePicker = ({
  valueText,
  placeholder,
  isError,
  errorInfo,
  style,
  onSelect,
  idDropDown,
}) => {
  const [date, setdate] = useState(new Date().getDate());
  const [month, setmonth] = useState(new Date().getMonth() + 1);
  const [year, setyear] = useState(new Date().getFullYear());
  const [listDate, setlistDate] = useState([]);
  const [listMonth] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]);
  const [listYear] = useState(
    Array.from({length: new Date().getFullYear()}, (_, i) =>
      (i + 1).toString(),
    ),
  );

  useEffect(() => {
    if (month === 2 && year % 4 === 0) {
      setlistDate(Array.from({length: 29}, (_, i) => (i + 1).toString()));
    } else if (month === 2 && year % 4 !== 0) {
      setlistDate(Array.from({length: 28}, (_, i) => (i + 1).toString()));
    } else if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      setlistDate(Array.from({length: 31}, (_, i) => (i + 1).toString()));
    } else {
      setlistDate(Array.from({length: 30}, (_, i) => (i + 1).toString()));
    }
  }, [date, month, year]);
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
      <RBSheet
        ref={(ref) => {
          this[RBSheet + idDropDown] = ref;
        }}
        height={screenHeight * 0.4}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderRadius: RFValue(16),
          },
        }}>
        <View style={styles.rbSheetView}>
          <Text
            style={{
              ...styles.titleRBSheet,
              marginBottom:
                Platform.OS === 'android' ? RFValue(24) : RFValue(12),
            }}>
            Tanggal Lahir
          </Text>
          <View
            style={{
              ...styles.containerPicker,
              marginBottom:
                Platform.OS === 'android' ? RFValue(20) : RFValue(40),
            }}>
            <Picker
              style={{
                width:
                  Platform.OS === 'android'
                    ? screenWidth * 0.28
                    : screenWidth * 0.3,
                height: screenWidth * 0.4,
              }}
              lineColor={configs.colors.primary.Sapphire.base}
              selectedValue={date - 1}
              itemSpace={32}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
                fontFamily: configs.fonts.OpenSans.Regular,
              }}
              onValueChange={(index) => setdate(index + 1)}>
              {listDate.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
            <Picker
              style={{
                width:
                  Platform.OS === 'android'
                    ? screenWidth * 0.28
                    : screenWidth * 0.3,
                height: screenWidth * 0.4,
              }}
              lineColor={configs.colors.primary.Sapphire.base}
              selectedValue={month - 1}
              itemSpace={27}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
                fontFamily: configs.fonts.OpenSans.Regular,
              }}
              onValueChange={(index) => setmonth(index + 1)}>
              {listMonth.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
            <Picker
              style={{
                width:
                  Platform.OS === 'android'
                    ? screenWidth * 0.28
                    : screenWidth * 0.3,
                height: screenWidth * 0.4,
              }}
              lineColor={configs.colors.primary.Sapphire.base}
              selectedValue={year - 1}
              itemSpace={32}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
                fontFamily: configs.fonts.OpenSans.Regular,
              }}
              onValueChange={(index) => setyear(index + 1)}>
              {listYear.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
          </View>
          <Button
            text={'Pilih Tanggal'}
            onPress={() => {
              this[RBSheet + idDropDown].close();
              onSelect(`${date}/${month > 9 ? month : '0' + month}/${year}`);
            }}
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
  rbSheetView: {padding: RFValue(16), flex: 1},
  placeholderActive: {
    color: '#86939E',
    fontSize: configs.sizes.Text.S,
    fontFamily: configs.fonts.OpenSans.Bold,
    marginBottom: RFValue(8),
  },
  placeholderInactive: {
    color: '#9AA5AE',
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.Regular,
  },
  titleRBSheet: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.L,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
  },
  containerPicker: {flexDirection: 'row', justifyContent: 'space-between'},
});
