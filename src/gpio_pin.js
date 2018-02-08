const utility = require('./utility.js');
const Epoll = require('epoll').Epoll;
const fs = require('fs-extra');

class GPIOPin {
  constructor(pinNumber) {
    if (typeof pinNumber === 'number') {
      pinNumber = pinNumber.toString();
    }
    this.pinNumber = pinNumber;
    this.isSetup = false;
  }

  /**
   * Exports a pin and sets direction and edge. If it is already exported, this
   * function will unexport it first.
   * @param {string} direction
   * @param {string} edge 
   */
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
   * Write value to the pin.
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

  /**
   * Reads value from pin.
   * @returns {boolean}
   */
  async read() {
    if (!this.isSetup) {
      throw new Error('Pin not setup yet');
    }

    let value = await utility.getValue(this.pinNumber);
    return value === '1';
  }

  /**
   * Starts listening to interrupts using epoll.
   * @param {Function} callback 
   */
  listen(callback) {
    let poller = new Epoll(async (error, fileDescriptor, events) => {
      if (error) throw error;

      let readResult = await utility.clearInterrupt(fileDescriptor);
      let value = readResult.buffer.toString() === '1';
      callback(value);
    });

    // Open and read the GPIO value file to prevent an initial unauthentic
    // interrupt.
    var fd = fs.openSync(`${utility.PATH}/gpio${this.pinNumber}/value`, 'r');
    utility.clearInterrupt(fd);

    // Start watching for interrupts
    poller.add(fd, Epoll.EPOLLPRI);

    this._removeListener = () => {
      poller.remove(fd).close();
    };
  }

  /**
   * Removes epoll listener.
   */
  removeListener() {
    if (typeof this._removeListener === 'function') {
      this._removeListener();
    }
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
