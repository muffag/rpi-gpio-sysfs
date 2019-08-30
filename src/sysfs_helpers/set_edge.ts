import { writeFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export type PinEdge = 'none' | 'rising' | 'falling' | 'both';

export function setEdge(pin: string | number, edge: PinEdge) {
  return writeFile(`${SYSFS_BASE_PATH}/gpio${pin.toString()}/edge`, edge);
}
