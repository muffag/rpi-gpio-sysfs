import { PinDirection, setDirection } from './sysfs_helpers/set_direction';
import { PinEdge, setEdge } from './sysfs_helpers/set_edge';
import { isExported } from './sysfs_helpers/is_exported';
import { unexportPin } from './sysfs_helpers/unexport_pin';
import { exportPin } from './sysfs_helpers/export_pin';
import { setValue } from './sysfs_helpers/set_value';
import { getValue } from './sysfs_helpers/get_value';

export class Pin {
  private isSetup = false;

  constructor(private readonly pinNumber: number) {}

  public async setup(
    direction: PinDirection = 'out',
    edge: PinEdge = 'none'
  ): Promise<void> {
    const alreadyExported = await isExported(this.pinNumber);

    if (alreadyExported) {
      await unexportPin(this.pinNumber);
    }

    await exportPin(this.pinNumber);
    await setDirection(this.pinNumber, direction);
    await setEdge(this.pinNumber, edge);

    this.isSetup = true;
  }

  public async write(value: boolean): Promise<void> {
    if (!this.isSetup) {
      throw new Error('Pin not setup yet');
    }
    await setValue(this.pinNumber, value);
  }

  public async read(): Promise<boolean> {
    if (!this.isSetup) {
      throw new Error('Pin not setup yet');
    }
    return getValue(this.pinNumber);
  }
}
