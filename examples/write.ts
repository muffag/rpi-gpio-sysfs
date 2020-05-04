import { createPin } from '../dist';

(async () => {
  try {
    const [gpio40, gpio41] = await Promise.all([
      await createPin(40, 'out'),
      await createPin(41, 'out'),
    ]);

    let status = true;

    while (true) {
      await Promise.all([gpio40.write(status), gpio41.write(status)]);

      status = !status;
      await sleep(1000);
    }
  } catch (ex) {
    console.log(ex);
  }
})();

function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
