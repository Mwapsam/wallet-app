import * as Keychain from 'react-native-keychain';

export const saveToken = async (key: string, value: string) => {
  try {
    await Keychain.setGenericPassword(key, value);
  } catch (error) {
    console.error('Keychain error:', error);
  }
};

export const getToken = async (key: string) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Keychain error:', error);
    return null;
  }
};

export const removeToken = async (key: string) => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Keychain error:', error);
  }
};

export const BASE_URL = 'https://api.mwape.org'
