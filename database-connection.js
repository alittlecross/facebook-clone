const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    let connection = new Pool({
      // user: process.env.PGUSER,
      // password: process.env.PGPASSWORD,
      // host: process.env.PGHOST,
      // database: process.env.PGDATABASE,
      // port: process.env.PGPORT
      user: '',
      password: '',
      host: '127.0.0.1',
      database: 'facebook',
      port: 5432
    })
    let result = await connection.query(string, argument)
      .catch((error) => {
        console.log(error)
      })
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
