const Post = require('../lib/post')
const Helper = require('./test-helpers')

const expect = require('chai').expect

describe('Post', () => {
  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.postObject', () => {
    it('should return a post object', () => {
      let result = Post.postObject(Helper.mockPostDatabaseData())

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.create', () => {
    it('should return the post details ', async () => {
      await Helper.mockCreateUser()

      let result = await Post.create({ userId: 1, content: `I'm not superstitious, but I am a little stitious.` })

      expect(result.rowCount).equal(1)
    })
  })

  describe('.getPosts', () => {
    it('should return a post object', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreateSecondUser()
      await Helper.mockCreateFriend()
      await Helper.mockCreatePost()
      await Helper.mockCreateSecondPost()
      await Helper.mockCreateLike()
      await Helper.mockCreateSecondLike()
      await Helper.mockCreateComment()

      let results = await Post.getPosts({ userId: 1 })

      expect(results.length).equal(2)
    })
  })
})
