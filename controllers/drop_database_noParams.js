module.exports = {
	'GET /DROP%20DATABASE%20' : async (ctx, next) => {
		ctx.response.body = retJson(2,'无效的数据库名字。','')
		console.log(ctx.response.body)
	}
}