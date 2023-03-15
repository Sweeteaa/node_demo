const db = require('../db/dbConfig')

const sql = `insert into nv_users_orders set ?`
const sql1 = `select * from nv_users_orders where username=?`


//新增订单 http://127.0.0.1:3001/user/order/addOrder
exports.addOrder = ((req, res)=>{
    db.query(sql, req.body, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
          
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增地址失败'})

        res.send({status:0, message:'新增订单成功！'})
    })
})

//获取指定用户订单列表 http://127.0.0.1:3001/user/order/getOrder/:username
exports.getOrder = ((req, res)=>{
    db.query(`select * from nv_users_orders where username='${req.params.username}'`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获得指定用户订单列表',data:arr})
    })
})

//更新用户换购订单状态 http://127.0.0.1:3001/user/order/updateOrderState/:id
exports.updateOrderState = ((req, res)=>{
    db.query(`update nv_users_useorders set state='${req.body.state}' where id=${req.params.id}`,(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'更新用户回收订单状态失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'更新用户回收订单状态成功！'})
    })
})

