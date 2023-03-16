const express = require('express')
const router = express.Router()
const service = require('../services/itemService')
const expressJoi = require('@escook/express-joi')
const {add_cate_schema} = require('../utils/item')
const {delete_cate_schema} = require('../utils/item')

router.get('/getCate', service.getCate)

router.post('/addCate', expressJoi(add_cate_schema), service.getCate)

router.get('/deleteCate/:id', expressJoi(delete_cate_schema), service.deleteCate)

router.get('/getDetail/:id', service.getDetail)

router.get('/getUseOrder/:username', service.getUseOrder)

router.post('/addUseOrder', service.addUseOrder)

router.get('/getAllUseOrder', service.getAllUseOrder)

router.post('/updateUseOrderState/:id', service.updateUseOrderState)


module.exports = router