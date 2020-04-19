// 这里是admin后端的路由接口
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  // 这个包是用来处理报错的npm可以搜：http-assert
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')


  // express 的子路由
  const router = express.Router({
    mergeParams: true
  })

  // 封装一个中间键:登录校验模块
  const authMiddleware = require('../../middleware/auth')

  // 封装一个中间键：资源校验
  const resourceMiddleware = require('../../middleware/resource')

  // ===================开始
  /* 
    改造：使用通用接口,原先请求的模型，是直接引入，然后再进行调用，现在使用统一的调用，不需要再进行引用模型。改造后需要用req.Model来调用，方法中的路径也无须加，下方的接口会自行判断，ta属于哪个模型的哪个方法
  */
  //增加
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  /* 
  // 加个populate：可以把parent关联的东西变成对象输出，而非单输出ta的id
      queryOptions：
      设置一个选项setOptions，然后定义queryOptions，判断模型名字是否等于Category，如果等于，就给populate赋值parent
    */
  router.get('/', authMiddleware(), async (req, res) => {
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

  // ================结束


  // 自动寻找对应的模型
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 定义upload的接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //1. 根据用户名找数据中的用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    //2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })//这里是返回token给客户端，可以加个username，这样就可以做到前端拿到用户名
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}