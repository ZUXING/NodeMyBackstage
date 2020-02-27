module.exports = {
	'GET /favicon.ico' : async (ctx, next) => {
		/*
		  对于favicon.ico，一个仅有后台->MySQL连接的
		  服务器不需要什么图标Logo之类的东西，所以对于
		  favicon.ico的请求干脆就什么也没有了
		*/
	}
}