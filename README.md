## 使用步骤

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=true} -->

1. 创建并初始化项目
    npm init -y
2. 安装express
    npm i express
3. 创建index.js（入口文件），并编写代码

```
    //引入express
    const express = require('express')

    //获取服务器的实例（对象）
    const app = express()

    //启动服务器
    app.listen(3001,()=>{
        console.log("服务器已启动")
    })

    //服务器能够正常访问需要为服务器设置路由
    app.get("/",(req,res,next)=>{
        console.log("有人访问了")
        //在路由中，1、读取用户请求报文（request） 2、根据用户请求响应（respone）
        //第三个参数next是一个函数，调用函数后可以触发后续中间件
    })
```

#### req函数
req.query()，表示查询字符串中的请求参数

#### res函数
- res.sendStatus(404)，向客户端发送响应状态码
- res.status(404)，设置响应状态码，但是不发送
- res.send()，设置并发送响应体

#### 中间件
和路由用法很像，区别：模糊匹配，路径设置父目录
```
app.use("/",(req,res)=>{
    res.send("这是中间件请求")
})

```

#### nodemon
代码修改后不需要重启服务器，可以监视代码的修改
使用方式：
1. 全局安装 npm i nodemon -g，安装后输入nodemon启动模块
2. 项目中安装 npm i nodemon -D，npx nodemon启动

#### params
```
app.use("/hello/:id",(req,res)=>{
    res.send("这是中间件请求")
})

```

:id访问/hello/xxx时就会触发，以冒号命名的部分称为params，在get请求它可以被解析为请求参数
区别：req.query获取查询字符串中的数据；req.params指定格式，不会传递复杂参数

#### post
1. 通过req.body来获取post请求的参数（请求体中的参数）
2. 默认情况下express会自动解析请求体，需要通过**中间件**来增加功能，```app.use(express.urlencoded())```

#### router
实际上是个中间件，可以在该中间件上去绑定各种路由以及其他中间件
```
router.get("/hello",(req,res)=>{
    res.send("hello")
})

app.use(router)
```

>区别：app只能有一个，router可以有多个

#### cookie
>http协议是一个**无状态的协议**，服务器无法区分请求是否发送自同一个客户端

cookie是http协议中用来解决无状态问题的技术
>本质是一个头，服务器以响应头的形式发送给客户端会将其存储并在下次向服务器发送请求时将其传回这样服务器就可以根据cookie识别出客户端

给客户端发送cookie```res.cookie("username","admin")```
服务器读cookie```req.cookies```，用来读取客户端发回的cookie

需要安装中间件是的express可以解析cookie：
1. 安装cookie-parser
2. app.use(require("cookie-parser"))

应用登录：
登陆成功，将用户名放入cookie——res.cookie("username", username)
并判断req.cookies.username有则转到响应页面，否则重定向为根目录

有效期：
- 默认为一次会话（session），从打开到关闭浏览器的过程
设置有效期：```res.cookie("username","admin",{expires:new Date(日期)}/maxAge:毫秒)```

#### session
服务器中存储的对象，这个对象用来存储用户的信息，每个session有一个唯一的id，session创建后id会以cookie的形式发送给浏览器。
浏览器收到后每次访问都会将id返回，服务器就可以根据id找到对应的session
- id->cookie
- session->对象

1. cookie->session->request
2. cookie->request
需要安装中间件是的express可以解析cookie：
1. 安装express-session
2. app.use(require("express-session"))

```
app.use(session({
    secret:""
}))

req.session
```

登录应用：
1. 登录成功后将用户信息放入session中，```req.session.loginUser = {对象，用户信息}```
2. 判断用户是否存在，```if(req.session.loginUser)```


## API设计

用户注册：http://127.0.0.1:3001/api/signIn

用户登录：http://127.0.0.1:3001/api/login

查看用户信息：http://127.0.0.1:3001/user/getInfo

更改用户信息：http://127.0.0.1:3001/user/updateInfo

更改账号密码：http://127.0.0.1:3001/user/updatePassword

查看换购物品列表：http://127.0.0.1:3001/user/items/getCate

获取指定物品：http://127.0.0.1:3001/user/items/getDetail

查看换购物品订单：http://127.0.0.1:3001/user/items/getUseOrder

新建上门地址：http://127.0.0.1:3001/user/address/addAddress

新建上门地址：http://127.0.0.1:3001/user/address/getAddress

新建回收订单信息：http://127.0.0.1:3001/user/order/addOrder

查看回收订单信息：http://127.0.0.1:3001/user/order/getOrder



```
node_demo
├─ .idea
│  ├─ jsLibraryMappings.xml
│  ├─ modules.xml
│  ├─ node_demo.iml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ config.js
├─ db
│  └─ dbConfig.js
├─ index.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ routes
│  ├─ address.js
│  ├─ index.js
│  ├─ item.js
│  ├─ order.js
│  ├─ task.js
│  ├─ user.js
│  └─ userinfo.js
├─ services
│  ├─ addressService.js
│  ├─ itemService.js
│  ├─ orderService.js
│  ├─ takeService.js
│  ├─ userInfoService.js
│  └─ userService.js
└─ utils
   ├─ address.js
   ├─ index.js
   ├─ item.js
   └─ user.js

```