var express = require('express');
var router = express.Router();
const userModel=require('../../model/userModel')
const md5=require('md5')
router.get('/reg',(req,res)=>{
    res.render('auth/reg')
})
router.post('/reg',(req,res)=>{
    // res.send(req.body)
    userModel.create({...req.body,password:md5(req.body.password)},(err,data)=>{
        if(err){
            res.status(500).send('注册失败')
            return
        }
        res.render('success',{msg:'注册成功',url:'/login'})
    })
})
router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.post('/login',(req,res)=>{
    //查询数据库
    let {username,password}=req.body
    userModel.findOne({username:username,password:md5(password)},(err,data)=>{
        if(err){
            res.status(500).send('登录失败')
            return
        }
        if(!data){
            return res.send('账号或密码错误')
        }
        req.session.username=data.username
        req.session._id=data._id
        console.log(data)
        res.render('success',{msg:'登陆成功',url:'/account'})
    })
    
    // res.render('auth/login')
})
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})
module.exports = router;
