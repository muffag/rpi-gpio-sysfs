import { stat } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

export async function isExported(pin: string | number): Promise<boolean> {
  try {
    await stat(getGpioPinPath(pin));
    return true;
  } catch (error) {
    return false;
  }
}
