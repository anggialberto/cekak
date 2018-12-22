const UrlModel = require('../../models').Url

exports.showPageHome = (req, res) => {
  res.render('index', {
    title: 'Cekak.me | Shortener URL',
    user: req.session.user
  })
}

exports.showPage404 = (req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
}

exports.direct = (req, res, next) => {
  const hash = req.params.hash
  UrlModel.findOne({ where: { hash: hash } })
    .then(url => {
      res.redirect(url.longUrl)
    })
    .catch(err => {
      next()
    })
}