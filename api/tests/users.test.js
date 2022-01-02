const request = require('supertest');
const app = require('../src/api');
const database = require('../src/api/services/database');
const users = require('../src/api/services/userService')

beforeAll(done => {
  done()
});

afterAll(done => {
  database.destroy()
  done()
});

const getUsersCount = async () => {
  const count_result = await database('users').count('*');
  return (count_result.find(Boolean) || {})['count(*)'];
}

describe('GET /users', () => {
  it('lists users', () => {
    return request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('users');
          expect(res.body.users.length).toBe(18);
        });
  });
});

describe('POST /users', () => {
  it('does not create a user with invalid params', async () => {
    const prevUsersCount = await getUsersCount();
    
    return request(app)
        .post('/users')
        .send({name: 'Jon'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(async (res) => {
          const newUsersCount = await getUsersCount();
          expect(newUsersCount).toBe(prevUsersCount);
          expect(res.body).toHaveProperty('invalid');
          expect(res.body.invalid.length).not.toBe(0);
          expect(res.body.invalid[0]).toHaveProperty('field_name');
          expect(res.body.invalid[0]['field_name']).toBe('surname');
        });
  });

  it('does create a user with valid params', async () => {
    const prevUsersCount = await getUsersCount();
    return request(app)
        .post('/users')
        .send({
          name: "Jon",
          surname: "Doe",
          password: "userpassw",
          email: "jon.doe@example.com",
          identity: "123456",
          birth_date: "1988-11-24",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then( async (res) => {
          const newUsersCount = await getUsersCount();
          expect(newUsersCount).toBe(prevUsersCount + 1);
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.length).not.toBe(0);
          expect(isNaN(res.body.user[0])).toBe(false);
          const createdUser = await database
            .select(users.userSchemaFields)
            .from('users')
            .where({id: res.body.user[0]})
            .first()
          expect(createdUser.name).toBe("Jon")
          expect(createdUser.surname).toBe("Doe")
          expect(createdUser.email).toBe("jon.doe@example.com")
          expect(createdUser.identity).toBe("123456")
          expect(createdUser.birth_date).toBe("1988-11-24")
        });
  });

});

describe('PATCH /users', () => {
  it('does not update a user with invalid params', async() => {
    const sampleUser = await database
      .select(users.userSchemaFields)
      .from('users')
      .first()
    const { id, ...userData} = sampleUser
    return request(app)
        .put(`/users/${id}`)
        .send({...userData, ...{email: ''}})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty('invalid');
          expect(res.body.invalid.length).not.toBe(0);
          expect(res.body.invalid[0]).toHaveProperty('field_name');
          expect(res.body.invalid[0]['field_name']).toBe('email');
        });
  });

  it('does update a user with valid params', async() => {
    const newEmail = 'changed.email@example.com';
    const sampleUser = await database
      .select(users.userSchemaFields)
      .from('users')
      .first()
    const { id, ...userData} = sampleUser
    return request(app)
        .put(`/users/${id}`)
        .send({...userData, ...{email: newEmail}})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (res) => {
          expect(res.body).toHaveProperty('user');
          expect(isNaN(res.body.user)).toBe(false);
          const updatedUser = await database
            .select(users.userSchemaFields)
            .from('users')
            .where({id})
            .first()
          expect(updatedUser.name).toBe(sampleUser.name)
          expect(updatedUser.email).toBe(newEmail)
        });
  });
});

describe('DELETE /users', () => {
  it('deletes a user', async() => {
    const sampleUser = await database
      .select(users.userSchemaFields)
      .from('users')
      .first()
    const { id } = sampleUser
    return request(app)
      .delete(`/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (res) => {
        const updatedUser = await database
          .select(users.userSchemaFields)
          .from('users')
          .where({id})
          .first()
        expect(updatedUser).toBe(undefined)
      });
  });


});