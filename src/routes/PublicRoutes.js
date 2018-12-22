const express = require('express')
const router = express.Router()

const PublicController = require('../controllers/PublicController')

router.get('/', PublicController.showPageHome)
router.get('/:hash', PublicController.direct)
router.get('*', PublicController.showPage404)

module.exports = router