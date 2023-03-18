const express = require('express')
const router = express.Router()
const service = require('../services/orderService')

router.post('/addOrder', service.addOrder)

router.get('/getAllOrder', service.getAllOrder)

router.get('/getOrder/:username', service.getOrder)

router.post('/updateOrderState/:id', service.updateOrderState)

router.post('/updateOrderAudit/:id', service.updateOrderAudit)

router.post('/updateOrderWeight/:id', service.updateOrderWeight)

router.post('/updateOrderIntegral/:id', service.updateOrderIntegral)

module.exports = router