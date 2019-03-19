const comment = require('./comment')
const dbc = require('../database-connection')
const since = require('./since')
const like = require('./like')

class Post {
  static postObject (data) {
    return {
      postId: data.postid,
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      content: data.content,
      createdAt: since.timeSince(data.createdat),
      likeCount: 0,
      likedBy: [],
      likedByYou: 'empty',
      commentCount: 0,
      comments: []
    }
  }

  static async create (data) {
    return dbc.query(`
      INSERT INTO posts (userid, content)
      VALUES ($1, $2);
    `, [data.userId, data.content])
  }

  static async getPosts (data) {
    let results = await dbc.query(`
      SELECT 'post' AS kind, posts.postid AS postid, posts.userid AS userid, firstname, surname, profilepictureurl, posts.content AS content, posts.createdat AS createdat
      FROM posts
      INNER JOIN users
      ON posts.userid = users.userid
      INNER JOIN friends
      ON posts.userid = friends.friended
      WHERE friends.friender = $1
      
      UNION
      
      SELECT 'comment' AS kind, comments.postid AS postid, comments.userid AS userid, firstname, surname, profilepictureurl, comments.content AS content, comments.createdat AS createdat
      FROM comments
      INNER JOIN users
      ON comments.userid = users.userid
      INNER JOIN posts
      ON comments.postid = posts.postid
      INNER JOIN friends
      ON posts.userid = friends.friended
      WHERE friends.friender = $1

      UNION

      SELECT 'like' AS kind, likes.postid AS postid, likes.userid AS userid, firstname, surname, '' AS profilepictureurl, '' AS content, likes.createdat AS createdat
      FROM likes
      INNER JOIN users
      ON likes.userid = users.userid
      INNER JOIN posts
      ON likes.postid = posts.postid
      INNER JOIN friends
      ON posts.userid = friends.friended
      WHERE friends.friender = $1
      
      ORDER BY kind DESC, createdat DESC
    `, [data.userId])
    let posts = []
    await results.rows.forEach((row) => {
      if (row.kind === 'post') {
        posts.push(this.postObject(row))
      } else if (row.kind === 'like') {
        let result = posts.find((x) => x.postId === row.postid)
        result.likeCount += 1
        result.likedBy.push(like.likeObject(row))
        if (row.userid === data.userId) result.likedByYou = 'full'
      } else {
        let result = posts.find((x) => x.postId === row.postid)
        result.commentCount += 1
        result.comments.unshift(comment.commentObject(row))
      }
    })
    return posts
  }
}

module.exports = Post
