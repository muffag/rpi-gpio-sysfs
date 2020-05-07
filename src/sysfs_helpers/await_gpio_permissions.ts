import { closeSync, openSync } from 'fs-extra';
import { getGpioPinPath } from './get_gpio_pin_path';

// Thank you `onoff` for this workaround!
// https://github.com/fivdi/onoff/blob/07d36e2407ec4b163302c67f00bcd3294006328b/onoff.js#L43
//
// More information can be found here:
// https://github.com/raspberrypi/linux/issues/553
export function waitForGpioAccessPermissions(pinNumber: number) {
  [
    getGpioPinPath(pinNumber) + '/value',
    getGpioPinPath(pinNumber) + '/direction',
    getGpioPinPath(pinNumber) + '/edge',
  ].forEach((path) => {
    let tries = 0;

    while (true) {
      try {
        tries += 1;
        const fd = openSync(path, 'r+');
        closeSync(fd);
        break;
      } catch (e) {
        if (tries === 10000) {
          throw e;
        }
      }
    }
  });
}
