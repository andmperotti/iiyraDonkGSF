const express = require('express')
const router = express.Router()
const requestedController = require('../controllers/request') 
const { ensureAuth } = require('../middleware/auth')


router.get('/', ensureAuth, requestedController.getRequestedItems)

router.post('/createRequestedItem', requestedController.createRequestedItem)

router.put('/markComplete', requestedController.markComplete)

router.put('/markIncomplete', requestedController.markIncomplete)

router.delete('/deleteRequested', requestedController.deleteRequested)

module.exports = router