// 这里是admin后端的路由接口
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  // 这个包是用来处理报错的npm可以搜：http-assert
  const assert = require('http-assert')
  // const cartListJSON = require('../../db/cartList.json')
  const Cart = require('../../models/Cart')
  const Good = require('../../models/Good')
  const Order = require('../../models/Order')
  const User = require('../../models/User')


  // express 的子路由
  const router = express.Router({
    mergeParams: true
  })

  // 封装一个中间键:登录校验模块
  const authMiddleware = require('../../middleware/auth')

  // 封装一个中间键：资源校验
  const resourceMiddleware = require('../../middleware/resource')

  // ===================通用开始
  /* 
    改造：使用通用接口,原先请求的模型，是直接引入，然后再进行调用，现在使用统一的调用，不需要再进行引用模型。改造后需要用req.Model来调用，方法中的路径也无须加，下方的接口会自行判断，ta属于哪个模型的哪个方法
  */
  //创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 加个populate：可以把parent关联的东西变成对象输出，而非单输出ta的id
  // queryOptions：
  // 设置一个选项setOptions，然后定义queryOptions，判断模型名字是否等于Category，如果等于，就给populate赋值parent

  /* 资源列表 */
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 根据ID获取详细信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //根据id，进行修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 根据id，进行删除操作
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })

  // ================通用结束

  // 加入购物车start
  app.post('/admin/api/addcart', async (req, res) => {
    let { userId, goodsId, goodsNum } = req.body
    const item = await Good.findById(goodsId)
    if (item.amount <= 0) {
      assert(item.amount, 422, '库存不足，添加失败')
    } else if (item.amount > 0) {
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
        const model = await Cart.findOneAndUpdate({ goodsId }, {
          goodsNum: Num
        }, { new: true })
      }
    }

  })
  // 获取购物车信息
  app.get('/admin/api/cart', async (req, res) => {
    const model = await Cart.find()
    res.send(model)
  })
  // 删除购物车信息
  app.post('/admin/api/delcart', async (req, res) => {
    await Cart.findByIdAndRemove(req.body)
    res.send({ success: true })
  })
  // 购物车end

  // 订单start
  // 生成订单
  app.post('/admin/api/order', async (req, res) => {
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
  app.get("/admin/api/order", async (req, res) => {
    const model = await Order.find()
    res.send(model)
  })
  // 根据ID获取订单详情
  app.get('/admin/api/order/:id', async (req, res) => {
    const item = await Order.findById(req.params.id)
    res.send(item)
  })
  // ========================订单end

  // search搜索
  app.post('/admin/api/search', async (req, res) => {
    let name = req.body
    const model = await Good.findOne(name)
    res.send(model)
  })

  // 自动寻找对应的模型
  app.use('/admin/api/rest/:resource', resourceMiddleware(), router)

  // 定义upload的接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  // 管理员登录
  /*  app.post('/admin/api/login', async (req, res) => {
     const { username, password } = req.body
     const AdminUser = require('../../models/AdminUser')
     //1. 根据用户名找数据中的用户
     const user = await AdminUser.findOne({ username }).select('+password')
     assert(user, 422, '用户不存在')
 
     //2.校验密码
     const isValid = require('bcrypt').compareSync(password, user.password)
     assert(isValid, 422, '密码错误')
 
     // 3.返回token
     const token = jwt.sign({ id: user._id }, app.get('secret'))
     res.send({ token, username })//这里是返回token给客户端，可以加个username，这样就可以做到前端拿到用户名
   }) */
  //用户登录
  app.post('/admin/api/login', async (req, res) => {
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

  // 获取用户的积分
  app.post('/admin/api/point', async (req, res) => {
    const username = req.body
    const model = await User.findOne(username)
    res.send(model.point)
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      // status: err.statusCode,
      message: err.message
    })
  })
}