import { SecureStorageEnum } from 'enums/secureStorageEnum';

export const setItem = (value: string) => {
  return sessionStorage.setItem(SecureStorageEnum.ACCESS_TOKEN, value);
};

export const getItem = () => {
  return sessionStorage.getItem(SecureStorageEnum.ACCESS_TOKEN);
};

export const removeItem = () => {
  return sessionStorage.removeItem(SecureStorageEnum.ACCESS_TOKEN);
};
