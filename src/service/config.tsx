import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export let BASE_URL = '';

export const getBaseUrl = async () => {
  const isEmulator = await DeviceInfo.isEmulator();

  BASE_URL =
    Platform.OS === 'android'
      ? isEmulator
        ? 'http://10.0.2.2:4000'        // Android Emulator
        : 'http://192.168.1.16:4000'    // Real Android Device (your IP)
      : 'http://localhost:4000';        // iOS Simulator or Device

  return BASE_URL;
};
