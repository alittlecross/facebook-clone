const dbc = require('../database-connection')

class Like {
  static async create (data) {
    await dbc.query(`
      INSERT INTO likes (userid, postid)
      VALUES ($1, $2)
    `, [data.userId, data.postId])
  }

  static async delete (data) {
    await dbc.query(`
      DELETE FROM likes
      WHERE userid = $1 AND postid = $2 OR commentid = $3;
    `, [data.userId, data.postId, data.commentId])
  }

  static async read (data) {
    let result = await dbc.query(`
      SELECT *
      FROM likes
      WHERE userid = $1 AND postid = $2 OR commentid = $3;
    `, [data.userId, data.postId, data.commentId])
    return result.rowCount
  }

  static async toggle (data) {
    await this.read(data) === 0 ? await this.create(data) : await this.delete(data)
  }

  static likeObject (data) {
    return {
      firstName: data.firstname,
      surname: data.surname
    }
  }
}

module.exports = Like
