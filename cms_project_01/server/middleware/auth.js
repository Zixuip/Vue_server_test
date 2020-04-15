/* module.exports = async (req, res, next) => {
  // 用token在后端获取那个Bearer +token数据，然后用split分割取后面的token部分
  const token = String(req.headers.authorization || '').split(' ').pop()
  assert(token, 401, '请先登录')//assert(token, 401, '请提供jwt token')
  const { id } = jwt.verify(token, app.get('secret'))
  assert(id, 401, '请先登录')//assert(id, 401, '无效的jwt token')
  req.user = await AdminUser.findById(id)
  // console.log(req.user)
  assert(req.user, 401, '请先登录')
  await next()
} */

module.exports = options => {
  const jwt = require('jsonwebtoken')
  // 这个包是用来处理报错的npm可以搜：http-assert
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    // 用token在后端获取那个Bearer +token数据，然后用split分割取后面的token部分
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')//assert(token, 401, '请提供jwt token')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')//assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    // console.log(req.user)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
