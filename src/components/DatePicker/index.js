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
  const [listMonth, setlistMonth] = useState([
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
  const [listYear, setlistYear] = useState(
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
      month !== 1 ||
      month !== 3 ||
      month !== 5 ||
      month !== 7 ||
      month !== 8 ||
      month !== 10 ||
      month !== 12
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
              <Text
                style={{
                  color: configs.colors.neutral.Grey.dark,
                  fontSize: configs.sizes.Text.S,
                  fontFamily: configs.fonts.OpenSans.Bold,
                  marginBottom: RFValue(8),
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
        height={screenHeight * 0.4}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderRadius: RFValue(16),
          },
        }}>
        <View style={{flex: 1, paddingHorizontal: RFValue(16)}}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: RFValue(20),
            }}>
            <Picker
              style={{
                width: screenWidth * 0.3,
                height: screenWidth * 0.4,
                marginBottom: RFValue(16),
              }}
              lineColor="#000000"
              lineGradientColorFrom="#008000"
              lineGradientColorTo="#FF5733"
              selectedValue={date - 1}
              itemSpace={32}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
                padding: Platform.OS === 'android' ? RFValue(16) : 16,
              }}
              onValueChange={(index) => setdate(index + 1)}>
              {listDate.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
            <Picker
              style={{
                width: screenWidth * 0.3,
                height: screenWidth * 0.4,
                marginBottom: RFValue(16),
                paddingHorizontal: Platform.OS === 'android' ? RFValue(16) : 0,
              }}
              lineColor="#000000"
              lineGradientColorFrom="#008000"
              lineGradientColorTo="#FF5733"
              selectedValue={month - 1}
              itemSpace={30}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
              }}
              onValueChange={(index) => setmonth(index + 1)}>
              {listMonth.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
            <Picker
              style={{
                width: screenWidth * 0.3,
                height: screenWidth * 0.4,
                marginBottom: RFValue(16),
                paddingHorizontal: Platform.OS === 'android' ? RFValue(16) : 0,
              }}
              lineColor="#000000"
              lineGradientColorFrom="#008000"
              lineGradientColorTo="#FF5733"
              selectedValue={year - 1}
              itemSpace={32}
              itemStyle={{
                color: configs.colors.primary.Sapphire.base,
                fontSize: configs.sizes.Text.XL,
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
              onSelect(`${date}/${month}/${year}`);
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
  rbSheetSeparator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    width: '100%',
    height: RFValue(1),
  },
  rbSheetView: {padding: RFValue(16), flex: 1},
});
