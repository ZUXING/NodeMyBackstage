module.exports = {
	'GET /:db_name/SELECT%20:select?%20FROM%20:from?%20WHERE%20:where' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)
		//判断SELECT小节是否有撇号，防止撇号和星号冲突
		let select = decodeURI(ctx.params.select)
		if(select.slice(0,1) == '`'){//有撇号
			select = select.slice(1,-1)
		}
		let from = decodeURI(ctx.params.from).slice(1,-1)
		let where = decodeURI(ctx.params.where)

		//检查数据库是否存在
		queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
		if(queryResult[0].COUNT){//如果存在（COUNT为1）则数据库存在，然后判断表是否存在
			queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.TABLES where TABLE_NAME ="' + from + '";')
			if(queryResult[0].COUNT){//如果存在（COUNT为1）则执行SQL语句
				//先使用库
				queryResult = await sqR('USE `' + db_name + '`;')
				//执行SQL语句
				if(select != '*'){
					select = '`' + select + '`'
				}
				let sqlStatement = 'SELECT ' + select + ' FROM `' + from + '` WHERE ' + where + ';'
				queryResult = await sqR(sqlStatement)
				ctx.response.body = queryResult
			}else{//不存在则提示创建数据表的语句
				ctx.response.body = retJson(1,'数据表`'+ from + '`不存在，请先创建数据表。','CREATE TABLE `' + from + '`;')
			}
		}else{//不存在则提示创建数据库的语句
			ctx.response.body = retJson(1,'数据库`'+ db_name + '`不存在，请先创建数据库。','CREATE DATABASE `' + db_name + '`;')
		}
		console.log(ctx.response.body)
	}
}