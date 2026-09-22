var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const accountModel = require('../../model/accountModel');
const moment=require('moment')
const checkMiddleToken=require('../../middle/checkMiddleToken')
router.get('/account', checkMiddleToken,function(req, res, next) {
  console.log(req.user)
    accountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.json({
        code:'1001',
        msg:"读取失败",
        data:null
      })
      return
    }
  res.json({
    code:'0000',
    msg:"读取成功",
    data:data});
  })
})
router.get('/account/:id',checkMiddleToken ,(req, res) =>{
    let {id}=req.params
    accountModel.findById(id,(err,data)=>{
      if(err){
        res.json({
          code:'1004',
          msg:"读取失败",
          data:null
        })
        return
      }
    res.json({
      code:'0000',
      msg:"读取成功",
      data:data});
    })
  });
//更新数据
router.patch('/account/id',checkMiddleToken, (req, res) =>{
    let {id}=req.params
    accountModel.updateOne({id:id},req.body,(err,data)=>{
      if(err){
        res.json({
          code:'1005',
          msg:"更新失败",
          data:null
        })
        return
      }
      //由于此时的data是修改的数据条数之类的信息，要获得更新后的数据就再查询一次
      accountModel.findById(id,(req,res)=>{
        if(err){
            return res.json({
              code:'1004',
              msg:"读取失败",
              data:null
            })}
            res.json({
                code:'0000',
                msg:'更新成功',
                data:data
            })
      })
    })
})
  
router.post('/account', checkMiddleToken,(req, res) =>{

  accountModel.create({
    ...req.body,
    //修改time的值，因为设置的属性是Date
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err){
      res.json({
        code:'1002',
        msg:"创建失败",
        data:null
      })
      return
    }
    console.log(data)
      res.json({
        code:'0000',
        msg:'创建成功',
        data:data
      })
  })

  
});
router.delete('/account/:id',checkMiddleToken, (req, res) =>{
  let id=req.params.id
  accountModel.deleteOne({_id:id},(err,data)=>{
    if(err){res.json({
        code:'1003',
        msg:'删除失败',
        data:null})
      return
    }
   res.json({
    code:'0000',
    msg:'删除成功',
    data:null})

  })

});
module.exports = router;
