const db = require('../db/dbConfig')
const bcrypt = require('bcryptjs')


const sql = `select Integral from ev_users where username=?`
const sql1 = `update ev_users set Integral=? where username=?`
const sql2 = `select * from ev_users where id=?`
const sql4 = `update ev_users set password=? where id=?`

//获取用户积分信息 http://127.0.0.1:3001/user/getInfo/:username
exports.getInfo = ((req,res)=>{
    db.query(sql, req.params.username, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.send({status:1,message:err})
      
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.send({status:1,message:'获取用户信息失败'})
      
        // 3. 将用户信息响应给客户端
        res.send({
          status: 0,
          message: '获取用户基本信息成功！',
          data: results[0],
        })
      })
})

//修改用户信息
exports.updateInfo = ((req, res)=>{
    db.query(sql1,[req.body, req.body.id],(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'修改用户基本信息失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'修改用户基本信息成功！'})
    })
})

//更改密码
exports.updatePassword = ((req, res)=>{
    db.query(sql2,[req.body, req.body.id],(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.length !== 1) return res.send({status:1, message:'用户不存在'})
        
        if(!bcrypt.compareSync(userinfo.password, results[0].password)) return res.send({status:1,message:'原密码错误！'})

        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql4, [newPwd, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) res.send({status:1,message:err})
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.send({status:1,message:'更新密码失败'})
          
            // 更新密码成功
            return res.send({status:0,message:'更新密码成功！'})
        })
    })
})

//更新积分 http://127.0.0.1:3001/user/updateIntegral/:username
exports.updateIntegral = ((req, res)=>{
    db.query(`update ev_users set Integral=${req.body.Integral} where username='${req.params.username}'`,(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'修改用户积分失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'修改用户积分成功！'})
    })
})