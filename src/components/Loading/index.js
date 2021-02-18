import configs from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {OpacityDotsLoader} from 'react-native-indicator';

const Loading = ({isLoading}) => {
  return (
    <Overlay overlayStyle={styles.loadingIndicator} isVisible={isLoading}>
      <View>
        <OpacityDotsLoader
          color={configs.colors.primary.Sapphire.base}
          size={configs.sizes.Icon.XS}
          speed={150}
        />
      </View>
    </Overlay>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingIndicator: {
    width: configs.sizes.Icon.XXL * 3,
    height: configs.sizes.Icon.XXL * 3,
    backgroundColor: configs.colors.neutral.White.base,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: configs.sizes.Icon.XXL * 3,
  },
});
