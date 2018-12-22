const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

const models = require('./models')
const routes = require('./src/routes');

// inisialisai path static files, views and engine ejs
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// inisialisasi session
app.use(session({ secret: 'a11f19bc-1746-4bd5-ba73-d039b238e5f9', cookie: {} }));

// boody parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// inisialisasi routes
app.use(routes(express))

// port
const PORT = process.env.PORT || 3000

// run server
models.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
  })