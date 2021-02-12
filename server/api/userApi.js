var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
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

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.age], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 获取用户接口
router.get('/',function (req,res) {
    var sql = 'SELECT * FROM user';
    var str = " ";
    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
        }
        str = JSON.stringify(result);
        console.log(result);  //数据库查询结果返回到result中
    
    });
    res.send(str);  //服务器响应请求

    // res.send('Hello,myServer');  //服务器响应请求
});
module.exports = router;