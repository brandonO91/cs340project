var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_johnssta',
  password        : '3480',
  database        : 'cs340_johnssta'
});
module.exports.pool = pool;
