import AesCrypto from 'react-native-aes-pack';
import {crypto} from '../../../app.json';

const aesSecurity = {
  encryption: async (plainText) => {
    try {
      let cipher = await AesCrypto.encrypt(
        plainText,
        crypto.secretKey,
        crypto.iv,
      );
      return cipher;
    } catch (e) {
      console.log(e.toString());
    }
  },
  decryption: async (ciphers) => {
    try {
      let cipher = await AesCrypto.decrypt(
        ciphers,
        crypto.secretKey,
        crypto.iv,
      );
      return cipher;
    } catch (e) {
      console.log(e.toString());
    }
  },
};

export default aesSecurity;
