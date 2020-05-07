import { writeFile } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

export type PinEdge = 'none' | 'rising' | 'falling' | 'both';

export function setEdge(pin: string | number, edge: PinEdge) {
  return writeFile(getGpioPinPath(pin) + '/edge', edge);
}
