import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Access Token
export const setAccessToken = (token: string) => {
  storage.set('accessToken', token);
};

export const getAccessToken = (): string | undefined => {
  return storage.getString('accessToken');
};

export const removeAccessToken = () => {
  storage.delete('accessToken');
};

// Refresh Token
export const setRefreshToken = (token: string) => {
  storage.set('refreshToken', token);
};

export const getRefreshToken = (): string | undefined => {
  return storage.getString('refreshToken');
};

export const removeRefreshToken = () => {
  storage.delete('refreshToke1n');
};
