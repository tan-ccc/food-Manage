// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(nickname,username,password,type) values (?, ?, ?, 1)'
    },
    goods:{
        addgoods: 'insert into goods(name,time,price,des,img) values (?, ?, ?, ?, ?)'
    }
}
module.exports = sqlMap;