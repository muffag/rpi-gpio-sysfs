import { writeFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export function unexportPin(pin: string | number) {
  return writeFile(SYSFS_BASE_PATH + '/unexport', pin.toString());
}
