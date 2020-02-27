module.exports = {
	'GET /select/:select' : async (ctx, next) => {
		queryResult = await sqR('SELECT * FROM `' + ctx.params.select + '`;')
		ctx.response.body = queryResult[2]
	}
}
