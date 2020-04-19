// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  img: { type: String },
  urlink: { type: String }


})

module.exports = mongoose.model('Ad', schema)