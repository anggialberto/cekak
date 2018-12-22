const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const Auth = require('../middlewares/AuthSession')

router.get('/register', UserController.showPageRegister)
router.get('/login', UserController.showPageLogin)
router.get('/logout', UserController.logout)
router.get('/dashboard', UserController.showPageDashboard, Auth.checkAuth)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/createUrl', UserController.createUrl)

module.exports = router