// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: String },
  goodsId: { type: String },
  goodsName: { type: String },
  goodsNum: { type: Number },
  goodsPrice: { type: Number },
  goodsPoint: { type: String },
  goodsImg: { type: String }



})

module.exports = mongoose.model('Cart', schema)