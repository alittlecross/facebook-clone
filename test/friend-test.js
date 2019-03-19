const Friend = require('../lib/friend')
const Helper = require('./test-helpers')

const expect = require('chai').expect

describe('Friend', () => {
  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.friendObject', () => {
    it('should return a friend object', () => {
      let result = Friend.friendObject(Helper.mockFriendDatabaseData())

      expect(result.firstName).equal('Dwight')
    })
  })

  describe('.add', () => {
    it('should return the friend request details', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()

      let result = await Friend.add(1, 2)

      expect(result.rowCount).equal(1)
    })
  })

  describe('.confirm', () => {
    it('should return evidence that the friend request was confirmed', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()
      await Helper.mockCreateFriendRequest()

      let result = await Friend.confirm(2, 1)

      expect(result.rowCount).equal(1)
    })
  })

  describe('.cancel', () => {
    it('should return evidence that the friend request was cancelled', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()
      await Helper.mockCreateFriendRequest()

      let result = await Friend.cancel(1, 2)

      expect(result.rowCount).equal(1)
    })
  })

  describe('.remove', () => {
    it('should return evidence that the friendship was removed', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()
      await Helper.mockCreateFriend()

      let result = await Friend.remove(1, 2)

      expect(result.rowCount).equal(2)
    })
  })

  describe('.getUsers', () => {
    it('should return an array of user objects', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()
      await Helper.mockCreateFriend()

      let result = await Friend.getUsers({ userId: 1 })

      expect(result.length).equal(1)
    })
  })
})
