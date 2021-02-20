const {queryWithTime, createUsersTable, db} = require('../utils');
const {run, populate} = require("./queries");

module.exports.test = async count => {

  try {
    await createUsersTable(true);

    await populate(count);

    await run();
  } catch (e) {
    console.log('ERROR', e);
  } finally {
    await queryWithTime('destroy_users_table', knex => knex.schema.dropTable('users'));
  }
}