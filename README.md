# rpi-gpio-sysfs

Access GPIO pins via [sysfs](https://elinux.org/RPi_GPIO_Code_Samples#sysfs.2C_part_of_the_raspbian_operating_system). This repository is heavily inspired by [rpi-gpio.js](https://github.com/JamesBarwell/rpi-gpio.js).


## Usage

### Write

```javascript
const GPIOPin = require('../src/gpio_pin');

const pin = new GPIOPin(18);

await pin.setup(GPIOPin.DIR.OUT);
await pin.write(status);
```

### Read

```javascript
const GPIOPin = require('../src/gpio_pin');

const pin = new GPIOPin(18);

await pin.setup(GPIOPin.DIR.IN);
let status = await pin.read();
```

### Listen

```javascript
const GPIOPin = require('../src/gpio_pin');

const pin = new GPIOPin(18);

await pin.setup(GPIOPin.DIR.IN, GPIOPin.EDGE.BOTH);

pin.listen((status) => {
  console.log('Status is', status);
});
```

## Todo

- [ ] Mirror all functions from `rpi-gpio`
- [ ] Add unit tests
- [ ] Add documentation
- [ ] Publish to NPM
