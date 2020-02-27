var mysql = require('mysql');

var db_connect = mysql.createConnection({
    database: '', // 使用哪个数据库
    user: 'root', // 用户名
    password: '', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
});

module.exports = db_connect;