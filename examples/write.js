const GPIOPin = require('../src/gpio_pin');

(async () => {
  try {
    let gpio40 = new GPIOPin(40);
    let gpio41 = new GPIOPin(41);
    await gpio40.setup(GPIOPin.DIR.OUT);
    await gpio41.setup(GPIOPin.DIR.OUT);

    let status = true;
    while(true) {
      await gpio40.write(status);
      await gpio41.write(!status);
      status = !status;
      await sleep(1000);
    }
  } catch (ex) {
    console.log(ex);
  }
})();

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
