const Comment = require('../lib/comment')
const Helper = require('./test-helpers')

const expect = require('chai').expect

describe('Comment', () => {
  beforeEach(async () => {
    await Helper.setupConnection()
    await Helper.truncateDatabase()
  })

  describe('.commentObject', () => {
    it('should return a comment object', () => {
      let result = Comment.commentObject(Helper.mockCommentDatabaseData())

      expect(result.firstName).equal('Jim')
    })
  })

  describe('.create', () => {
    it('should return the comment details', async () => {
      await Helper.mockCreateUser()
      await Helper.mockCreatePost()

      let result = await Comment.create({ postId: 1, userId: 1, content: 'Question: Which bear is best?' })

      expect(result.rowCount).equal(1)
    })
  })
})
