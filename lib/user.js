const bcrypt = require('bcrypt')
const dbc = require('../database-connection')
const saltRounds = 10

class User {
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

  static userObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      profilePictureUrl: data.profilepictureurl
    }
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

  static async updateProfile (data) {
    let hash = await this.hashPassword(data.password)
    let dob = `${data.year}-${data.month}-${data.day}`
    let result = await dbc.query(`
      UPDATE users
      SET firstname = $2, surname = $3, email = $4, password = $5, dob = $6, sexid = $7
      WHERE userid = $1
      RETURNING userid, firstname, surname, email, profilepictureurl;
    `, [data.userId, data.firstName, data.surname, data.email, hash, dob, data.sexId]).rows
    return this.userObject(result.rows[0])
  }

  static friendObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      friend: data.friended,
      friendSince: data.createdat,
      friendRequester: data.friendrequester,
      friendRequested: data.friendrequested
    }
  }

  static async getUsers (data) {
    let results = await dbc.query(`
      SELECT userid, firstname, surname, profilepictureurl, friended, friends.createdat, requester.friendrequester, requested.friendrequested
      FROM users
      LEFT JOIN friends
      ON userid = friender
      AND friended = $1
      LEFT JOIN friendrequests
      AS requester
      ON requester.friendrequested = userid
      AND requester.friendrequester = $1
      LEFT JOIN friendrequests AS requested
      ON requested.friendrequester = userid
      AND requested.friendrequested = $1
      WHERE userid != $1;
    `, [data.userId])
    let users = []
    await results.rows.forEach((user) => {
      users.push(this.friendObject(user))
    })
    return users
  }
}

module.exports = User
