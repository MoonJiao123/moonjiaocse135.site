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
var mysql = require('mysql');

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());
//setup datanbase
var db = mysql.createConnection({
    host: 'db-mysql-nyc1-18805-do-user-7334883-0.a.db.ondigitalocean.com',
    user: 'moon',
    password: 'ethe274ugtav1e59',
    database: 'cse135_hw3',
    port: 25060
})
db.connect();
// db.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }

//     let createTodos = `CREATE TABLE cse135_hw3.initialBrowserData (id INT NOT NULL AUTO_INCREMENT,userAgent VARCHAR(45) NULL,innerHeight VARCHAR(45) NULL,outerHeight VARCHAR(45) NULL,innerWidth VARCHAR(45) NULL,outerWidthVARCHAR(45) NULL,cookieEnabled VARCHAR(45) NULL,language VARCHAR(45) NULL,vitalsScore VARCHAR(45) NULL,PRIMARY KEY (id),UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)`;



//     connection.query(createTodos, function (err, results, fields) {
//         if (err) {
//             console.log(err.message);
//         }
//     });

//     connection.end(function (err) {
//         if (err) {
//             return console.log(err.message);
//         }
//     });
// });
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
        db.query('SELECT * FROM ' + req.query.filename, function (err, results) {
            if (err) throw err
            res.status(200).json(results)
        })
        // var file = req.query.filename + '.txt'
        // console.log(file)

        // const readInterface = readline.createInterface({
        //     input: fs.createReadStream(file)
        // })
        // var lineno = 0;
        // var result = []
        // readInterface.on('line', async (line) => {
        //     lineno++;
        //     var linejson = JSON.parse(line)
        //     linejson['data']['id'] = lineno
        //     var pushresult = linejson['data']
        //     result.push(pushresult)
        //     // console.log(JSON.stringify(result))
        // });

        // setTimeout(() => {
        //     //console.log(JSON.stringify(result))
        //     res.status(200).json(result)
        // }, 5)

        //database

    } else {
        // let rawdata = fs.readFileSync('mock.json');
        // let data = JSON.parse(rawdata);
        // res.status(200).json(data)
        allresult = []
        // tables = "SELECT table_name FROM information_schema.tables WHERE TABLE_TYPE = 'BASE TABLE' AND table_schema ='cse135_hw3'";
        var tables = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='cse135_hw3'"
        db.query(tables, function (err, results) {
            if (err) throw err
            console.log("results are",results)
            results.forEach(table => {
                db.query('SELECT * FROM ' + table['TABLE_NAME'], function (err, contents) {
                    if (err) throw err

                    // contents.forEach(data => {
                    //     data['data'] = data['data'][0] == '{' ? JSON.parse(data['data']) : data['data']
                    // })
                    allresult.push(contents)

                })
            })

        })
        setTimeout(() => {
            res.status(200).json(allresult)
        }, 100)

        // glob("./*.txt", {}, function (err, files) {
        //     var lineno = 0;
        //     var result = []
        //     files.forEach(file => {

        //         const readInterface = readline.createInterface({
        //             input: fs.createReadStream(file)
        //         })
        //         readInterface.on('line', async (line) => {
        //             lineno++;
        //             var linejson = JSON.parse(line)
        //             // console.log(linejson['data'])
        //             // linejson['data']['vitalScore'] = linejson['vitalScore']?linejson['vitalScore']:null
        //             // linejson['data']['id'] = lineno
        //             // var pushresult = linejson['data']
        //             linejson["id"] = lineno

        //             result.push(linejson)
        //             // console.log(JSON.stringify(result))
        //         });
        //     });
        //     setTimeout(() => {
        //         //console.log(JSON.stringify(result))
        //         res.status(200).json(result)
        //     }, 5)
        // })
    }


})

