import configs from '@configs';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const {height: screenHeight} = Dimensions.get('screen');

const Dropdown = ({
  placeholder,
  isError,
  errorInfo,
  style,
  selectText,
  onSelect,
  selectTitle,
  selectDescription,
  dataList,
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
        <Text
          style={{
            color: configs.colors.neutral.Grey.dark,
            fontSize: configs.sizes.Text.L,
            fontFamily: configs.fonts.OpenSans.SemiBold,
            paddingHorizontal: RFValue(8),
          }}>
          {placeholder}
        </Text>
        <View style={styles.containerDrop}>
          <Text style={styles.selectedText}>{selectText}</Text>
          <Icon
            name={'arrow-drop-down'}
            size={configs.sizes.Icon.XXL}
            color={configs.colors.primary.Azure.darker}
          />
        </View>
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
          style={styles.viewRBSheet}
          onLayout={(event) =>
            setheightRBSheet(event.nativeEvent.layout.height)
          }>
          <FlatList
            data={dataList}
            contentContainerStyle={styles.rbSheetView}
            keyExtractor={(item) => item[selectTitle].toString()}
            ItemSeparatorComponent={() => (
              <View style={styles.rbSheetSeparator} />
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{...styles.itemDropdown, height: heightRBSheet * 0.45}}
                onPress={() => onSelect(item)}>
                <View style={styles.containerTextItem}>
                  <Text style={styles.itemTitle}>{item[selectTitle]}</Text>
                  {selectDescription && (
                    <Text style={styles.itemDescription}>
                      {item[selectDescription]}
                    </Text>
                  )}
                </View>
                {selectText === item[selectTitle] ? (
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

export default Dropdown;

const styles = StyleSheet.create({
  containerComponentInput: {
    height: RFValue(64),
    width: '100%',
    backgroundColor: configs.colors.neutral.White.base,
    borderRadius: RFValue(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(8),
    borderWidth: RFValue(1),
    marginBottom: RFValue(4),
  },
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
  selectedText: {
    color: configs.colors.primary.Azure.darker,
    fontSize: configs.sizes.Text.L,
    fontFamily: configs.fonts.OpenSans.SemiBold,
    paddingHorizontal: RFValue(8),
    width: '75%',
    textAlign: 'right',
  },
  containerDrop: {flexDirection: 'row', alignItems: 'center'},
  itemDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTextItem: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: RFValue(24),
  },
  itemTitle: {
    fontFamily: configs.fonts.OpenSans.Bold,
    fontSize: configs.sizes.Text.XL,
    color: configs.colors.neutral.Grey.dark,
    textAlign: 'center',
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
  },
  viewRBSheet: {flex: 1},
});
