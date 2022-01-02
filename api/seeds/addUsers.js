const faker = require('faker');

const getFakeUser = () => ({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  birth_date: faker.date.past(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.phoneNumber(),
  identity: faker.datatype.number({ min: 1111111, max: 9999999 }),
  passport_number: 'AX' + faker.datatype.number({ min: 1111111, max: 9999999 })
})

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const users = Array(18).fill(null).map(() => getFakeUser())
      console.log(users)
      return knex('users').insert(users);
    });
};