const express = require('express')
const router = express.Router()
const service = require('../services/userInfoService')
const expressJoi = require('@escook/express-joi')
const { update_info_schema, update_password_schema  } = require('../utils/user')

router.get('/getInfo/:username',service.getInfo)

router.post('/updateInfo',expressJoi(update_info_schema),service.updateInfo)

router.post('/updatePassword', expressJoi(update_password_schema ), service.updatePassword)

router.post('/updateIntegral/:username',service.updateIntegral)

module.exports = router