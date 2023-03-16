const db = require('../db/dbConfig')

// sql = 'select count(*) from nv_users_orders where type=?'

//回收订单各种类所拥有的订单数 http://127.0.0.1:3001/chart/recyclecate/:type
exports.getRCate = ((req, res)=>{
    db.query(`select count(1) from nv_users_orders where type='${req.params.type}'`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获得回收订单各种类分别所拥有的订单数',data:arr})
    })
})

//回收订单各种类所拥有的订单数 http://127.0.0.1:3001/chart/recycleorder/:state
exports.getROrder = ((req, res)=>{
    db.query(`select count(1) from nv_users_orders where state='${req.params.type}' and username='${req.body.username}'`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获得回收订单各状态分别所拥有的订单数',data:arr})
    })
})

//换购订单各种类所拥有的订单数 http://127.0.0.1:3001/chart/usecate/:type
exports.getUCate = ((req, res)=>{
    db.query(`select count(1) from nv_users_useorders where type='${req.params.type}'`, (err, results)=>{
        // SQL 语句执行失败
        if (err) return res.send({status:1, message:err})

        let arr = []
        for(let value of results){
            arr.push(value)
        }

        res.send({status:0,message:'成功获得换购订单各种类分别所拥有的订单数',data:arr})
    })
})

