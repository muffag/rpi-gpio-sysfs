# rpi-gpio-sysfs

Basic access to GPIO pins via [sysfs](https://elinux.org/RPi_GPIO_Code_Samples#sysfs.2C_part_of_the_raspbian_operating_system) in Node.js. This package has native TypeScript support and uses a Promise-based API.

The library has been tested to work with the Compute Module 3, other Raspberry Pi's should work but will not be officially supported.

## Installation

```
npm install rpi-gpio-sysfs
```

## Usage

### Write

```typescript
import { createPin } from 'rpi-gpio-sysfs';

const pin = await createPin(18, 'out');

await pin.write(true);
```

### Read

```typescript
import { createPin } from 'rpi-gpio-sysfs';

const pin = createPin(18, 'in');

const status: boolean = await pin.read();
```
