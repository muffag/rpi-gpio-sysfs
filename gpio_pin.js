const utility = require('./utility.js');

class GPIOPin {
  constructor(pinNumber) {
    if (typeof pinNumber === 'number') {
      pinNumber = pinNumber.toString();
    }
    this.pinNumber = pinNumber;
    this.isSetup = false;
  }

  async setup(direction = GPIOPin.DIR.OUT, edge = GPIOPin.EDGE.NONE) {
    let exported = await utility.isExported(this.pinNumber);

    if (exported) {
      await utility.tryFunc(utility.unexportPin, [this.pinNumber]);
    }

    await utility.tryFunc(utility.exportPin, [this.pinNumber]);
    await utility.tryFunc(utility.setDirection, [this.pinNumber, direction]);
    await utility.tryFunc(utility.setEdge, [this.pinNumber, edge]);

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

  async read() {
    if (!this.isSetup) {
      throw new Error('Pin not setup yet');
    }

    let value = await utility.getValue(this.pinNumber);
    return value === '1';
  }
}

GPIOPin.DIR = {
  OUT: 'out',
  IN: 'in',
  LOW: 'low',
  HIGH: 'high',
};

GPIOPin.EDGE = {
  NONE: 'none',
  RISING: 'rising',
  FALLING: 'falling',
  BOTH: 'both',
};

module.exports = GPIOPin;
