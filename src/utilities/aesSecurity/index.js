import CryptoES from 'crypto-es';
import {crypto} from '../../../app.json';

const aesSecurity = {
  encryption: (plainText) => {
    try {
      const encrypted = CryptoES.AES.encrypt(
        plainText,
        crypto.secretKey,
      ).toString();
      return encrypted;
    } catch (e) {
      console.log('ENCRYPT ERROR', e.toString());
      return false;
    }
  },
  decryption: (ciphers) => {
    try {
      const decrypted = CryptoES.AES.decrypt(
        ciphers,
        crypto.secretKey,
      ).toString(CryptoES.enc.Utf8);
      return decrypted;
    } catch (e) {
      console.log('DECRYPT ERROR', e.toString());
      return false;
    }
  },
};

export default aesSecurity;
