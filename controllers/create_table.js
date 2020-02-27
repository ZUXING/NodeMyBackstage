module.exports = {
	'GET /:db_name/CREATE%20TABLE%20:tb_name?(:cols?' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)
		//koa可能不允许在params参数后面匹配字符，所以需要slice去掉撇号
		let tb_name = decodeURI(ctx.params.tb_name)
		if(tb_name.slice(0,1) == '`'){//有撇号
			tb_name = tb_name.slice(1,-1)
		}
		let cols = '(' + decodeURI(ctx.params.cols)

		//检查数据库是否存在
		queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
		if(queryResult[0].COUNT){//如果存在（COUNT为1）则数据库存在，然后判断表是否存在
			queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.TABLES where TABLE_NAME ="' + tb_name + '";')
			if(queryResult[0].COUNT){//如果存在（COUNT为1）则执行SQL语句
				ctx.response.body = retJson(1,'数据表`'+ tb_name + '`已存在。','')
			}else{//不存在则创建数据表
				//先使用库
				queryResult = await sqR('USE `' + db_name + '`;')
				//执行SQL语句
				queryResult = await sqR('CREATE TABLE `' + tb_name + '`' + cols + ';')
				ctx.response.body = retJson(0,'数据表'+ tb_name + '已创建。','CREATE TABLE `' + tb_name + '`' + cols + ';')
			}
		}else{//不存在则提示创建数据库的语句
			ctx.response.body = retJson(1,'数据库`'+ db_name + '`不存在，请先创建数据库。','CREATE DATABASE `' + db_name + '`;')
		}
		console.log(ctx.response.body)
	}
}
