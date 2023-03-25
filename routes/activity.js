const express = require('express')
const router = express.Router()
const service = require('../services/activityService')

router.post('/addActivity', service.addActivity)

router.get('/getActivity', service.getActivity)

router.post('/delActivity/:id', service.delActivity)

router.get('/getActivityDetail/:id', service.getActivityDetail)

router.post('/addActivityOrder', service.addActivityOrder)

router.get('/getActivityOrder', service.getActivityOrder)

router.post('/updateOrderState/:id', service.updateOrderState)

router.post('/updateActivityNeed/:id', service.updateActivityNeed)

router.get('/getUserOrder/:username', service.getUserOrder)

module.exports = router