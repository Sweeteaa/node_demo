//入口文件

//引入express
const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors'); // 引入cors模块
const joi = require('joi')// 捕获验证失败的错误
const config = require('./config')
const expressJWT = require('express-jwt')


//获取服务器的实例（对象）
const app = express()

app.use(cors()); // 注入cors模块解决跨域

// 响应数据的中间件
// app.use(function (req, res, next) {
//   // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
//   res.cc = function (err, status = 1) {
//     res.send({
//       // 状态
//       status,
//       // 状态描述，判断 err 是 错误对象 还是 字符串
//       message: err instanceof Error ? err.message : err,
//     })
//   }
//   next()
// })

// 配置解析表单数据的中间件, 这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }));

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//,/^\/user\//], }))



//全局错误级别中间件
app.use((err, req, res, next)=>{
    if(err instanceof joi.ValidationError) return res.send({status:1,message:err})
    // 未知错误

    if(err.name === 'UnauthorizedError') return res.send({status:1,message:'身份认证失败！'})
})

const routes = require('./routes'); //导入自定义路由文件，创建模块化路由
app.use('/', routes);

//启动服务器
app.listen(3001,()=>{
    console.log("服务器已启动")
})
