const bcrypt = require('bcrypt')
const dbc = require('../database-connection')
const saltRounds = 10

class User {
  static userObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      profilePictureUrl: data.profilepictureurl
    }
  }

  static async getProfile (email) {
    return dbc.query(`
      SELECT *
      FROM users
      WHERE email = $1;
    `, [email])
  }

  static async alreadyRegistered (data) {
    let result = await this.getProfile(data.email)
    return (result.rowCount > 0)
  }

  static async logIn (data) {
    let result = await this.getProfile(data.email)
    if (result.rowCount > 0 && await bcrypt.compareSync(data.password, result.rows[0].password)) {
      return this.userObject(result.rows[0])
    } else {
      return false
    }
  }

  static async hashPassword (password) {
    return bcrypt.hashSync(password, saltRounds)
  }

  static async register (data) {
    let hash = await this.hashPassword(data.password)
    let dob = `${data.year}-${data.month}-${data.day}`
    let result = await dbc.query(`
      INSERT INTO users (firstname, surname, email, password, dob, sexid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING userid, firstname, surname, email, profilepictureurl;
    `, [data.firstName, data.surname, data.email, hash, dob, data.sexId])
    return this.userObject(result.rows[0])
  }
}

module.exports = User
