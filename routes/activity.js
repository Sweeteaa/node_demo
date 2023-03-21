const express = require('express')
const router = express.Router()
const service = require('../services/activityService')

router.post('/addActivityOrder', service.addActivityOrder)

module.exports = router