const mongoose = require('mongoose')
/* // 创建Good 商品模型
 */

const schema = new mongoose.Schema({
  name: { type: String },
  point: { type: String },
  price: { type: Number },
  oldprice: { type: Number },
  amount: { type: Number },
  body: { type: String },
  icon: { type: String },
  img: [{
    image: { type: String }
  }],
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
})

module.exports = mongoose.model('Good', schema)