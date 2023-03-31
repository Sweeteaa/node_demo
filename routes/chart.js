const express = require('express')
const router = express.Router()
const service = require('../services/chartService')

// router.get('/getCate', service.getCate)

router.get('/recyclecate/:type',  service.getRCate)

router.get('/recycleday/:addTime/:type',  service.getRDay)

router.get('/useday/:addTime/:type',  service.getUDay)

router.get('/usecate/:type',  service.getUCate)

router.get('/recycleorder/:state',  service.getROrder)


module.exports = router