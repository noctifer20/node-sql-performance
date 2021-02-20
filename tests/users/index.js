const {colors, db} = require('../utils');
(async() => {
  try {
    console.log(colors.FgRed);
    await require('./users_no_index.test').test();
    console.log(colors.Reset);

    console.log(colors.FgGreen);
    await require('./users_with_index.test').test();
    console.log(colors.Reset);
  } catch (e) {
    console.log(colors.Reset);
    console.log(e);
  } finally {
    await db.destroy();

  }
})()