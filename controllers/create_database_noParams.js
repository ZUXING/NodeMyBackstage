module.exports = {
	'GET /CREATE%20DATABASE' : async (ctx, next) => {
		ctx.response.body = retJson(2,'无效的数据库名字。','')
		console.log(ctx.response.body)
	}
}
