const {queryWithTime} = require("../utils");
const faker = require('faker');

module.exports.populate = async (count = 1000 * 1000) => {
  let users = [];

  if (require('fs').existsSync(require('path').resolve(__dirname, `./__data/${count}.json`))) {
    users = require(`./tests/users/__data/${count}.json`);
  } else {
    for (let i = count; i--;) {
      users.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birth_date: faker.date.past(10, new Date('2000'))
      })
    }
    require('fs').writeFileSync(require('path').resolve(__dirname, `./__data/${count}.json`), JSON.stringify(users));
  }
  await queryWithTime('batch_insert_users', knex => knex.batchInsert('users', users));

}
module.exports.run = async () => {
  await queryWithTime('select_count_where_first_name', async knex => {
    const res = await knex('users').select(knex.raw('count(id)')).where({
      first_name: faker.name.firstName()
    });
    console.log('count:select_count_where_first_name', res[0].count);
  });
}
