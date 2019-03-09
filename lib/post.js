const dbc = require('../database-connection')

class Post {
  static async create (data) {
    await dbc.query(`
      INSERT INTO posts (userid, content)
      VALUES ($1, $2);
    `, [data.userId, data.content])
  }

  static postObject (data) {
    return {
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      content: data.content,
      createdAt: data.createdat
    }
  }

  static async getPosts (data) {
    let results = await dbc.query(`
      SELECT firstname, surname, profilepictureurl, content, posts.createdat
      FROM posts
      INNER JOIN users
      ON posts.userid = users.userid
      INNER JOIN friends
      ON posts.userid = friends.friended
      WHERE friends.friender = $1
      ORDER BY posts.createdat DESC;
    `, [data.userId])
    let posts = []
    await results.rows.forEach((post) => {
      posts.push(this.postObject(post))
    })
    return posts
  }
}

module.exports = Post
