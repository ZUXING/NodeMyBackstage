var mysql = require('mysql');
const connection = require('./config');

 
connection.connect();
 
connection.query('SELECT * from tb_article', function (error, results, fields) {
  if (error) throw error;
  for(r of results){
    console.log(r);
  }
});