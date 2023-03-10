const db = require('../db/dbConfig')

const sql = `insert into nv_users_address set ?`
const sql1 = `select * from nv_users_address`
// const sql1 = `select * from nv_users_address where username=?`

//新增上门地址
exports.addAddress = ((req,res)=>{

    db.query(sql, req.body, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
          
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增地址失败'})

        res.send({status:0, message:'新增地址成功！'})
    })
})

exports.getAddress = ((req,res) =>{
    db.query(sql1, [req.params.username], (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获取地址列表',data:arr})
    })
})