const db = require('../db/dbConfig')

const sql = `insert into nv_users_activity set ?`

const sql1 = `insert into nv_users_activityorder set ?`

//新增活动 http://127.0.0.1:3001/user/activity/addActivity
exports.addActivity = ((req, res)=>{
    db.query(`insert into nv_users_activity set title='${req.body.title}', text='${req.body.text}', img='${req.body.img}', main='${req.body.main}', num=${req.body.num}, progress=${0}`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
          
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增活动失败'})

        res.send({status:0, message:'新增活动成功！'})
    })
})

//获取活动 http://127.0.0.1:3001/user/activity/getActivity
exports.getActivity = ((req, res)=>{
    db.query(`select * from nv_users_activity`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获取活动列表',data:arr})
    })
})

//删除指定活动 http://127.0.0.1:3001/user/activity/delActivityOrder/:id
exports.delActivity = ((req, res)=>{
    db.query(`update nv_users_activity set state='${req.body.state}' where id=${req.params.id}`, (err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'修改活动状态失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'修改活动状态成功！'})
    })
})

//获取指定活动详情 http://127.0.0.1:3001/user/activity/getActivityDetail/:id
exports.getActivityDetail = ((req, res)=>{
    db.query(`select * from nv_users_activity where id=${req.params.id}`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获取活动列表',data:arr})
    })
})

//新增活动 http://127.0.0.1:3001/user/activity/addActivityOrder
exports.addActivityOrder = ((req, res)=>{
    db.query(sql1, req.body, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
          
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增活动订单失败'})

        res.send({status:0, message:'新增活动订单成功！'})
    })
})

//获取活动订单 http://127.0.0.1:3001/user/activity/getActivityOrder
exports.getActivityOrder = ((req, res)=>{
    db.query(`select * from nv_users_activityorder`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获取活动订单列表',data:arr})
    })
})

//更新用户活动订单状态 http://127.0.0.1:3001/user/activity/updateOrderState/:id
exports.updateOrderState = ((req, res)=>{
    db.query(`update nv_users_activityorder set state='${req.body.state}' where id=${req.params.id}`,(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'修改用户活动订单状态失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'修改用户活动订单状态成功！'})
    })
})

//更新活动所需数量 http://127.0.0.1:3001/user/activity/updateActivityNeed/:id
exports.updateActivityNeed = ((req, res)=>{
    db.query(`update nv_users_activity set progress='${req.body.progress}' where id=${req.params.id}`,(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'修改活动需求失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'修改活动需求成功！'})
    })
})

//获取指定用户活动订单 http://127.0.0.1:3001/user/activity/getUserOrder/:username
exports.getUserOrder = ((req, res)=>{
    db.query(`select * from nv_users_activityorder where username = '${req.params.username}'`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获取指定用户活动订单列表',data:arr})
    })
})
