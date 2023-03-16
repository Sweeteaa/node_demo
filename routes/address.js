const express = require('express');
const router = express.Router();
const service = require('../services/addressService')
const expressJoi = require('@escook/express-joi')
const {address_add_shame} = require('../utils/address')

router.post('/addAddress', service.addAddress)//新增上门地址

router.get('/getAddress/:username', service.getAddress)//查找上门地址

module.exports = router