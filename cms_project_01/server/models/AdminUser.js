// 创建Category的数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
    // bcrypt:密码加密
  }

})

module.exports = mongoose.model('AdminUser', schema)