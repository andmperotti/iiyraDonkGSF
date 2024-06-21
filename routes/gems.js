const express = require('express')
const router = express.Router()
const gemsController = require('../controllers/gems') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, gemsController.getGems)

router.put('/markComplete', gemsController.markComplete)

router.put('/markIncomplete', gemsController.markIncomplete)


module.exports = router