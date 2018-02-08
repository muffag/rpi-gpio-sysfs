const GPIOPin = require('./gpio_pin');

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

(async () => {

  try {
    let gpio40 = new GPIOPin(40);
    let gpio41 = new GPIOPin(41);
    let gpio16 = new GPIOPin(16);
    await gpio40.setup(GPIOPin.DIR.OUT);
    await gpio41.setup(GPIOPin.DIR.OUT);
    await gpio16.setup(GPIOPin.DIR.IN, GPIOPin.EDGE.BOTH);

    gpio16.listen((value) => {
      console.log('GPIO16:', value);
    });


    // let x = true;
    // while(true) {
    //   //await gpio40.write(x);
    //   //await gpio41.write(!x);
    //   x = !x;
    //   console.log(await gpio16.read());
    //   await sleep(100);
    // }
  } catch (ex) {
    console.log(ex);
  }

})();
