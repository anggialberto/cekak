module.exports = (express) => {
    const router = express.Router()

    router.use('/users', require('./UserRoutes'))
    router.use(require('./PublicRoutes'))

    return router
}