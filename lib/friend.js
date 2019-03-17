const dbc = require('../database-connection')

class Friend {
  static friendObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      profilePictureUrl: data.profilepictureurl,
      friend: data.friended,
      friendRequester: data.friendrequester,
      friendRequested: data.friendrequested
    }
  }

  static async add (requester, requested) {
    return dbc.query(`
      INSERT INTO friendrequests (friendrequester, friendrequested)
      VALUES ($1, $2)
      RETURNING friendrequester, friendrequested;
    `, [requester, requested])
  }

  static async confirm (requester, requested) {
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES
        ($1, $2),
        ($2, $1);
    `, [requester, requested])
    return dbc.query(`
      DELETE FROM friendrequests
      WHERE friendrequester = $2 AND friendrequested = $1;
    `, [requester, requested])
  }

  static async cancel (requester, requested) {
    return dbc.query(`
      DELETE FROM friendrequests
      WHERE friendrequester = $1 AND friendrequested = $2;
    `, [requester, requested])
  }

  static async remove (requester, requested) {
    return dbc.query(`
      DELETE FROM friends
      WHERE
        friender = $1 AND friended = $2
      OR
        friender = $2 AND friended = $1
    `, [requester, requested])
  }

  static async getUsers (data) {
    let results = await dbc.query(`
      SELECT userid, firstname, surname, profilepictureurl, friended, requester.friendrequester, requested.friendrequested
      FROM users
      LEFT JOIN friends
      ON userid = friender
      AND friended = $1
      LEFT JOIN friendrequests
      AS requester
      ON requester.friendrequested = userid
      AND requester.friendrequester = $1
      LEFT JOIN friendrequests AS requested
      ON requested.friendrequester = userid
      AND requested.friendrequested = $1
      WHERE userid != $1
      ORDER BY friended DESC, requester.friendrequester DESC, requested.friendrequested DESC, firstname ASC;
    `, [data.userId])
    let users = []
    await results.rows.forEach((user) => {
      users.push(this.friendObject(user))
    })
    return users
  }
}

module.exports = Friend
