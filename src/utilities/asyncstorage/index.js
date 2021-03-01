import AsyncStorage from '@react-native-async-storage/async-storage';
import aesSecurity from '../aesSecurity';

const asyncstorage = {
  storeEncryptStorage: async ({value, key}) => {
    try {
      let encryptValue = await aesSecurity.encryption(value);
      let encryptKey = await aesSecurity.encryption(key);
      await AsyncStorage.setItem(encryptKey, encryptValue);
      return true;
    } catch (e) {
      return false;
    }
  },
  readEncryptStorage: async ({key}) => {
    try {
      let encryptKey = await aesSecurity.encryption(key);
      let encryptValue = await AsyncStorage.getItem(encryptKey);
      let decryptValue = await aesSecurity.decryption(encryptValue);
      return decryptValue;
    } catch (e) {
      return false;
    }
  },
  removeEncryptStorage: async ({key}) => {
    try {
      let encryptKey = await aesSecurity.encryption(key);
      await AsyncStorage.removeItem(encryptKey);
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
