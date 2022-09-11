var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'class38_week3'
});
connection.connect();

connection.beginTransaction(function (err) {
    if (err) { throw err; }
    connection.query(' UPDATE account SET balance= balance-1000 WHERE account_number=101;', function (err, result) {
        if (err) {
            connection.rollback(function () {
                throw err;
            });
        }

        connection.query(' UPDATE account SET balance= balance+1000 WHERE account_number=102;', function (err, result) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                });
            }

            connection.query(`INSERT INTO account_changes VALUES 
                (5, 101, 1000,'2022-09-03', 'lidl'),
                ( 6,102, 1000,'2022-09-03', 'Jumbo')`, function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }

                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        });
                    }
                    console.log('success!');
                    connection.end();
                });
            });
        });
    });
});