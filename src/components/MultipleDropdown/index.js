import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {height: screenHeight} = Dimensions.get('screen');

const MultipleDropdown = ({
  label,
  onSelect,
  onRemove,
  selectTitle,
  dataList,
  idDropDown,
  headerText,
  placeholder,
  placeholderSearch,
  selectSecondary,
  selectedData = [],
}) => {
  const [search, setsearch] = useState('');
  const [dataDropdown, setdataDropdown] = useState([]);

  useEffect(() => {
    if (dataList) {
      setdataDropdown(dataList);
    }

    if (search) {
      let newData = [];
      dataList.map((item, index) => {
        for (var key in item) {
          if (item[key].toLowerCase().includes(search.toLowerCase())) {
            newData.push(item);
          }
        }
      });

      setdataDropdown(newData);
    }
  }, [dataList, search, selectTitle]);

  return (
    <>
      <View style={{marginVertical: RFValue(8)}}>
        <Text
          style={{
            fontFamily: configs.fonts.OpenSans.Regular,
            fontSize: configs.sizes.Text.S,
          }}>
          {label}
        </Text>
        <TouchableOpacity
          style={styles.clickableSearch}
          onPress={() => {
            setsearch('');
            this[RBSheet + idDropDown].open();
          }}>
          <Icon
            name={'search'}
            containerStyle={{marginRight: RFValue(12)}}
            color={configs.colors.neutral.Grey.dark}
            size={configs.sizes.Icon.L}
          />
          <View style={styles.selectedGrow}>
            {selectedData.length <= 0 ? (
              <Text
                style={{
                  fontSize: configs.sizes.Text.M,
                  fontFamily: configs.fonts.OpenSans.Italic,
                }}>
                {placeholder}
              </Text>
            ) : (
              selectedData.map((item) => (
                <View style={styles.listDropdown}>
                  <Text
                    style={{
                      color: configs.colors.neutral.Grey.dark,
                    }}>
                    {item.name} - {item.phone}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: RFValue(8)}}
                    onPress={() => onRemove(item)}>
                    <Icon
                      name={'cancel'}
                      color={configs.colors.neutral.Grey.dark}
                      size={configs.sizes.Icon.S}
                    />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={(ref) => {
          this[RBSheet + idDropDown] = ref;
        }}
        height={screenHeight * 0.6}
        customStyles={{
          container: {
            paddingBottom: RFValue(16),
            borderTopLeftRadius: RFValue(16),
            borderTopRightRadius: RFValue(16),
          },
        }}>
        <View style={styles.viewRBSheet}>
          <Text style={styles.headerSheet}>{headerText}</Text>
          <View style={styles.containerSearch}>
            <Icon
              name={'search'}
              containerStyle={styles.containerIconSearch}
              color={configs.colors.neutral.Grey.base}
              size={configs.sizes.Icon.XXL}
            />
            <Input
              inputStyle={{
                fontSize: configs.sizes.Text.M,
                fontFamily: configs.fonts.OpenSans.SemiBold,
              }}
              value={search}
              placeholder={placeholderSearch}
              containerStyle={styles.containerInputSearch}
              inputContainerStyle={styles.inputSearchCont}
              onChangeText={(text) => {
                setsearch(text);
              }}
            />
            {search ? (
              <Icon
                name={'cancel'}
                onPress={() => setsearch('')}
                containerStyle={{marginHorizontal: RFValue(4)}}
                color={configs.colors.neutral.Grey.base}
                size={configs.sizes.Icon.L}
              />
            ) : null}
          </View>
          <FlatList
            data={dataDropdown}
            contentContainerStyle={styles.rbSheetView}
            keyExtractor={(item, index) => item.toString() + index}
            ItemSeparatorComponent={() => (
              <View style={styles.rbSheetSeparator} />
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{...styles.itemDropdown}}
                onPress={() => onSelect(item)}>
                <Text style={styles.itemDescription}>
                  {item[selectTitle]}
                  {selectSecondary && ` - ${item[selectSecondary]}`}
                </Text>
                {selectedData.filter(
                  (value) => item[selectTitle] === value[selectTitle],
                ).length > 0 ? (
                  <Icon
                    name={'check-circle'}
                    size={configs.sizes.Icon.XXL}
                    color={configs.colors.primary.Sapphire.base}
                    containerStyle={styles.containerChoosen}
                  />
                ) : (
                  <View style={styles.containerChoosen} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </RBSheet>
    </>
  );
};

export default MultipleDropdown;

const styles = StyleSheet.create({
  containerComponentInput: {
    height: RFValue(40),
    width: '100%',
    backgroundColor: configs.colors.neutral.White.base,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(8),
    borderBottomWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
  rbSheetSeparator: {
    backgroundColor: configs.colors.neutral.Grey.light,
    width: '100%',
    height: RFValue(1),
  },
  rbSheetView: {padding: RFValue(16), flex: 1},
  itemDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
  },
  itemDescription: {
    fontFamily: configs.fonts.OpenSans.Regular,
    fontSize: configs.sizes.Text.M,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
  },
  containerChoosen: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: configs.sizes.Icon.XXL,
    height: configs.sizes.Icon.XXL,
  },
  viewRBSheet: {flex: 1},
  selectedText: {
    width: '90%',
    fontSize: configs.sizes.Text.M,
    fontFamily: configs.fonts.OpenSans.SemiBold,
  },
  headerSheet: {
    fontFamily: configs.fonts.OpenSans.SemiBold,
    fontSize: configs.sizes.Text.L,
    marginVertical: RFValue(16),
    textAlign: 'center',
  },
  containerSearch: {
    height: RFValue(48),
    marginHorizontal: RFValue(16),
    backgroundColor: configs.colors.neutral.Grey.light,
    borderColor: configs.colors.neutral.Grey.base,
    borderWidth: RFValue(1),
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(4),
  },
  containerIconSearch: {
    width: RFValue(48),
    height: RFValue(48),
    justifyContent: 'center',
  },
  containerInputSearch: {
    height: '0%',
    width: '70%',
  },
  inputSearchCont: {borderBottomWidth: 0},
  listDropdown: {
    backgroundColor: configs.colors.primary.Sapphire.lightest,
    borderWidth: RFValue(1),
    borderColor: configs.colors.neutral.Grey.base,
    paddingVertical: RFValue(4),
    paddingHorizontal: RFValue(8),
    margin: RFValue(2),
    borderRadius: RFValue(4),
    flexDirection: 'row',
  },
  selectedGrow: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  clickableSearch: {
    minHeight: RFValue(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
    borderBottomWidth: RFValue(1),
    marginBottom: RFValue(4),
    backgroundColor: configs.colors.neutral.White.base,
  },
});
