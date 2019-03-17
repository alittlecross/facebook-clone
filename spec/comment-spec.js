const Comment = require('../lib/comment')
const Helper = require('./support/database-helpers')

describe('Comment', () => {

  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.commentObject', () => {
    it('should return a comment object', () => {
      let result = Comment.commentObject(Helper.mockCommentDatabaseData())

      expect(result.firstName).toEqual('Jim')
    })
  })

  describe('.create', () => {
    it('should return the comment details', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()

      let result = await Comment.create({ postId: 1, userId: 1, content: 'Question: Which bear is best?' })

      expect().toEqual()
    })
  })
})
