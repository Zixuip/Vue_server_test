// 这里是admin后端的路由接口
module.exports = app => {
  const express = require('express')
  // express 的子路由
  const router = express.Router({
    mergeParams: true
  })

  // ===================分类区开始
  /* 
    改造：使用通用接口,原先请求的模型，是直接引入，然后再进行调用，现在使用统一的调用，不需要再进行引用模型。改造后需要用req.Model来调用，方法中的路径也无须加，下方的接口会自行判断，ta属于哪个模型的哪个方法
  */
  //分类的增加
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 分类的获取   加个populate：可以把parent关联的东西变成对象输出，而非单输出ta的id
  router.get('/', async (req, res) => {
    /* 
      queryOptions：
      设置一个选项setOptions，然后定义queryOptions，判断模型名字是否等于Category，如果等于，就给populate赋值parent
    */
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 根据分类的ID的获取详细信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //根据分类的id，进行修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 根据分类的id，进行删除操作
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })

  // ================分类区结束



  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 定义upload的接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}