const express = require('express')
const router = express.Router()
const service = require('../services/orderService')

router.post('/addOrder', service.addOrder)

router.get('/getOrder', service.getOrder)

router.post('/updateOrderState/:id', service.updateOrderState)


module.exports = router