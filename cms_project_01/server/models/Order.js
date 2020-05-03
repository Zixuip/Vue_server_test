// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: String },
  goodsId: { type: String },
  goodsPrice: { type: String },
  goodsNum: { type: String },
  goodsPoint: { type: String },
  addressName: { type: String },
  addressTel: { type: String },
  addressPost: { type: String },
  address: { type: String },

})

module.exports = mongoose.model('Order', schema)