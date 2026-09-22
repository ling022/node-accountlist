var express = require('express');
var router = express.Router();
const userModel=require('../../model/userModel')
const {secret}=require('../../config/config')
const md5=require('md5')
const jwt=require('jsonwebtoken')

router.post('/login',(req,res)=>{
    //查询数据库
    let {username,password}=req.body
    userModel.findOne({username:username,password:md5(password)},(err,data)=>{
        if(err){
            res.json({
                code:'2001',
                msg:'读取失败',
                data:null
            })
            return
        }
        if(!data){
            return res.json({
                code:'2002',
                msg:'用户名或密码错误',
                data:null
            })
        }
        const token=jwt.sign({username:data.username,_id:data._id},secret,{expiresIn:60*60*24*7})
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
    })
})

module.exports = router;
