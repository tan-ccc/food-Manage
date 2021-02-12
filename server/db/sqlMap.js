// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(nickname,username,password,type) values (?, ?, ?, 1)'
    }
}
module.exports = sqlMap;