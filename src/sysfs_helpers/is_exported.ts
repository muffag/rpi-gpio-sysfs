import { stat } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export async function isExported(pin: string | number): Promise<boolean> {
  try {
    await stat(`${SYSFS_BASE_PATH}/gpio${pin.toString()}`);
    return true;
  } catch (error) {
    return false;
  }
}
