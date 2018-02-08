const fs = require('fs-extra');

const PATH = '/sys/class/gpio';

let utility = {
  exportPin: (pin) => {
    return fs.writeFile(`${PATH}/export`, pin);
  },
  unexportPin: (pin) => {
    return fs.writeFile(`${PATH}/unexport`, pin);
  },
  setDirection: (pin, direction) => {
    return fs.writeFile(`${PATH}/gpio${pin}/direction`, direction);
  },
  setEdge: (pin, edge) => {
    return fs.writeFile(`${PATH}/gpio${pin}/edge`, edge);
  },
  setValue: (pin, value) => {
    return fs.writeFile(`${PATH}/gpio${pin}/value`, value);
  },
  getValue: async (pin, value) => {
    let result = await fs.readFile(`${PATH}/gpio${pin}/value`, 'utf-8');
    return result.trim();
  },
  isExported: (pin) => {
    return fs.exists(`${PATH}/gpio${pin}`);
  },

  /**
   * Retries a function that returns a promsie a certain times. This is needed
   * because after exporting a pin the OS needs some time prepare the necessary
   * files. You can read more about it here:
   * https://elinux.org/RPi_GPIO_Code_Samples#sysfs.2C_part_of_the_raspbian_operating_system
   * 
   * @param {Function} func The function that should be tried
   * @param {Array}    args An array with the arguments for that function
   * @param {Number}   times How many times it should try before giving up
   * @param {Number}   delay The delay between times
   */
  tryFunc: (func, args, times = 100, delay = 10) => {
    let counter = 0;

    return new Promise((resolve, reject) => {
      (async function loop() {
        try {
          let result = await func.apply(this, args);
          resolve(result);
        } catch (ex) {
          if (++counter < times) {
            setTimeout(loop, delay);
          } else {
            reject(new Error('Tries exceeded'));
          }
        }
      })();
    })
  }
}

module.exports = utility;
