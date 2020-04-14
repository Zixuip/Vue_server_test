// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // parent的type：先用mongoose特有的Types，关联ID，然后ref：关联的模型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)