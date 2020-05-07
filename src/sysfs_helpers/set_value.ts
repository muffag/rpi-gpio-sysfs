import { writeFile } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

export function setValue(pin: string | number, value: boolean) {
  return writeFile(getGpioPinPath(pin) + '/value', value ? '1' : '0');
}
