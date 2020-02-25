let sqR = function(sql){//sqlQueryResult
	return new Promise((resolve, reject) => {
		connection.query(sql, function (error, results, fields) {
			if(error)throw error
			resolve(results)
		})
	})
}

module.exports = {
	'GET /:select' : async (ctx, next) => {

		queryResult = await sqR('select * from `' + ctx.params.select + '`')
		ctx.response.body = queryResult
	}
}
