const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

const user = require('./lib/user')

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
  res.render('index.ejs', { sessionFlash: res.locals.sessionFlash })
})

app.post('/sign-in', async (req, res) => {
  let result = await user.logIn(req.body.email, req.body.password)
  if (result === false) {
    req.session.sessionFlash = { message: 'Email address or password incorrect.' }
    res.redirect('/')
  } else {
    req.session.userid = result.userid
    res.redirect('/news-feed')
  }
})

app.post('/sign-up', async (req, res) => {
  if (await user.alreadyRegistered(req.body.email)) {
    req.session.sessionFlash = { message: 'Email address already in use.' }
    res.redirect('/')
  } else {
    let dob = `${req.body.year}-${req.body.month}-${req.body.day}`
    let result = await user.register(req.body.firstName, req.body.surname, req.body.email, req.body.password, dob, req.body.sexId)
    req.session.userid = result.userid
    res.redirect('/news-feed')
  }
})

app.get('/news-feed', (req, res) => {
  res.render('news-feed.ejs')
})

app.listen(3000)

module.exports = app
