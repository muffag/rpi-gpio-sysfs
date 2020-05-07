import { readFile } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

export async function getValue(pin: string | number): Promise<boolean> {
  const result = (
    await readFile(getGpioPinPath(pin) + '/value', 'utf-8')
  ).trim();

  return result === '1';
}
