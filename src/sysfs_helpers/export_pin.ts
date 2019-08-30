import { writeFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export function exportPin(pin: string | number) {
  return writeFile(SYSFS_BASE_PATH + '/export', pin.toString());
}
