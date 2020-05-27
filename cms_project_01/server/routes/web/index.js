module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const Cart = require('../../models/Cart')
  const Good = require('../../models/Good')
  const Order = require('../../models/Order')
  const User = require('../../models/User')

  // 封装一个中间键:登录校验模块
  const authMiddleware = require('../../middleware/auth')

  // 封装一个中间键：资源校验
  const resourceMiddleware = require('../../middleware/resource')

  // express 的子路由
  const router = express.Router({
    mergeParams: true
  })
  // 自动寻找对应的模型
  app.use('/web/api/rest/:resource', resourceMiddleware(), router)

  /* 资源列表 */
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 加入购物车start
  app.post('/web/api/addcart', async (req, res) => {
    let { userId, goodsId, goodsNum } = req.body
    const item = await Good.findById(goodsId)
    if (item.amount > 0) {
      const cart = await Cart.findOne({ goodsId })
      if (!cart) {
        // 根据goodsId判断是否存在，在就不重复添加
        const goods = await Good.findById(goodsId)//找到对应商品ID的信息 
        const model = await Cart.create({
          userId: userId,
          goodsId: goodsId,
          goodsName: goods.name,
          goodsPrice: goods.price,
          goodsPoint: goods.point,
          goodsImg: goods.icon,
          goodsNum: goodsNum
        })
        res.send(model)
      } else {
        // 读取数量
        const _num = await Cart.findOne({ goodsId })
        Num = _num.goodsNum + 1
        if (item.amount != _num.goodsNum) {
          const model = await Cart.findOneAndUpdate({ goodsId }, {
            goodsNum: Num
          }, { new: true })
          res.send(model)
        } else {
          assert(!item.amount, 422, '库存上限')
        }
      }
    } else if (item.amount === 0) {
      assert(item.amount, 422, '库存为零')
    }
  })
  // 获取购物车信息
  app.get('/web/api/cart', async (req, res) => {
    const model = await Cart.find()
    res.send(model)
  })
  // 删除购物车信息
  app.post('/web/api/delcart', async (req, res) => {
    let { goodsId } = req.body
    await Cart.findOneAndDelete({ goodsId })
    res.send({ success: true })
  })
  // 购物车end

  // 订单start
  // 生成订单
  app.post('/web/api/order', async (req, res) => {
    let { userId, id, price, num, point, name, tel, post, address } = req.body
    const order = await Order.create({
      userId: userId,
      goodsId: id,
      goodsPrice: price,
      goodsNum: num,
      goodsPoint: point,
      addressName: name,
      addressTel: tel,
      addressPost: post,
      address: address
    })
    res.send(order)

    // 创建积分
    const item = await User.findOne({ userId })
    if (!item.point) {
      _point = point * num
      await User.findOneAndUpdate({ userId }, {
        point: _point
      })
    } else {
      // 修改积分
      _point = Number(item.point) + Number(point) * Number(num)
      await User.findOneAndUpdate({ userId }, {
        point: _point
      }, { new: true })
    }
    // 修改库存
    const _amount = await Good.findById(id)
    amount_new = _amount.amount - num
    await Good.findByIdAndUpdate(id, {
      amount: amount_new
    })
    res.send(amount_new)
  })

  // 获取订单
  app.get("/web/api/order", async (req, res) => {
    const model = await Order.find()
    res.send(model)
  })
  // 根据ID获取订单详情
  app.get('/web/api/order/:id', async (req, res) => {
    const item = await Order.findById(req.params.id)
    res.send(item)
  })
  // ========================订单end

  // 获取用户的积分
  app.post('/web/api/point', async (req, res) => {
    const username = req.body
    const model = await User.findOne(username)
    res.send(model)
  })
  // 使用积分兑换，积分清零
  app.post('/web/api/resetPoint', async (req, res) => {
    const username = req.body
    const model = await User.findOneAndUpdate(username, {
      point: 0
    })
    res.send(model)
  })

  // 根据ID获取详细信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //用户登录
  app.post('/web/api/login', async (req, res) => {
    const { username, password } = req.body
    //1. 根据用户名找数据中的用户
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    //2.校验密码
    if (!password) {
      assert(password, 422, '请输入密码')
    } else {
      const isValid = require('bcrypt').compareSync(password, user.password)
      assert(isValid, 422, '密码错误')
    }
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    const userId = user.userId
    res.send({ token, username, userId })//这里是返回token给客户端，可以加个username，这样就可以做到前端拿到用户名
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      // status: err.statusCode,
      message: err.message
    })
  })
}