module.exports = app => {
  /*  const router = require('express').Router()
   const mongoose = require('mongoose')
   // const Goods = mongoose.model('Good')
   // const Category = mongoose.model('Category')
   const Category = mongoose.model('Category')
 
   router.get('/goods/:id', async (req, res) => {
     const parent = await Category.findOne({
       name: '水果'
     })
     const cats = await Category.aggregate([
       { $match: { parent: parent._id } },
       {
         $lookup: {
           from: 'goods',
           localField: '_id',
           foreignField: 'categories',
           as: 'goodslist'
         }
       }
     ])
     res.send(cats)
   }) */


  app.use('/web/api', router)
}