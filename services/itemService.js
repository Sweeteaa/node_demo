const db = require('../db/dbConfig')

const sql = `select * from ev_items_cate `
const sql1 = `select * from ev_items_cate where name=? or alias=?`
const sql2 = `insert into nv_users_useorders set ?`
const sql3 = `select * from ev_items_cate where id=?`
const sql4 = `select * from nv_users_useorders where username=?`
const sql5 = `select * from nv_users_useorders`

//获取物品分类列表
exports.getCate = ((req, res)=>{
    db.query(sql,(err, results)=>{
        if(err) return res.send({status:1, message:err})

        res.send({
            status:0,
            message:'成功获取分类列表',
            data:results
        })
    })
})

//新增物品分类
exports.addCate = ((req, res)=>{
    db.query(sql1, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({status:1, message:err})
        
        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.send({status:1, message:'分类名称与别名被占用，请更换后重试！'})
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.send({status:1, message:'分类名称与别名被占用，请更换后重试！'})
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.send({status:1, message:'分类名称被占用，请更换后重试！'})
        if (results.length === 1 && results[0].alias === req.body.alias) return res.send({status:1, message:'分类别名被占用，请更换后重试！'})
        
        db.query(sql2, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.send({status:1, message:err})
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.send({status:1, message:'新增文章分类失败'})
          
            // 新增文章分类成功
            res.send({status:0, message:'新增文章分类成功'})
        })
    })
})

//删除物品分类
exports.deleteCate = ((req, res)=>{
    db.query(sql,(err, results)=>{
        if (err) return res.send({status:1, message:err})

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'删除文章分类失败'})

        // 删除文章分类成功
        res.send({status:0, message:'删除文章分类成功'})
    })
})

//获取指定物品
exports.getDetail = ((req, res)=>{
    db.query(sql3,req.params.id,(err, results)=>{
        if (err) return res.send({status:1, message:err})

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.length !== 1) return res.send({status:1, message:'获取指定物品失败'})

        // 获取指定物品成功
        res.send({
            status:0,
            message:'成功获取指定物品',
            data:results
        })
    })
})

//获取换购物品订单
exports.getUseOrder = ((req, res)=>{
    db.query(sql4,req.params.username,(err, results)=>{
        if (err) return res.send({status:1, message:err})

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.length < 1) return res.send({status:1, message:'失败获取换购物品订单'})

        // 获取指定物品成功
        res.send({
            status:0,
            message:'成功获取换购物品订单',
            data:results
        })
    })
})

//新增物品分类
exports.addUseOrder = ((req, res)=>{
    db.query(sql2, [req.body], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})
        
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send({status:1, message:'新增换购订单失败'})
        
        // 新增文章分类成功
        res.send({status:0, message:'新增换购订单成功'})
    })
})

//获取全部用户换购物品订单
exports.getAllUseOrder = ((req, res)=>{
    db.query(sql5,(err, results)=>{
        if (err) return res.send({status:1, message:err})

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.length < 1) return res.send({status:1, message:'失败获取换购物品订单'})

        // 获取指定物品成功
        res.send({
            status:0,
            message:'成功获取换购物品订单',
            data:results
        })
    })
})

//更新用户换购订单状态 http://127.0.0.1:3001/user/items/updateUseOrderState/:id
exports.updateUseOrderState = ((req, res)=>{
    db.query(`update nv_users_useorders set state='${req.body.state}' where id=${req.params.id}`,(err, results)=>{
        if (err) return res.send({status:1,message:err})

        if (results.affectedRows !== 1) return res.send({status:1, message:'更新用户换购订单状态失败！'})

        // 修改用户信息成功
        return res.send({status:0, message:'更新用户换购订单状态成功！'})
    })
})

