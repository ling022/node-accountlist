module.exports=function(success,error){
    if(typeof error!=='function'){
        error=()=>{
            console.log('连接失败')
        }
    }
const {dbhost,dbport,dbname}=require('../config/config')
//导入mongoose
const mongoose=require('mongoose')
//连接服务
mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)
mongoose.connection.on('open',()=>{
    success()
})
mongoose.connection.on('error',()=>{
    // console.log('连接失败')
    error()
})
mongoose.connection.on('close',()=>{
    // console.log('关闭连接')
})
}