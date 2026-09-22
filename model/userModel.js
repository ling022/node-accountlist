const mongoose=require('mongoose')

//创建文档的结构对象 
let userSchema = new mongoose.Schema({
    username: String,
    password: String
})
//创建模型对象，对文档操作的封装对象
let userModel = mongoose.model('user', userSchema)
module.exports=userModel