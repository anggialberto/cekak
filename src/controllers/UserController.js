const UserModel = require('../../models').User
const UrlModel = require('../../models').Url
const bcrypt = require('bcrypt')
const url = require('../utils/urlShortener')

exports.showPageRegister = (req, res) => {
  if (req.session.user === null || req.session.user === undefined) {
    res.render('users/register', {
      title: 'Register | Shorten URLs with Cekak.web.id',
      user: req.session.user
    })
  } else {
    res.redirect('/users/dashboard')
  }
}

exports.showPageLogin = (req, res) => {
  if (req.session.user === null || req.session.user === undefined) {
    res.render('users/login', {
      title: 'Login | Shorten URLs with Cekak.web.id',
      user: req.session.user
    })
  } else {
    res.redirect('/users/dashboard')
  }
}

exports.showPageDashboard = (req, res) => {
  res.render('users/dashboard', {
    title: 'Dashboard | Shorten URLs with Cekak.me',
  })
}

exports.register = (req, res) => {
  let { username, password } = req.body
  const salt = 10
  password = bcrypt.hashSync(password, salt)

  UserModel.create({ username, password })
    .then(user => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.login = (req, res) => {
  const data = req.body

  UserModel.findOne({ where: { username: data.username } })
    .then(user => {
      if (user != null) {
        const checkPassword = bcrypt.compareSync(data.password, user.password)
        if (checkPassword) {
          req.session.user = { username: user.username }
          res.redirect('/')
        } else {
          res.redirect('/users/login')
        }
      } else {
        res.redirect('/users/login')
      }
    })
}

exports.createUrl = (req, res) => {
  const session = req.session
  const data = req.body
  if (session.user) {
    const username = session.user.username
    let longUrl = data.longUrl
    const hash = url.generateShortURL()
    UrlModel.create({ hash, longUrl, username })
      .then(url => {
        res.json({
          result: true,
          shortUrl: hash
        })
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    res.json({
      result: false,
      reason: "You must login first!"
    })
  }
}

exports.logout = (req, res) => {
  req.session.user = null
  req.session.destroy(err => {
    err ? console.log(err) : res.redirect('/users/login')
  })
}
