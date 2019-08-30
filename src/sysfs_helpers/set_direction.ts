import { writeFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export type PinDirection = 'out' | 'in' | 'low' | 'high';

export function setDirection(pin: string | number, direction: PinDirection) {
  return writeFile(
    `${SYSFS_BASE_PATH}/gpio${pin.toString()}/direction`,
    direction
  );
}
