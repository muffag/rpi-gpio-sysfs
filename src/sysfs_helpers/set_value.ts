import { writeFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export function setValue(pin: string | number, value: boolean) {
  return writeFile(
    `${SYSFS_BASE_PATH}/gpio${pin.toString()}/value`,
    value ? '1' : '0'
  );
}
