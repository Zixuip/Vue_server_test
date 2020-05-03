// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  tel: { type: String },
  post: { type: String },
  address: { type: String },
})

module.exports = mongoose.model('Address', schema)