/* 
  用express来做后端接口
*/
const express = require('express')
const app = express()

// 安装并使用跨域工具 cors
app.use(require('cors')())
// 让后台客户端识别json
app.use(express.json())

// 创建数据库连接
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/vue_pro', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true
})

// 创建Good 商品模型
const Good = mongoose.model('Good', new mongoose.Schema({
  name: { type: String },
  body: { type: String }
}))



app.get('/', async (req, res) => {
  res.send('index')
})

// 新增商品
app.post('/api/goods', async (req, res) => {
  const goods = await Good.create(req.body)
  res.send(goods)
})

// 显示商品列表
app.get('/api/goods', async (req, res) => {
  const goods = await Good.find()
  res.send(goods)
})

// 删除商品
app.delete('/api/goods/:id', async (req, res) => {
  await Good.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

// 商品详情
app.get('/api/goods/:id', async (req, res) => {
  const good = await Good.findById(req.params.id)
  res.send(good)
})

// 修改商品详情
app.put('/api/goods/:id', async (req, res) => {
  const good = await Good.findByIdAndUpdate(req.params.id, req.body)
  res.send(good)
})

app.listen(3000, () => {
  console.log('http://localhost:3000/');
})