import { writeFile } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

export type PinDirection = 'out' | 'in' | 'low' | 'high';

export function setDirection(pin: string | number, direction: PinDirection) {
  return writeFile(getGpioPinPath(pin) + '/direction', direction);
}
