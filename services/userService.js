const db = require('../db/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const sql = `select username, password, Integral from ev_users where username=?`
const sql1 = `insert username, password, Integral into ev_users set ?`

exports.signIn = ((req,res)=>{
    //1. 检测表单发送数据是否合法
    const userinfo = req.body
    // if(!config.username && ! config.password){
    //     return res.send({status:1, message:'用户名或密码格式不正确'})
    // }

    // console.log(req.body)
    //2. 检测用户名是否被占用
    db.query(sql,[userinfo.username],(err,results)=>{
        {
            if(err){
                return res.send({status:1,message:err})
            }
            if(results.length > 0){
                return res.send({status:1,message:'该账户名已被注册'})
            }
            // res.cc('用户名可用', 0)
            //4. 插入新注册用户
            db.query(`insert into ev_users set username='${userinfo.username}', password='${userinfo.password}', Integral=${userinfo.Integral}`,(err,results)=>{
                {
                    if(err){
                        return res.send({status:1,message:err})
                    }
                    if(results.affectedRows !== 1){
                        return res.send({status:1,message:'注册失败！'})
                    }
                    res.send({status:0,message:'注册成功！'})
                }
            })
        }
    })

    //3. 对用户密码进行加密处理
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    

})

exports.login = ((req, res)=>{
    //1. 接收表单数据
    const userinfo = req.body

    //2. 查询用户信息
    db.query(sql, [userinfo.username], (err, results)=>{
        if(err) return res.send({status:1,message:err})

        if(results.length !== 1) return res.send({status:1,message:'登录失败！'})

        //判断用户密码是否正确，调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
        if(!bcrypt.compareSync(userinfo.password, results[0].password)) return res.send({status:1,message:'登录失败！'})

        const user = {...results[0], password:'',Integral:''}
        
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn:config.expiresIn})

        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr,
            data:results[0]
        })
    })

    
})