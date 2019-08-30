# rpi-gpio-sysfs

Basic access to GPIO pins via [sysfs](https://elinux.org/RPi_GPIO_Code_Samples#sysfs.2C_part_of_the_raspbian_operating_system) in Node.js. This package has native TypeScript support and uses a Promise-based API.

The library has been tested to work with the Compute Module 3, other Raspberry Pi's should work but will not be officially supported.

## Usage

### Write

```typescript
import { Pin } from 'rpi-gpio-sysfs';

const pin = new Pin(18);

await pin.setup('out');
await pin.write(true);
```

### Read

```typescript
import { Pin } from 'rpi-gpio-sysfs';

const pin = new Pin(18);

await pin.setup('in');
const status: boolean = await pin.read();
```
