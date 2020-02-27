module.exports = {
	'GET /:db_name' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)
		//检查数据库是否存在
		queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
		if(queryResult[0].COUNT){//如果存在（COUNT为0）则显示表内容
			//先使用库
			queryResult = await sqR('USE `' + db_name + '`;')
			//列出所有表
			queryResult = await sqR('SHOW TABLES;')
			ctx.response.body = queryResult
		}else{//不存在则提示创建数据库的语句
			ctx.response.body = retJson(1,'数据库`'+ db_name + '`不存在，请先创建数据库。','CREATE DATABASE `' + db_name + '`;')
		}
		console.log(ctx.response.body)
	}
}
