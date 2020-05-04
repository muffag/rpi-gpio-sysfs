import { getValue } from './sysfs_helpers/get_value';
import { PinDirection, setDirection } from './sysfs_helpers/set_direction';
import { PinEdge, setEdge } from './sysfs_helpers/set_edge';
import { setValue } from './sysfs_helpers/set_value';
import { isExported } from './sysfs_helpers/is_exported';
import { unexportPin } from './sysfs_helpers/unexport_pin';
import { exportPin } from './sysfs_helpers/export_pin';

export interface Pin {
  write(value: boolean): Promise<void>;
  read(): Promise<boolean>;
}

export async function createPin(
  pinNumber: number,
  direction: PinDirection = 'out',
  edge: PinEdge = 'none'
): Promise<Pin> {
  // Make sure pin is not exported yet
  const alreadyExported = await isExported(pinNumber);
  if (alreadyExported) {
    await unexportPin(pinNumber);
  }

  // Setup pin
  await exportPin(pinNumber);
  await setDirection(pinNumber, direction);
  await setEdge(pinNumber, edge);

  // Return read/write functions
  return {
    async read() {
      return getValue(pinNumber);
    },
    async write(value) {
      return setValue(pinNumber, value);
    },
  };
}
