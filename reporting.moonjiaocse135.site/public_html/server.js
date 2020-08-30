// app.js file
var express = require('express');

var jsonServer = require('json-server');

var bodyParser = require('body-parser')
//var server = express()
const session = require('express-session');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Returns an Express server
var server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(session({secret:'secretdoor'}))
// server.use(express.urlencoded({
//     extended: true
// }))
var mysql = require('mysql');

//setup datanbase
var db = mysql.createConnection({
    host: 'db-mysql-nyc1-18805-do-user-7334883-0.a.db.ondigitalocean.com',
    user: 'moon',
    password: 'ethe274ugtav1e59',
    database: 'cse135_hw3',
    port: 25060
})
db.connect();



//Get a specific entry in the browser table that matches the specified ID
server.post('/login', urlencodedParser, function (req, res) {

    if (req.body['username'] && req.body['password']) {
        let sql = `SELECT password FROM users WHERE username='${req.body['username']}' OR email='${req.body['username']}'`
        db.query(sql, function (err, results) {
            if (err){
                res.status(400).json(err)
            } else if(!results[0]){
                res.status(400).json({message:"cannot find user"})
            } else{
                if(results[0]['password'] == req.body['password']){
                    res.redirect('https://reporting.moonjiaocse135.site/index.html');
                    res.status(200)
                }else{
                    res.status(400).json({message: "wrong password"})
                }

            }
            
        })
    } else {
        res.status(400).json("empty fields")
    }
})

// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(5000);