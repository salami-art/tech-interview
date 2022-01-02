// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: `./development.sqlite3`
    },
    useNullAsDefault: true
  },
  
  test: {
    client: 'sqlite3',
    connection: {
      filename: `./${process.env.NODE_ENV}.sqlite3`
    },
    useNullAsDefault: true
  }


};
