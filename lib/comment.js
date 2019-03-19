const dbc = require('../database-connection')
const since = require('./since')

class Comment {
  static commentObject (data) {
    return {
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      content: data.content,
      createdAt: since.timeSince(data.createdat)
    }
  }

  static async create (data) {
    return dbc.query(`
      INSERT INTO comments (postid, userid, content)
      VALUES ($1, $2, $3);
    `, [data.postId, data.userId, data.content])
  }
}

module.exports = Comment
