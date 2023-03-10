const mysql = require('mysql');
const config = require('../db/dbConfig');

// 连接mysql
function connect() {
  const { host, user, password, database } = config;
  return mysql.createPool({
    host,
    user,
    password,
    database
  })
}

// 新建查询连接
exports.querySql = (sql)=> { 
  const conn = connect();
  conn.query(sql,(err,results)=>{
    if(err){
      return res.send({status:1, message:'err'})
    }
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0],
    })
  })
}


// module.exports = {querySql}