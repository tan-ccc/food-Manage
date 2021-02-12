const userApi = require('./api/userApi')
var express = require('express');   //引入express模块
var mysql = require('mysql');     //引入mysql模块
var multer=require('multer')
const path = require('path')
const fs=require('fs');
const moment=require('moment')
var app = express();        //创建express的实例
const uploader=multer({
    dest:path.join(path.dirname(__dirname),'public','imgs')
})
var $sql = require('./db/sqlMap');
let uploadDir=`../public/upload/${moment().format('YYYYMMDD')}`;
fs.mkdirSync(uploadDir,{
    recursive:true  //递归创建目录
});
//multer配置
let upload=multer({dest:uploadDir});
app.use(upload.any())
const bodyParser = require('body-parser')
app.all('', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    next();
  });
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'admin',
    password:'123456',
    database:'user'
});
connection.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
var sql = 'SELECT * FROM user';
var str = " ";
connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str = JSON.stringify(result);
    console.log(result);  //数据库查询结果返回到result中
 
});
//获取用户表接口
app.get('/',function (req,res) {
    res.send(str);  //服务器响应请求

    // res.send('Hello,myServer');  //服务器响应请求
});
// 增加管理员接口
app.post('/user/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    connection.query(sql, [params.nickname,params.username, params.password], function(err, result) {
        if (err) {
            console.log(err);
            res.send('0');  //服务器响应请求
        }
        if (result) {
            jsonWrite(res, result);
            res.send('1');  //服务器响应请求
        }
    })
});
//管理员登录接口
app.post('/user/login',(req,res)=>{
    var params = req.body;
    connection.query(`select * from user where username='${params.username}'`,(err,data)=>{
        if(err){
            res.send({err:1,msg:'链接数据库失败'});
            res.end();
        }else{
            if(data.length==0){
                res.send({err:1,msg:'该用户不存在'});
                res.end();
            }else{
                if(data[0].password==params.password){
                    res.send({err:0,userinfo:data[0]});
                    res.end();
                }else{
                    res.send({err:1,msg:'密码错误,请重试'});
                    res.end();
                }
            }
        }
    })
  })
//   资料修改接口
app.put('/user/edit',(req,res)=>{
   var params=req.body
   var modsql = 'UPDATE user SET nickname = ?,username = ?,password = ? WHERE id = ?';
   console.log(params)
   var modsqlparams=[params.nickname,params.username,params.password,params.id]
connection.query(modsql,modsqlparams,function (err,result) {
    if(err){
        console.log('err');
        res.send({err:1,msg:'修改失败'});
        return;
    }
    console.log('--------------------------------');
    console.log(result);
    res.send({err:0,msg:'修改成功'});
})
}
)
//上传图片
app.post('/upload',function(req,res){
    //获取标题
    if (req.body.Ttitle!=''){
      var name=req.body.Ttitle;
    }else {
      var name=req.files[0].originalname.split(".")[0];
    }
    console.log(name)
    console.log(req.files)
    let file=req.files[0].filename+path.extname(req.files[0].originalname); //拼接   重新定义的文件名+尾缀
    let newfile=req.files[0].path+path.extname(req.files[0].originalname);  // 把上传的图片文件重命名-->添加尾缀
    console.log(req.files[0].path);  
     let picPath=`http://localhost:3000/upload/${moment().format('YYYYMMDD')}/`+file; //之后用于存储在数据库的路径
    fs.rename(req.files[0].path,newfile,function (err) {  // 将上传的文件重命名   因为上传之后req.files[0].path是没有尾缀的
      if (err){
        console.log('上传失败'+err)
        res.status(400).send({flag:true,msg:"失败"})
      }else{
          console.log("上传成功")
          res.status(200).send({flag:true,msg:"成功",site:picPath})  //将数据返回给前端
      }
    })
    })
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// // 后端api路由
// app.use('/api/user', userApi)
// connection.end();
app.listen(3000,function () {    //监听3000端口
    console.log('Server running at 3000 port');
});