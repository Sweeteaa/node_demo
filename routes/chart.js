const express = require('express')
const router = express.Router()
const service = require('../services/chartService')

// router.get('/getCate', service.getCate)

router.get('/recyclecate/:type',  service.getRCate)

router.get('/usecate/:type',  service.getUCate)


module.exports = router