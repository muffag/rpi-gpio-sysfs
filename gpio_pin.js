const utility = require('./utility.js');

class GPIOPin {
  constructor(pinNumber) {
    if (typeof pinNumber === 'number') {
      pinNumber = pinNumber.toString();
    }
    this.pinNumber = pinNumber;
    this.isSetup = false;
  }

  async setup(direction) {
    let exported = await utility.isExported(this.pinNumber);

    if (exported) {
      await utility.tryFunc(utility.unexportPin, [this.pinNumber]);
    }

    await utility.tryFunc(utility.exportPin, [this.pinNumber]);
    await utility.tryFunc(utility.setDirection, [this.pinNumber, direction]);

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
    if (typeof value === 'number') {
      value = value === 1 ? '1' : '0';
    }

    await utility.setValue(this.pinNumber, value);
  }
}

GPIOPin.DIR = {
  OUT: 'out',
  IN: 'in',
};

module.exports = GPIOPin;
