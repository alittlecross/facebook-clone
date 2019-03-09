const dbc = require('../database-connection')

class Friend {
  static async add (requester, requested) {
    await dbc.query(`
      INSERT INTO friendrequests (friendrequester, friendrequested)
      VALUES ($1, $2);
    `, [requester, requested])
  }

  static async confirm (requester, requested) {
    await dbc.query(`
      DELETE FROM friendrequests
      WHERE friendrequester = $2 AND friendrequested = $1;
    `, [requester, requested])
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES ($1, $2);
    `, [requester, requested])
    await dbc.query(`
      INSERT INTO friends (friender, friended)
      VALUES ($2, $1);
    `, [requester, requested])
  }

  static async cancel (requester, requested) {
    await dbc.query(`
      DELETE FROM friendrequests
      WHERE friendrequester = $1 AND friendrequested = $2;
    `, [requester, requested])
  }

  static async remove (requester, requested) {
    await dbc.query(`
      DELETE FROM friends
      WHERE friender = $1 AND friended = $2
    `, [requester, requested])
    await dbc.query(`
      DELETE FROM friends
      WHERE friender = $2 AND friended = $1
    `, [requester, requested])
  }
}

module.exports = Friend
