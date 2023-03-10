const express = require('express')
const router = express.Router()
const service = require('../services/takeService')

// 任务清单接口
router.get('/queryTaskList', service.queryTaskList);

module.exports = router;