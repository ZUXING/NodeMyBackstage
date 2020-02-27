module.exports = {
	'GET /runsql/:sqlStatement' : async (ctx, next) => {
		let sqlStatement = decodeURI(ctx.params.sqlStatement)
		console.log(sqlStatement)
		queryResult = await sqR(sqlStatement)
		ctx.response.body = queryResult
		console.log('有用户直接执行了SQL语句。')
	}
}
