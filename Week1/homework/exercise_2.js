var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
});
connection.connect();

//--------------------------------------------------------- Exercise 2 : Select queries on the "world" database ---------------------------------------------------------

//What are the names of countries with population greater than 8 million?
var sql = "SELECT Name FROM country WHERE Population > 8000000";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What are the names of countries that have “land” in their names?
var sql = "SELECT Name FROM country WHERE Name LIKE '%land%' ";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What are the names of the cities with population in between 500,000 and 1 million?
var sql = "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 10000000";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What's the name of all the countries on the continent ‘Europe’?
var sql = "SELECT Name FROM country WHERE continent ='Europe' ";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//List all the countries in the descending order of their surface areas.
var sql = "SELECT Name FROM country ORDER BY SurfaceArea DESC";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What are the names of all the cities in the Netherlands?
var sql = "SELECT Name FROM city WHERE CountryCode='NLD'";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What is the population of Rotterdam?
var sql = "SELECT population FROM city WHERE Name='Rotterdam'";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What's the top 10 countries by Surface Area?
var sql = "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What's the top 10 most populated cities?
var sql = "SELECT Name FROM city ORDER BY Population DESC LIMIT 10";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

//What is the population number of the world?
var sql = "SELECT SUM(Population) FROM country ";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});

connection.end();