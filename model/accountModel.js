const mongoose=require('mongoose')

//创建文档的结构对象 
let accountSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },time:Date,
    type:{
        type:Number,
        default:-1
    },account:{
        type:Number,
        required:true
    },remarks:String
})
//创建模型对象，对文档操作的封装对象
let accountModel = mongoose.model('account', accountSchema)
module.exports=accountModel