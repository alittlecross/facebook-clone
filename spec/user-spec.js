const bcrypt = require('bcrypt')
const User = require('../lib/user')
const Helper = require('./support/database-helpers')

describe('User', () => {

  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.userObject', () => {
    it('should return a user object', () => {
      let result = User.userObject(Helper.mockUserDatabaseData())

      expect(result.firstName).toEqual('Michael')
    })
  })

  describe('.getProfile', () => {
    it('should return a user record from the database', async () => {
      await Helper.mockCreateUser()

      let result = await User.getProfile('michael.scott@scranton.com')

      expect(result.rows[0].firstname).toEqual('Michael')
    })
  })

  describe('.alreadyRegistered', () => {
    it('should return true of the users email is in the database', async () => {
      await Helper.mockCreateUser()

      let result = await User.alreadyRegistered({ email: 'michael.scott@scranton.com' })

      expect(result).toEqual(true)
    })
  })

  describe('.logIn', () => {
    it('should return a user object if the password is correct', async () => {
      await Helper.mockCreateUser()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'password' })

      expect(result.firstName).toEqual('Michael')
    })
  })

  describe('.hashPassword', () => {
    it('should return a hashed password', async () => {
      let result = await User.hashPassword('password')

      expect(await bcrypt.compareSync('password', result)).toEqual(true)
    })
  })

  describe('.register', () => {
    it('should return a user object', async () => {
      let result = await User.register(Helper.mockUserFormData())

      expect(result.firstName).toEqual('Michael')
    })
  })
})
