var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'class38_week3'
});
connection.connect();

////////////////////////////            INSERT INTO account         ///////////////////////////////////
var sql = `INSERT INTO account 
VALUES 
(101,10000),
(102,20000),
(103,30000),
(104,40000)`;
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("inserted into account table");
});

////////////////////////////            INSERT INTO account_changes         ///////////////////////////////////
var sql = `INSERT INTO account_changes  
VALUES 
(1, 101, 100,'2022-09-03', 'kpn'),
(2, 102, 200,'2022-09-03', 'kpn'),
(3, 103, 300,'2022-09-03', 'kpn'),
(4, 104, 400,'2022-09-03', 'kpn')`;
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("inserted into account_changes table");
});

connection.end();