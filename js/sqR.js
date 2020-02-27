module.exports = function(sql){//sqlQueryResult
	return new Promise((resolve, reject) => {
		connection.query(sql, function (error, results, fields) {
			//这一条抛出错误的语句本应该是throw error，但是抛出错误后会直接duang掉
			//if(error)throw error
			if(error)resolve(error)
			resolve(results)
		})
	})
}