const Like = require('../lib/like')
const Helper = require('./support/database-helpers')

describe('Like', () => {

  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.likeObject', () => {
    it('should return a like object', () => {
      let result = Like.likeObject(Helper.mockLikeDatabaseData())

      expect(result.firstName).toEqual('Michael')
    })
  })

  describe('.create', () => {
    it('should return the like details', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()

      let result = await Like.create({ userId: 1, postId: 1 })

      expect(result.rows[0].userid).toEqual(1)
    })
  })

  describe('.delete', () => {
    it('should return evidence that the like was deleted', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()
      await Helper.mockCreateLike()

      let result = await Like.delete({ userId: 1, postId: 1 })

      expect(result.rowCount).toEqual(1)
    })
  })

  describe('.read', () => {
    it('should return a count of likes', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()
      await Helper.mockCreateLike()

      let result = await Like.read({ userId: 1, postId: 1 })

      expect(result).toEqual(1)
    })
  })

  describe('.toggle', () => {
    it('should return evidence that the like was added', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()

      await Like.toggle({ userId: 1, postId: 1 })

      let result = await Helper.mockReadLike({ userId: 1, postId: 1 })

      expect(result.rowCount).toEqual(1)
    })

    it('should return evidence that the like was deleted', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()
      await Helper.mockCreateLike()

      await Like.toggle({ userId: 1, postId: 1 })

      let result = await Helper.mockReadLike({ userId: 1, postId: 1 })

      expect(result.rowCount).toEqual(0)
    })
  })
})
