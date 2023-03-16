const express = require('express')
const router = express.Router()
const service = require('../services/orderService')

router.post('/addOrder', service.addOrder)

router.get('/getAllOrder', service.getAllOrder)

router.get('/getOrder/:username', service.getOrder)

router.post('/updateOrderState/:id', service.updateOrderState)

router.post('/updateOrderAudit/:id', service.updateOrderAudit)

module.exports = router