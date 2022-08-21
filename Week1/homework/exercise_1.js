var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});
connection.connect();

//--------------------------------------------------------- Exercise 1: Create and insert queries ---------------------------------------------------------

// DROP Database
var sql = "DROP TABLE Invitee,Room,Meeting";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
});

// ----------------------------- create tables -----------------------------

// create Invitee table
var sql = 'CREATE TABLE Invitee(invitee_no int AUTO_INCREMENT, invitee_name  VARCHAR(255),invited_by VARCHAR(255), PRIMARY KEY (invitee_no))'
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('table Invitee created')
});

// create Room table
var sql = 'CREATE TABLE Room(room_no int AUTO_INCREMENT, room_name VARCHAR(255),floor_number int, PRIMARY KEY (room_no))'
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('table Room created')
});

// create Meeting table
var sql = 'CREATE TABLE Meeting(meeting_no int AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME,room_no int, PRIMARY KEY (meeting_no))'
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('table Meeting created')
});

// ----------------------------- insert queries -----------------------------

// insert into Invitee table
var sql = "INSERT INTO Invitee(invitee_name, invited_by) VALUES ?";
var values = [
    ['demian', 'pete'],
    ['john', 'demian'],
    ['mark', 'jan'],
    ['jan', 'mark'],
    ['pete', 'john']
];
connection.query(sql, [values], function (err) {
    if (err) throw err;
    console.log('invitee inserted')
});

// insert into Room table
var sql = "INSERT INTO Room (room_name, floor_number) VALUES ?";
var values = [
    ['room', 1],
    ['room', 2],
    ['room', 3],
    ['room', 4],
    ['room', 5]
];
connection.query(sql, [values], function (err) {
    if (err) throw err;
    console.log('Room inserted')
});

// insert into Meeting table
var sql = "INSERT INTO Meeting(meeting_title, starting_time, ending_time, room_no) VALUES ?";
var values = [
    ['interview', '2019-01-01 22:01:01', '2019-01-01 22:01:01', 1],
    ['interview', '2019-01-01 22:01:01', '2019-01-01 22:01:01', 2],
    ['interview', '2019-01-01 22:01:01', '2019-01-01 22:01:01', 3],
    ['interview', '2019-01-01 22:01:01', '2019-01-01 22:01:01', 4],
    ['interview', '2019-01-01 22:01:01', '2019-01-01 22:01:01', 5]
];
connection.query(sql, [values], function (err) {
    if (err) throw err;
    console.log('Meeting inserted')
});

connection.end();