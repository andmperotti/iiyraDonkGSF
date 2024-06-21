const express = require('express')
const router = express.Router()
const othersController = require('../controllers/others') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, othersController.getOthers)

router.put('/markComplete', othersController.markComplete)

router.put('/markIncomplete', othersController.markIncomplete)


module.exports = router