server.post('/browsers', jsonParser, function (req, res) {
    // console.log("body" + req.body)
    if (req.body) {


        //     filename = req.body['metricName'] + '.txt';
        //     console.log(filename)
        //     fs.open(filename, 'r', function (err, fd) {
        //         if (err) {
        //             console.log("creat file")
        //             fs.writeFile(filename, JSON.stringify(req.body) + '\n', 'utf8', function (err) {
        //                 if (err) throw err;
        //                 res.status(200).json(req.body)
        //             });
        //         } else {
        //             console.log("file exosts append to file")
        //             fs.appendFile(filename, JSON.stringify(req.body) + '\n', 'utf8', function (err) {
        //                 if (err) throw err;
        //                 console.log('Saved!');
        //                 res.status(200).json(req.body)
        //             });
        //         }
        //     })

        if (req.body['metricName'] == 'initialBrowserData') {
            //database
            let sql = `INSERT INTO ${req.body['metricName']} (metricName,vitalsScore, userAgent,innerHeight,OuterHeight,innerWidth, outerWidth,language, cookieEnabled) VALUES (?)`;
            let values = [
                req.body.metricName,
                //typeof (req.body.data) == 'string' ? req.body.data : JSON.stringify(req.body.data),
                req.body.vitalsScore,
                req.body.data['userAgent'],
                req.body.data['innerHeight'],
                req.body.data['outerHeight'],
                req.body.data['innerWidth'],
                req.body.data['outerWidth'],
                req.body.data['language'],
                req.body.data['cookieEnabled'],
            ];
            db.query(sql, [values], function (err, data, fields) {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: "New user added successfully"
                })
            })
        } else if (req.body['metricName'] == 'storageEstimate') {
            //database
            var sql;
            var values;
            if (req.body.data.quota) {

                sql = "INSERT INTO " + req.body['metricName'] + "(`metricName`,`vitalsScore`,`quota`,`usage`,`caches`,`indexedDB`,`serviceWorker`) VALUES (?)";

                values = [
                    req.body.metricName,
                    req.body.vitalsScore,
                    req.body.data['quota'],
                    req.body.data['usage'],
                    req.body.data['caches'],
                    req.body.data['indexedDB'],
                    req.body.data['serviceWorker'],
                ];
            } else {
                sql = "INSERT INTO " + req.body['metricName'] + "(metricName,data,vitalsScore) VALUES (?)";
                values = [
                    req.body.metricName,
                    typeof (req.body.data) == 'string' ? req.body.data : JSON.stringify(req.body.data),
                    req.body.vitalsScore,
                ];
            }
            // let sql = "INSERT INTO " + req.body['metricName'] + "(metricName,data,vitalsScore,quota,usage,caches,indexedDB,serviceWorker) VALUES (?)";
            console.log(sql, req.body.data);

            db.query(sql, [values], function (err, data, fields) {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: "New user added successfully"
                })
            })
        } else {
            //database
            let sql = "INSERT INTO " + req.body['metricName'] + "(metricName,data,vitalsScore) VALUES (?)";
            console.log(sql);

            let values = [
                req.body.metricName,
                typeof (req.body.data) == 'string' ? req.body.data : JSON.stringify(req.body.data),
                req.body.vitalsScore
            ];
            db.query(sql, [values], function (err, data, fields) {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: "New user added successfully"
                })
            })
        }



    } else {
        res.status(400).json("data not sent corrently.")

    }

})

//Get a specific entry in the browser table that matches the specified ID
server.get('/browsers/:id', jsonParser, function (req, res) {
    if (req.query.filename) {
        let sql = 'SELECT * FROM ' + req.query.filename + ' WHERE id = ' + req.params.id
        db.query(sql, function (err, results) {
            if (err) throw err
            // results.forEach(data => {
            //     data['data'] = data['data'][0] == '{' ? JSON.parse(data['data']) : data['data']
            // })
            res.status(200).json(results)
        })
    } else {
        res.status(400).json("cannot find filename")
    }
})

//Delete an entry that matches the specified ID
server.delete('/browsers/:id', jsonParser, function (req, res) {
    if (req.query.filename) {
        let sql = 'DELETE FROM ' + req.query.filename + ' WHERE id = ' + req.params.id
        db.query(sql, function (err, results) {
            if (err) throw err
            // results.forEach(data => {
            //     data['data'] = data['data'][0] == '{' ? JSON.parse(data['data']) : data['data']
            // })
            res.status(200).json(results)
        })
    } else {
        res.status(400).json("cannot find filename")
    }

})

//Update an entry that matches the specified ID
server.put('/browsers/:id', jsonParser, function (req, res) {
    if (req.query.filename) {
        //let sql = `UPDATE ` + req.query.filename + ` SET `+ req.query.column.toString() +`=`+ '\"'+req.query.content.toString()+'\"'+` WHERE id = ` + req.params.id;
        let sql = `UPDATE ${req.query.filename} SET ${req.query.column} = '${req.query.content}' where id = ${req.params.id}`
        console.log(sql)

        db.query(sql, function (err, results) {
            if (err) throw err
            // results.forEach(data => {
            //     data['data'] = data['data'][0] == '{' ? JSON.parse(data['data']) : data['data']
            // })
            res.status(200).json(results)
        })
    } else {
        res.status(400).json("cannot find filename")
    }

})
// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(3000);