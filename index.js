const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const user = require('./lib/user')
const post = require('./lib/post')
const comment = require('./lib/comment')
const like = require('./lib/like')
const friend = require('./lib/friend')

let position = {
  y: 0
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'facebook'
}))

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

app.get('/', (req, res) => {
  res.render('index.ejs', { sessionFlash: res.locals.sessionFlash, position: position })
})

app.post('/sign-in', async (req, res) => {
  let result = await user.logIn(req.body)
  if (result === false) {
    req.session.sessionFlash = { message: 'Email address or password incorrect.' }
    res.redirect('/')
  } else {
    req.session.user = result
    res.redirect('/news-feed')
  }
})

app.post('/sign-up', async (req, res) => {
  if (await user.alreadyRegistered(req.body)) {
    req.session.sessionFlash = { message: 'Email address already in use.' }
    res.redirect('/')
  } else {
    let result = await user.register(req.body)
    await friend.confirm(result.userId, result.userId)
    req.session.user = result
    res.redirect('/news-feed')
  }
})

app.get('/news-feed', async (req, res) => {
  let posts = await post.getPosts(req.session.user)
  let users = await friend.getUsers(req.session.user)
  res.render('news-feed.ejs', { user: req.session.user, posts: posts, users: users, position: position })
})

app.post('/create-post', async (req, res) => {
  if (req.body.content !== '') {
    await post.create(req.body)
  }
  res.redirect('/news-feed')
})

app.post('/create-comment', async (req, res) => {
  position.y = req.body.position
  if (req.body.content !== '') {
    await comment.create(req.body)
  }
  res.redirect('/news-feed')
})

app.post('/toggle-like', async (req, res) => {
  position.y = req.body.position
  await like.toggle(req.body)
  res.redirect('/news-feed')
})

app.get('/add/:requester/:requested', async (req, res) => {
  let requester = req.params.requester
  let requested = req.params.requested
  await friend.add(requester, requested)
  res.redirect('/news-feed')
})

app.get('/confirm/:requester/:requested', async (req, res) => {
  let requester = req.params.requester
  let requested = req.params.requested
  await friend.confirm(requester, requested)
  res.redirect('/news-feed')
})

app.get('/cancel/:requester/:requested', async (req, res) => {
  let requester = req.params.requester
  let requested = req.params.requested
  await friend.cancel(requester, requested)
  res.redirect('/news-feed')
})

app.get('/remove/:requester/:requested', async (req, res) => {
  let requester = req.params.requester
  let requested = req.params.requested
  await friend.remove(requester, requested)
  res.redirect('/news-feed')
})

app.get('/log-out', (req, res) => {
  position.y = 0
  req.session.destroy()
  res.redirect('/')
})

app.listen(3000)

module.exports = app
