import { readFile } from 'fs-extra';
import { SYSFS_BASE_PATH } from './constants';

export async function getValue(pin: string | number): Promise<boolean> {
  const result = (
    await readFile(`${SYSFS_BASE_PATH}/gpio${pin.toString()}/value`, 'utf-8')
  ).trim();

  return result === '1';
}
