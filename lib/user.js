const bcrypt = require('bcrypt')
const dbc = require('../database-connection')
const saltRounds = 10

class User {
  static async getProfile (email) {
    return dbc.query('SELECT * FROM users WHERE email = $1;', [email])
  }

  static async alreadyRegistered (email) {
    let result = await this.getProfile(email)
    return (result.rowCount >= 1)
  }

  static async logIn (email, password) {
    let result = await this.getProfile(email)
    if (result.rows.length !== 0 && await bcrypt.compareSync(password, result.rows[0].password)) {
      return result.rows[0].userid
    } else {
      return false
    }
  }

  static async hashPassword (password) {
    return bcrypt.hashSync(password, saltRounds)
  }

  static async register (firstName, surname, email, password, dob, sexId) {
    let hash = await this.hashPassword(password)
    await dbc.query('INSERT INTO users (firstname, surname, email, password, dob, sexid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid;', [firstName, surname, email, hash, dob, sexId])
  }

  static async updateProfile (userId, firstName, surname, email, password, dob, sexId) {
    let hash = await this.hashPassword(password)
    await dbc.query('UPDATE users SET firstname = $2, surname = $3, email = $4, password = $5, dob = $6, sexid = $7  WHERE userid = $1 RETURNING userid;', [userId, firstName, surname, email, hash, dob, sexId])
  }
}

module.exports = User
