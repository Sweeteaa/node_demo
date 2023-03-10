const express = require('express')
const router = express.Router()
const service = require('../services/userService')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../utils/user')


//注册
router.post('/signIn',expressJoi(reg_login_schema), service.signIn)

//登录
router.post('/login',expressJoi(reg_login_schema), service.login)


module.exports = router