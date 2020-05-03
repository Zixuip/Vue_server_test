// 数据库连接
module.exports = app => {
  // 创建数据库连接
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/vue_pro_2', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })


}
