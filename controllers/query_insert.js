module.exports = {
	'GET /:db_name/INSERT%20INTO%20:tb_name?%20VALUES:ins_values' : async (ctx, next) => {
		//接收参数
		let db_name = decodeURI(ctx.params.db_name)
		let tb_name = decodeURI(ctx.params.tb_name)
		let tb_values = ''
		let ins_values = decodeURI(ctx.params.ins_values)
		//判断插入全部列还是部分列
		if(tb_name.slice(-1) == ')'){//插入部分列
			[tb_name,tb_values] = [tb_name.split('(')[0],'(' + tb_name.split('(')[1]]
		}else{//插入全部列
			tb_name = tb_name.split('(')[0]
		}
		//去掉撇号和列名前的空格
		if(tb_name.slice(-2) == '` '){//去掉空格、撇号
			tb_name = tb_name.slice(1,-2)
		}else if(tb_name.slice(-1) == '`'){//去掉撇号
			tb_name = tb_name.slice(1,-1)
		}else if(tb_name.slice(-1) == ' '){//去掉空格
			tb_name = tb_name.slice(0,-1)
		}else{//不需要去掉
		}

		//检查数据库是否存在
		queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.SCHEMATA where SCHEMA_NAME ="' + db_name + '";')
		if(queryResult[0].COUNT){//如果存在（COUNT为1）则数据库存在，然后判断表是否存在
			queryResult = await sqR('SELECT COUNT(*) AS "COUNT" FROM information_schema.TABLES where TABLE_NAME ="' + tb_name + '";')
			if(queryResult[0].COUNT){//如果存在（COUNT为1）则执行SQL语句
				//先使用库
				queryResult = await sqR('USE `' + db_name + '`;')
				//执行SQL语句
				let sqlStatement = 'INSERT INTO ' + tb_name + tb_values + ' VALUES ' + ins_values + ';'
				queryResult = await sqR(sqlStatement)
				ctx.response.body = retJson(0,'新记录已插入到`'+ tb_name + '`。','')
			}else{//不存在则提示创建数据表的语句
				ctx.response.body = retJson(1,'数据表`'+ tb_name + '`不存在，请先创建数据表。','CREATE TABLE `' + tb_name + '`;')
			}
		}else{//不存在则提示创建数据库的语句
			ctx.response.body = retJson(1,'数据库`'+ db_name + '`不存在，请先创建数据库。','CREATE DATABASE `' + db_name + '`;')
		}
		console.log(ctx.response.body)
	}
}