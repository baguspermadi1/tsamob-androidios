import AsyncStorage from '@react-native-async-storage/async-storage';
import aesSecurity from '../aesSecurity';

const asyncstorage = {
  storeEncryptStorage: async ({value, key}) => {
    try {
      let encryptValue = await aesSecurity.encryption(value);
      await AsyncStorage.setItem(key, encryptValue);
      return true;
    } catch (e) {
      return false;
    }
  },
  readEncryptStorage: async ({key}) => {
    try {
      let encryptValue = await AsyncStorage.getItem(key);
      if (!encryptValue) {
        return false;
      }
      let decryptValue = await aesSecurity.decryption(encryptValue);
      return decryptValue;
    } catch (e) {
      return false;
    }
  },
  removeEncryptStorage: async ({key}) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      return false;
    }
  },
};

export default asyncstorage;
