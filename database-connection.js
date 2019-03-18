const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    let connection = new Pool({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT
    })
    let result = await connection.query(string, argument)
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
