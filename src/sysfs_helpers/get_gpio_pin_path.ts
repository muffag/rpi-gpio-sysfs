import { SYSFS_BASE_PATH } from './constants';

export function getGpioPinPath(pinNumber: string | number) {
  return SYSFS_BASE_PATH + '/gpio' + pinNumber;
}
