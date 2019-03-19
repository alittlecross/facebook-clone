process.env.PGUSER = ''
process.env.PGPASSWORD = ''
process.env.PGHOST = 'localhost'
process.env.PGDATABASE = 'facebook_test'
process.env.PGPORT = 5432

const bcrypt = require('bcrypt')
const saltRounds = 10

const dbc = require('../database-connection')

class Helper {
  static setupConnection () {
    process.env.PGUSER = '',
    process.env.PGPASSWORD = '',
    process.env.PGHOST = 'localhost',
    process.env.PGDATABASE = 'facebook_test',
    process.env.PGPORT = 5432
  }

  static async truncateDatabase () {
    await dbc.query(`
      TRUNCATE users, posts, likes, friends, friendrequests, comments CASCADE;
    `)
  }

  static mockUserFormData () {
    return {
      userId: '1',
      firstName: 'Michael',
      surname: 'Scott',
      email: 'michael.scott@scranton.com',
      password: 'password',
      year: '1964',
      month: '03',
      day: '15',
      sex: '2',
      profilePictureUrl: '/images/michael.jpg'
    }
  }

  static mockUserDatabaseData () {
    return {
      userid: '1',
      firstname: 'Michael',
      surname: 'Scott',
      email: 'michael.scott@scranton.com',
      password: 'password',
      year: '1964',
      month: '03',
      day: '15',
      sex: '2',
      profilepictureurl: '/images/michael.jpg'
    }
  }

  static mockFriendDatabaseData () {
    return {
      userid: '2',
      firstname: 'Dwight',
      surname: 'Schrute',
      profilepictureurl: '/images/dwight.png',
      friend: '1',
      friendrequester: '3',
      friendrequested: '4'
    }
  }

  static mockPostDatabaseData () {
    return {
      postid: '1',
      firstname: 'Michael',
      surname: 'Scott',
      profilepictureurl: '/images/michael.jpg',
      content: `I'm not superstitious, but I am a little stitious.`,
      createdat: new Date('2019', '03', '15', '08', '03')
    }
  }

  static mockLikeDatabaseData () {
    return {
      firstname: 'Michael',
      surname: 'Scott'
    }
  }

  static mockCommentDatabaseData () {
    return {
      firstname: 'Jim',
      surname: 'Halpert',
      profilepictureurl: '/images/jim.jpg',
      content: 'Question: Which bear is best?',
      createdat: new Date('2019', '03', '15', '08', '03')
    }
  }

  static mockNewDate () {
    return new Date('2019', '03', '15', '08', '03')
  }

  static mockNewSecondDate () {
    return new Date('2019', '03', '14', '08', '03')
  }

  static mockNewThirdDate () {
    return new Date('2019', '03', '13', '08', '03')
  }

  static mockNewFourthDate () {
    return new Date('2019', '03', '12', '18', '13')
  }

  static async mockCreateUser () {
    let hash = bcrypt.hashSync('password', saltRounds)
    await dbc.query(`
      INSERT INTO users
      VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    `, ['1', 'Michael', 'Scott', 'michael.scott@scranton.com', hash, '1964-03-15', '2', '/images/michael.png'])
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES ($1, $2);
    `, ['1', '1'])
  }

  static async mockCreateSecondUser () {
    let hash = bcrypt.hashSync('password', saltRounds)
    await dbc.query(`
      INSERT INTO users
      VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    `, ['2', 'Dwight', 'Schrute', 'dwight.schrute@scranton.com', hash, '1972-01-20', '2', '/images/dwight.png'])
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES ($1, $2);
    `, ['2', '2'])
  }

  static async mockCreateFriendRequest () {
    await dbc.query(`
      INSERT INTO friendrequests (friendrequester, friendrequested)
      VALUES ($1, $2);
    `, ['1', '2'])
  }

  static async mockCreateFriend () {
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES
        ($1, $2),
        ($2, $1);
    `, ['1', '2'])
  }

  static async mockCreatePost () {
    await dbc.query(`
      INSERT INTO posts (postid, userid, content)
      VALUES ($1, $2, $3);
    `, ['1', '1', `I'm not superstitious, but I am a little stitious.`])
  }

  static async mockCreateSecondPost () {
    await dbc.query(`
      INSERT INTO posts (postid, userid, content)
      VALUES ($1, $2, $3);
    `, ['2', '1', 'I declare bankruptcy!'])
  }

  static async mockCreateLike () {
    await dbc.query(`
      INSERT INTO likes (userid, postid)
      VALUES ($1, $2);
    `, ['1', '1'])
  }

  static async mockCreateSecondLike () {
    await dbc.query(`
      INSERT INTO likes (userid, postid)
      VALUES ($1, $2);
    `, ['2', '2'])
  }

  static async mockCreateComment (data) {
    await dbc.query(`
      INSERT INTO comments (postid, userid, content)
      VALUES ($1, $2, $3);
    `, ['1', '1', 'False: Black bear.'])
  }

  static async mockReadLike (data) {
    return dbc.query(`
      SELECT *
      FROM likes
      WHERE userid = $1 AND postid = $2 OR commentid = $3;
    `, [data.userId, data.postId, data.commentId])
  }
}

module.exports = Helper
