const bcrypt = require('bcrypt')
const dbc = require('../database-connection')
const saltRounds = 10

class User {
  static async hashPassword (password) {
    return bcrypt.hashSync(password, saltRounds)
  }

  static async create (firstName, surname, email, password, dob) {
    let hash = this.hashPassword(password)
    await dbc.query('INSERT INTO users (firstname, surname, email, password, dob) VALUES ($1, $2, $3, $4, $5);', [firstName, surname, email, hash, dob])
  }

  static async getProfile (email) {
    return dbc.query('SELECT * FROM users WHERE email = $1;', [email])
  }

  static async alreadyRegistered (email) {
    let result = this.getProfile(email)
    return (result.rowCount >= 1)
  }

  static async checkPassword (entered, database) {
    return bcrypt.compareSync(entered, database)
  }

  static async logIn (email, password) {
    let result = this.getProfile(email)
    if (result.rows.length === 0) {
      return undefined
    } else if (await this.checkPassword(password, result.rows[0].password)) {
      return result.rows[0]
    } else {
      return false
    }
  }

  static async updateProfile (userId, firstName, surname, email, password, dob) {
    let hash = this.hashPassword(password)
    await dbc.query('UPDATE users SET firstname = $2, surname = $3, email = $4, password = $5, dob = $6 WHERE userid = $1;', [userId, firstName, surname, email, hash, dob])
  }
}

module.exports = User
