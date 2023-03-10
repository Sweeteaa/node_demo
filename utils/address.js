//地址验证规则
const joi = require('joi')

const name = joi.string().required()
const phone = joi.number().integer().min(11).required()
const city = joi.string().required()
const detail = joi.string().required()

exports.address_add_shema = {
    body:{
        name,
        phone,
        city,
        detail,
    },
}