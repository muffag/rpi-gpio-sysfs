const GPIOPin = require('./gpio_pin');

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

(async () => {

  try {
    let gpio40 = new GPIOPin(40);
    let gpio41 = new GPIOPin(41);
    await gpio40.setup(GPIOPin.DIR.OUT);
    await gpio41.setup(GPIOPin.DIR.OUT);

    let x = true;

    while(true) {
      await gpio40.write(x);
      await gpio41.write(!x);
      x = !x;
      await sleep(500);
      console.log('read: ', await gpio40.read());
      console.log('read: ', await gpio41.read());
      await sleep(500);
    }
  } catch (ex) {
    console.log(ex);
  }

})();
