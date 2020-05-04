import { createPin } from '../dist';

(async () => {
  try {
    const gpio16 = await createPin(16, 'in', 'both');

    console.log('Status is', await gpio16.read());
  } catch (ex) {
    console.log(ex);
  }
})();
