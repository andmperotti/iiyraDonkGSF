const express = require('express')
const router = express.Router()
const uniquesController = require('../controllers/uniques') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, uniquesController.getUniques)

router.put('/markComplete', uniquesController.markComplete)

router.put('/markIncomplete', uniquesController.markIncomplete)


module.exports = router