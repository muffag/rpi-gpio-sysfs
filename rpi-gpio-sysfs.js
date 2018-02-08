const fs = require('fs-extra');

const PATH = '/sys/class/gpio';
const EXPORT_TIMEOUT = 500; // Time in ms to wait after a pin has been exported.


/**
 * 
 * Simple file system access functions 
 *
 */
async function exportPin(pin) {
  return fs.writeFile(`${PATH}/export`, pin);
}
function unexportPin(pin) {
  return fs.writeFile(`${PATH}/unexport`, pin);
}
function setDirection(pin, direction) {
  return fs.writeFile(`${PATH}/gpio${pin}/direction`, direction);
}
function setValue(pin, value) {
  return fs.writeFile(`${PATH}/gpio${pin}/value`, value);
}
function isExported(pin) {
  return fs.exists(`${PATH}/gpio${pin}`);
}

class GPIOPin {
  constructor(pinNumber) {
    this.isSetup = false;
    this.pinNumber = pinNumber;
  }

  async setup(direction) {
    let exported = await isExported(this.pinNumber);

    if (exported) {
      await tryFunc(unexportPin, [this.pinNumber], 100);
    }

    await tryFunc(exportPin, [this.pinNumber], 100);
    await tryFunc(setDirection, [this.pinNumber, direction], 100);

    this.isSetup = true;
  }

  /**
   * Write to the pin
   * @param {boolean} value 
   */
  async write(value) {
    if (!this.isSetup) {
      throw new Error('Pin not setup yet');
    }
    if (typeof value === 'boolean') {
      value = value ? '1' : '0';
    }

    await setValue(this.pinNumber, value);
  }
}



function tryFunc(func, args, times) {
  let counter = 0;

  return new Promise((resolve, reject) => {
    (async function loop() {
      try {
        let result = await func.apply(this, args);
        resolve(result);
      } catch (ex) {
        if (++counter < times) {
          setTimeout(loop, 10);
        } else {
          reject(new Error('Tries exceeded'));
        }
      }
    })();
  })
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}


(async () => {

  try {
    let gpio40 = new GPIOPin('40');
    await gpio40.setup('out');
    let gpio41 = new GPIOPin('41');
    await gpio41.setup('out');

    let x = true;

    while(true) {
      await gpio40.write(x);
      await gpio41.write(!x);
      x = !x;
      await sleep(1000);
    }
  } catch (ex) {
    console.log(ex);
  }

})();