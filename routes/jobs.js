const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobs') 
const { ensureAuth } = require('../middleware/auth')


router.get('/', ensureAuth, jobsController.getJobs)

router.post('/createJob', jobsController.createJob)

router.put('/markComplete', jobsController.markComplete)

router.put('/markIncomplete', jobsController.markIncomplete)

router.delete('/deleteJob', jobsController.deleteJob)

module.exports = router