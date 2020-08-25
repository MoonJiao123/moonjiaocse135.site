// app.js file
var express = require('express');

var jsonServer = require('json-server');

var bodyParser = require('body-parser')

var fs = require('fs');
var glob = require("glob")
const readline = require('readline');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

function getOneFile(filename) {
    var file = filename + '.txt'
    console.log(file)

    const readInterface = readline.createInterface({
        input: fs.createReadStream(file)
    })
    var lineno = 0;
    var result = []
    readInterface.on('line', async (line) => {
        lineno++;
        var linejson = JSON.parse(line)
        linejson['data']['id'] = lineno
        var pushresult = linejson['data']
        result.push(pushresult)
        // console.log(JSON.stringify(result))
    });

    setTimeout(() => {
        //console.log(JSON.stringify(result))
        return result
        //res.status(200).json(result)
    }, 1000)
}
// Add custom routes
server.get('/browsers', jsonParser, async (req, res) => {
    //check if qurey
    if (req.query.filename) {
        var file = req.query.filename + '.txt'
        console.log(file)

        const readInterface = readline.createInterface({
            input: fs.createReadStream(file)
        })
        var lineno = 0;
        var result = []
        readInterface.on('line', async (line) => {
            lineno++;
            var linejson = JSON.parse(line)
            linejson['data']['id'] = lineno
            var pushresult = linejson['data']
            result.push(pushresult)
            // console.log(JSON.stringify(result))
        });

        setTimeout(() => {
            //console.log(JSON.stringify(result))
            res.status(200).json(result)
        }, 5)
    } else {
        glob("./*.txt", {}, function (err, files) {
            var lineno = 0;
            var result = []
            files.forEach(file => {

                const readInterface = readline.createInterface({
                    input: fs.createReadStream(file)
                })
                readInterface.on('line', async (line) => {
                    lineno++;
                    var linejson = JSON.parse(line)
                    // console.log(linejson['data'])
                    // linejson['data']['vitalScore'] = linejson['vitalScore']?linejson['vitalScore']:null
                    // linejson['data']['id'] = lineno
                    // var pushresult = linejson['data']
                    linejson["id"] = lineno
                    
                    result.push(linejson)
                    // console.log(JSON.stringify(result))
                });
            });
            setTimeout(() => {
                //console.log(JSON.stringify(result))
                res.status(200).json(result)
            }, 5)
        })
    }


})

server.post('/browsers', jsonParser, function (req, res) {
    console.log("body" + req.body)
    if (req.body) {

        filename = req.body['metricName'] + '.txt';
        console.log(filename)
        fs.open(filename, 'r', function (err, fd) {
            if (err) {
                console.log("creat file")
                fs.writeFile(filename, JSON.stringify(req.body) + '\n', 'utf8', function (err) {
                    if (err) throw err;
                    res.status(200).json(req.body)
                });
            } else {
                console.log("file exosts append to file")
                fs.appendFile(filename, JSON.stringify(req.body) + '\n', 'utf8', function (err) {
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