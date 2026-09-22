var express = require('express');
var router = express.Router();
const accountModel = require('../../model/accountModel');
const moment=require('moment')

const checkMiddle=require('../../middle/checkMiddle')
/* GET home page. */
//首页重定向
router.get('/',(req,res)=>{
  res.redirect('/account')
})
router.get('/account', checkMiddle,function(req, res, next) {
  // const accounts=db.get('accounts').value()
  // res.render('list',{accounts:accounts});

  accountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.status(500).send('读取失败')
      return
    }console.log(data)
    
  res.render('list',{accounts:data,moment:moment});
  })
  
});
router.get('/account/create',checkMiddle, function(req, res, next) {
  res.render('create');
});
router.post('/account',checkMiddle, (req, res) =>{
  accountModel.create({
    ...req.body,
    //修改time的值，因为设置的属性是Date
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err){
      res.sendStatus=500;
      return
    }
    console.log(data)
      res.render('success',{msg:'添加成功~',url:'/account'})
  })

  
});
router.get('/account/:id',checkMiddle, (req, res) =>{
  let id=req.params.id
  // db.get('accounts').remove({id:id}).write()
  // res.render('success',{msg:'删除成功~',url:'/account'})

  accountModel.deleteOne({_id:id},(err,data)=>{
    if(err){res.status(500).send('删除失败')
      return
    }
   res.render('success',{msg:'删除成功~',url:'/account'})

  })

});
module.exports = router;
