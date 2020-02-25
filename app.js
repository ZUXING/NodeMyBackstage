//引用koa框架
const Koa = require('koa');
//引用koa-bodyparser表单解析
const bodyParser = require('koa-bodyparser');
//自动搜索js编写的页面
const controller = require('./koa_controller');
//
const app = new Koa();
//引用mysql库
var mysql = require('mysql');
// log request URL:
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});
// parse request body:
app.use(bodyParser());
// add controllers:
app.use(controller());
//MySQL连接配置
global.connection = require('./db_connect');
connection.connect();

app.listen(3000);
console.log('app started at port 3000...');