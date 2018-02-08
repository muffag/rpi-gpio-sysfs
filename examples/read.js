const GPIOPin = require('../src/gpio_pin');

(async () => {
  try {
    let gpio16 = new GPIOPin(16);
    await gpio16.setup(GPIOPin.DIR.IN, GPIOPin.EDGE.BOTH);

    console.log('Status is', await gpio16.read());
  } catch (ex) {
    console.log(ex);
  }
})();
