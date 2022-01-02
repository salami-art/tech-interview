const ServerError = require('../../lib/error');
const database = require('./database');
const userSchemaFields = [
  'id',
  'name',
  'surname',
  'birth_date',
  'email',
  'password',
  'phone',
  'identity',
  'passport_number',
]
module.exports.userSchemaFields = userSchemaFields;

const isEmptyValue = (value) => {
  if (value == null) return true;
  if (value == undefined) return true;
  switch (typeof value) {
    case "string": return !value.trim();
    case "number": return value == 0;
    default: return !value
  }
}

const userInvalid = (requiredFields, params) => {
  return requiredFields
    .filter((k) => isEmptyValue(params[k]) )
    .map((k) => ({
        field_name: k,
        message: `Field ${k} is required`
      })
    )
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.listUsers = async (options) => {
  const users = await database.select(...userSchemaFields).from('users');

  return {
    status: 200,
    data: { users }
  };
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createUser = async (options) => {
  const userRequiredFields = [
    'name',
    'surname',
    'password',
    'birth_date',
    'email',
    'identity',
  ]

  const invalid = userInvalid(userRequiredFields, options);
  if (invalid.length) return {
    status: 400,
    data: { invalid }
  }
  
  const user = await database('users').insert(options);

  return {
    status: 201,
    data: {user}
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.userId The user identifier
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateUser = async (options) => {
  const { userId, body } = options;
  const userRequiredFields = [
    'name',
    'surname',
    'birth_date',
    'email',
    'identity',
  ]

  const invalid = userInvalid(userRequiredFields, body);

  if (invalid.length) return {
    status: 400,
    data: { invalid }
  }
  
  const user = await database('users')
    .where({id: userId})
    .update(body)

  return {
    status: 200,
    data: {user}
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.userId The user identifier
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteUser = async (options) => {
  const { userId } = options;
  const deleted = await database('users')
    .where({id: userId})
    .del()
    console.log(deleted)
  return {
    status: 200,
    data: {deleted}
  };
};

