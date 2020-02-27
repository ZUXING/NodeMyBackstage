module.exports = {
	'GET /CREATE%20DATABASE%20:db_name' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)
		//koa可能不允许在params参数后面匹配字符，所以需要slice去掉撇号
		if(db_name.slice(0,1) == '`'){
			db_name = db_name.slice(1,-1)
		}
		console.log(db_name)
		
		//检查数据库是否存在
		queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
		if(queryResult[0].COUNT){//如果存在（COUNT为0）则提示已存在
			ctx.response.body = retJson(1,'数据库`'+ db_name + '`已存在。','')
		}else{//不存在则创建数据库
			queryResult = await sqR('CREATE DATABASE `' + db_name + '` ;')
			ctx.response.body = retJson(0,'数据库`'+ db_name + '`已创建。','CREATE DATABASE `' + db_name + '`;')
		}
		console.log(ctx.response.body)
	}
}
