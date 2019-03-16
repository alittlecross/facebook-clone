const dbc = require('../database-connection')
const since = require('./since')

class Comment {
  static async create (data) {
    await dbc.query(`
      INSERT INTO comments (postid, userid, content)
      VALUES ($1, $2, $3);
    `, [data.postId, data.userId, data.content])
  }

  static commentObject (data) {
    return {
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      content: data.content,
      createdAt: since.timeSince(data.createdat)
    }
  }
}

module.exports = Comment
