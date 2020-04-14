/* 
  用express来做后端接口
*/
const express = require('express')
const app = express()
// 安装并使用跨域工具 cors
app.use(require('cors')())
// 让后台客户端识别json
app.use(express.json())
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

// 引用数据库
require('./plugins/db')(app)
// 向admin内部调用app
require('./routes/admin')(app)


app.listen(3000, () => {
  console.log('http://localhost:3000');
})