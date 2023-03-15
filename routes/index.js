const express = require('express');
const userRouter = require('./user');
const userInfo = require('./userinfo');
const itemsInfo = require('./item');
const address = require('./address');
const order = require('./order')
const chart = require('./chart')
const router = express.Router(); // 注册路由 


router.use('/api', userRouter); // 注入用户路由模块

router.use('/user', userInfo); // 注入用户信息路由模块

router.use('/user/items', itemsInfo); // 注入用户信息路由模块

router.use('/user/address', address); // 注入用户地址信息路由模块

router.use('/user/order', order); // 注入用户地址信息路由模块

router.use('/chart', chart); // 注入图表路由模块

module.exports = router;