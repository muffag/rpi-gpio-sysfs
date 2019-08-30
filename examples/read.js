const { Pin } = require('../dist');

(async () => {
  try {
    let gpio16 = new Pin(16);
    await gpio16.setup('in', 'both');

    console.log('Status is', await gpio16.read());
  } catch (ex) {
    console.log(ex);
  }
})();
