const bcrypt = require('bcrypt')
const User = require('../lib/user')
const Helper = require('./test-helpers')

const expect = require('chai').expect

describe('User', () => {
  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.userObject', () => {
    it('should return a user object', () => {
      let result = User.userObject(Helper.mockUserDatabaseData())

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.getProfile', () => {
    it('should return a user record from the database', async () => {
      await Helper.mockCreateUser()

      let result = await User.getProfile('michael.scott@scranton.com')

      expect(result.rows[0].firstname).equal('Michael')
    })
  })

  describe('.alreadyRegistered', () => {
    it('should return true of the users email is in the database', async () => {
      await Helper.mockCreateUser()

      let result = await User.alreadyRegistered({ email: 'michael.scott@scranton.com' })

      expect(result).equal(true)
    })
  })

  describe('.logIn', () => {
    it('should return a user object if the password is correct', async () => {
      await Helper.mockCreateUser()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'password' })

      expect(result.firstName).equal('Michael')
    })

    it('should return false if the password is incorrect', async () => {
      await Helper.mockCreateUser()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'lastword' })

      expect(result).equal(false)
    })
  })

  describe('.hashPassword', () => {
    it('should return a hashed password', async () => {
      let result = await User.hashPassword('password')

      expect(await bcrypt.compareSync('password', result)).equal(true)
    })
  })

  describe('.register', () => {
    it('should return a user object', async () => {
      let result = await User.register(Helper.mockUserFormData())

      expect(result.firstName).equal('Michael')
    })
  })
})
