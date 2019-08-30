const Pin = require('../dist');

(async () => {
  try {
    let gpio40 = new Pin(40);
    let gpio41 = new Pin(41);
    await gpio40.setup('out');
    await gpio41.setup('out');

    let status = true;
    while (true) {
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
  return new Promise(resolve => setTimeout(resolve, duration));
}
