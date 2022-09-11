var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'class38_week3'
});
connection.connect();

////////////////////////////            account table         ///////////////////////////////////
var sql = `CREATE TABLE account(
    account_number int PRIMARY KEY AUTO_INCREMENT, 
    balance int
    )`
connection.query(sql, (err, res) => {
if (err) { throw err }
console.log('table account created')
});

////////////////////////////            account_changes table         ///////////////////////////////////
var sql = `CREATE TABLE account_changes(change_number int PRIMARY KEY AUTO_INCREMENT, 
    account_number int,
    amount int,
    changed_date DATE, 
    remark  VARCHAR(255)
    )`
connection.query(sql, (err, res) => {
if (err) { throw err }
console.log('table account_changes created')
});
var sql = 'ALTER TABLE account_changes ADD CONSTRAINT FOREIGN KEY (account_number) REFERENCES account(account_number) '
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('FORGIN KEY added')
});

connection.end();