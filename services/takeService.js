const db = require('../db/dbConfig')

const sql = 'select username from ev_users';

exports.queryTaskList = ((req,res)=>{
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        // if (err) return res.send({status:1, message:'err'})
      
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        // if (results.length !== 1) return res.cc('获取用户信息失败！')
      
        // 3. 将用户信息响应给客户端
        console.log(results[0])
      })
})
