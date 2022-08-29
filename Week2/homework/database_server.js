var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});
connection.connect();

////////////////////////////            authors         ///////////////////////////////////
var sql = `CREATE TABLE authors(author_no int PRIMARY KEY AUTO_INCREMENT, 
                                author_name VARCHAR(255),
                                university VARCHAR(255),
                                date_of_birth DATE, 
                                h_index int, 
                                Gender VARCHAR(6) NOT NULL CHECK (Gender IN ("Male", "Female")) )`
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('table authors created')
});
var sql = 'ALTER TABLE authors ADD mentor int'
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('FORGIN KEY added')
});

var sql = "INSERT INTO authors(author_name, university,date_of_birth, h_index, Gender,mentor) VALUES ?";
var values = [
    ['William Shakespeare', 'Amsterdam', '1990-01-01', 3, 'Male', 1],
    ['George Orwell', 'Groningen', '1990-01-01', 4, 'Female', 3],
    ['J.K. Rowling.', 'Leiden', '1990-01-01', 5, 'Male', 1],
    ['Ernest Hemingway', 'Maastricht', '1990-01-01', 6, 'Male', 2],
    ['William Faulkner.', 'Erasmus', '1990-01-01', 7, 'Male', 4],
    ['Ayn Rand', 'Utrecht', '1990-01-01', 9, 'Male', 5],
    ['James Joyce', 'Harderwijk', '1990-01-01', 6, 'Female', 5],
    ['J.D. Salinger', 'Harderwijk', '1990-01-01', 1, 'Female', 6],
    ['jan', 'Utrecht', '1990-01-01', 4, 'Male', 6],
    ['mark', 'Leiden', '1990-01-01', 9, 'Female', 4],
    ['lisa', 'Erasmus', '1990-01-01', 10, 'Female', 4],
    ['jaap', 'Maastricht', '1990-01-01', 4, 'Male', 6],
    ['pete', 'Groningen', '1990-01-01', 3, 'Female', 9],
    ['demian', 'Amsterdam', '1990-01-01', 7, 'Male', 12],
    ['john', 'Erasmus', '1990-01-01', 7, 'Male', 12]
];
connection.query(sql, [values], function (err) {
    if (err) throw err;
    console.log('authors inserted')
});
var sql = 'ALTER TABLE authors ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_no) '
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('FORGIN KEY added')
});

////////////////////////////            research_Papers         ///////////////////////////////////
var sql = `CREATE TABLE research_Papers(paper_id int PRIMARY KEY AUTO_INCREMENT, 
                                        paper_title VARCHAR(255), 
                                        conference int ,publish_date DATE )`
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table research_Papers created");
});

var sql = 'ALTER TABLE research_Papers ADD CONSTRAINT FOREIGN KEY (conference) REFERENCES research_Papers(paper_id)'
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log('FORGIN KEY added')
});

var sql = "INSERT INTO research_Papers(paper_title,publish_date) VALUES ?";
var values = [
    ['A', '1990-01-01'],
    ['B', '1990-01-01'],
    ['C', '1990-01-01'],
    ['D', '1990-01-01'],
    ['E ', '1990-01-01'],
    ['F', '1990-01-01'],
    ['G', '1990-01-01'],
    ['H', '1990-01-01'],
    ['I', '1990-01-01'],
    ['J', '1990-01-01'],
    ['K', '1990-01-01'],
    ['L', '1990-01-01'],
    ['M', '1990-01-01'],
    ['N', '1990-01-01'],
    ['O', '1990-01-01'],
    ['P', '1990-01-01'],
    ['Q', '1990-01-01'],
    ['R', '1990-01-01'],
    ['S ', '1990-01-01'],
    ['T', '1990-01-01'],
    ['U', '1990-01-01'],
    ['V', '1990-01-01'],
    ['W', '1990-01-01'],
    ['X', '1990-01-01'],
    ['Y', '1990-01-01'],
    ['Z', '1990-01-01'],
    ['AA', '1990-01-01'],
    ['AB', '1990-01-01'],
    ['AC', '1990-01-01'],
    ['AD', '1990-01-01']
];
connection.query(sql, [values], function (err) {
    if (err) throw err;
    console.log('research_Papers inserted')
});

