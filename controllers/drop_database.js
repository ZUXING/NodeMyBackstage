module.exports = {
	'GET /DROP%20DATABASE%20:db_name' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)

		//先检查有没有IF EXISTS子句
		if(db_name.slice(0,10) != 'IF EXISTS '){
			//先去掉撇号
			if(db_name.slice(0,1) == '`'){
				db_name = db_name.slice(1,-1)
			}
			//检查数据库是否存在
			queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
			if(queryResult[0].COUNT){//如果存在（COUNT为0）则删除	
				queryResult = await sqR('DROP DATABASE `' + db_name + '` ;')
				ctx.response.body = retJson(0,'数据库`'+ db_name + '`被删掉了。','DROP DATABASE `' + db_name + '`;')
			}else{//不存在也不用删除了
				ctx.response.body = retJson(1,'找不到`'+ db_name + '`。','')
			}
		}else{//有IF EXISTS子句
			db_name = db_name.slice(10)
			//先去掉撇号
			if(db_name.slice(0,1) == '`'){
				db_name = db_name.slice(1,-1)
			}
			//由于是IF EXISTS，所以不论如何也要删除
			queryResult = await sqR('DROP DATABASE IF EXISTS `' + db_name + '` ;')
			ctx.response.body = retJson(0,'数据库`'+ db_name + '`不存在。','DROP DATABASE IF EXISTS `' + db_name + '` ;')
		}
		console.log(ctx.response.body)
	}
}