const db = require('../db/dbConfig')

const sql = `insert into nv_users_activity set ?`

//新增订单 http://127.0.0.1:3001/user/activity/addActivityOrder
exports.addActivityOrder = ((req, res)=>{
    db.query(sql, req.body, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
          
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增活动失败'})

        res.send({status:0, message:'新增活动成功！'})
    })
})