////////////////////////////            authors_papers         ///////////////////////////////////
var sql = `CREATE TABLE authors_papers (auth_no int not null,
                                        pap_no int not null,
                                        constraint fk_auth_no foreign key(auth_no) references authors(author_no),
                                        constraint fk_pap_no foreign key(pap_no) references research_Papers(paper_id),
                                        primary key(auth_no,pap_no) )`
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table authors_papers created");
});

var sql = `insert into authors_papers 
VALUES 
(4,1),(1,8),(3,9),(12,9),(11,10),(1,10),(12,11),(2,11),(1,1),(1,2),(2,3),
(9,1),(10,2),(11,3),(11,4),(12,12),(12,22),(13,13),(10,14),(11,14),(11,15),
(2,4),(2,8),(10,8),(11,28),(11,29),(12,29),(14,10),(5,28),(14,1),(1,7),(2,7),
(3,1),(3,2),(4,3),(4,4),(5,1),(5,5),(6,3),(6,4),(7,1),(7,6),(14,12),(8,4),(10,15),
(12,15),(12,16),(13,16),(13,24),(14,21),(7,21),(7,26),(8,24),(8,25),(9,19),(9,29),
(10,3),(10,17),(11,18),(11,26),(12,19),(14,24),(3,3),(4,17),(4,18),(5,2),(5,4),(6,6),
(6,15),(7,17),(7,16),(8,20),(8,14),(9,11),(10,12),(11,13),(11,6),(12,1),(12,2),(13,1),
(13,17),(1,24),(13,21),(4,24),(7,10),(7,11),(8,23),(8,29),(9,17),(9,27),(10,30),(10,28)`;
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Foreign key");
});

/////////////////////////              MySQL exercises                /////////////////////////                    

// Exercise 3:1 Joins   ___________ prints names of all authors and their corresponding mentors.
var sql = `SELECT b.author_name,a.author_name 
            FROM authors a 
            JOIN authors b 
             ON b.mentor=a.author_no`;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//  Exercise 3:2 Joins  ___________ prints all columns of authors and their published paper_title
var sql = `SELECT auths.author_name, res.paper_title 
            FROM authors auths 
            LEFT JOIN authors_papers ap 
             ON auths.author_no=ap.auth_no 
            LEFT JOIN research_Papers res 
             ON ap.pap_no=res.paper_id `;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//Exercise 4:1 Aggregate Functions  ___________ All research papers and the number of authors that wrote that pape
var sql = `SELECT res.paper_title, count( auths.author_name) 
            FROM authors auths 
            JOIN authors_papers ap 
             ON auths.author_no=ap.auth_no 
            JOIN research_Papers res 
             ON ap.pap_no=res.paper_id 
            GROUP BY res.paper_title `;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//Exercise 4:2 Aggregate Functions  ___________ Sum of the research papers published by all female authors.
var sql = `SELECT COUNT(res.paper_title) AS research_papers_published 
            FROM authors auths 
            JOIN authors_papers ap 
             ON auths.author_no=ap.auth_no 
            JOIN research_Papers res 
             ON ap.pap_no=res.paper_id 
            WHERE auths.Gender = "Female" `;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//Exercise 4:3 Aggregate Functions  ___________ Average of the h-index of all authors per university.
var sql = `SELECT university AS university, AVG(h_index) AS Average
            FROM authors auths 
            GROUP BY university  `;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//Exercise 4:4 Aggregate Functions  ___________ Sum of the research papers of the authors per university.
var sql = `SELECT auths.university,COUNT(res.paper_id) AS research_papers_published 
            FROM authors auths
            JOIN authors_papers ap 
             ON auths.author_no=ap.auth_no  
            JOIN research_Papers res 
             ON ap.pap_no=res.paper_id
            GROUP BY university`;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

//Exercise 4:5 Aggregate Functions  ___________ Minimum and maximum of the h-index of all authors per university.
var sql = `SELECT auths.university, max(auths.h_index) AS maximum_h_index, min(auths.h_index) AS Minimum_h_index 
            FROM authors auths
            JOIN authors_papers ap 
             ON auths.author_no=ap.auth_no
            JOIN research_Papers res 
             ON ap.pap_no=res.paper_id
            GROUP BY university `;
connection.query(sql, (err, res) => {
    if (err) { throw err }
    console.log(res)
});

connection.end();