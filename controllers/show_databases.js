module.exports = {
	'GET /SHOW%20DATABASES' : async (ctx, next) => {
		queryResult = await sqR('SHOW DATABASES;')
		ctx.response.body = queryResult
	}
}
