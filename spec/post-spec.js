const Post = require('../lib/post')
const Helper = require('./support/database-helpers')

describe('Post', () => {

  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.postObject', () => {
    it('should return a post object', () => {
      let result = Post.postObject(Helper.mockPostDatabaseData())
      
      expect(result.firstName).toEqual('Michael')
    })
  })

  describe('.create', () => {
    it('should return the post details ', async () => {
      await Helper.mockCreateUser()

      let result = await Post.create({ userId: 1, content: `I'm not superstitious, but I am a little stitious.` })

      expect(result.rows[0].content).toEqual(`I'm not superstitious, but I am a little stitious.`)
    })
  })

  describe('.getPosts', () => {
    it('should return a post object', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()

      let results = await Post.getPosts({ userId: 1 })

      expect(results.length).toEqual(1)
    })
  })
})
