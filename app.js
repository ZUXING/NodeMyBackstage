//引用koa框架
const Koa = require('koa');
//引用koa-bodyparser表单解析
const bodyParser = require('koa-bodyparser');
//自动搜索js编写的页面
const controller = require('./koa_controller');
//CORS
const cors = require('koa2-cors')
//引用mysql库
const mysql = require('mysql');
//新koa2实例
const app = new Koa();
//CORS
app.use(cors({
	origin: '*',
	methods:['GET','POST'],
	credentials: false,
	allowHeaders: ['Content-Type','Content-Length','Authorization','Accept','X-Requested-With']
}));
// parse request body:
app.use(bodyParser());
// add controllers:
app.use(controller());

// log request URL:
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

//MySQL连接配置
global.connection = require('./js/db_connect');
connection.connect();
//引用sqlQueryResult和returnJson
global.sqR = require('./js/sqR.js');
global.retJson = require('./js/retJson.js');

app.listen(1019);
console.log('app started at port 1019...');

/*

啥时候开学能去找我的小丫头呢……

*/