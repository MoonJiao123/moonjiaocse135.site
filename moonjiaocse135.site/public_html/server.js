// app.js file
var express = require('express');

var jsonServer = require('json-server');

var bodyParser = require('body-parser')

var fs = require('fs');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
server.get('/browsers', function (req, res) {
    fs.readFile('myjsonfile.json', 'utf8', jsonParser, function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj.table.push({ id: 2, square: 3 }); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
        }
    });
    res.json({ msg: 'hello' })
})
server.post('/browsers', jsonParser, function (req, res) {
    console.log("body" + req.body)
    if (req.body) {

        filename = req.body['metricName'] + '.txt';
        console.log(filename)
        fs.open(filename, 'r', function (err, fd) {
            if (err) {
                console.log("creat file")
                fs.writeFile(filename, JSON.stringify(req.body)+'\n' , 'utf8', function(err) {
                    if (err) throw err;
                    res.status(200).json(req.body)
                });
            } else {
                console.log("file exosts append to file")
                fs.appendFile(filename, JSON.stringify(req.body) +'\n', 'utf8', function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                    res.status(200).json(req.body)
                });
            }
        })
        
    } else {
        res.status(400).json("data not sent corrently.")

    }

})

// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(3000);