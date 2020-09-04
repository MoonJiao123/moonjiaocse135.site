// app.js file
var express = require('express');

var jsonServer = require('json-server');

var bodyParser = require('body-parser')
const redis = require('redis');
const session = require('express-session');
var redisStore = require('connect-redis')(session);
const client = redis.createClient();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Returns an Express server
var server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(
    session({
        store: new redisStore({ host: '165.227.193.69', port: 6379, client: client, ttl: 260 }),
        name: 'sid',
        secret: 'secretdoor',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60
        }
    })
)

var mysql = require('mysql');
const { resolveSoa } = require('dns');

//setup datanbase
var db = mysql.createConnection({
    host: 'db-mysql-nyc1-18805-do-user-7334883-0.a.db.ondigitalocean.com',
    user: 'moon',
    password: 'ethe274ugtav1e59',
    database: 'cse135_hw3',
    port: 25060
})
db.connect();

/**
 * login authicattion
 */

server.get('/checklogin', urlencodedParser, function (req, res) {
    // res.redirect('https://moonjiaocse135.site/report');
    if (req.session.user) {
        res.status(200)
    } else{
        res.redirect('/');
    }
})
server.get('/check', urlencodedParser, function (req, res) {
    // res.redirect('https://moonjiaocse135.site/report');
    if (req.session.user) {
        if (req.session.type == 'admin') {
            res.redirect('https://reporting.moonjiaocse135.site/admin.html');

        } else {
            res.redirect('https://reporting.moonjiaocse135.site/index.html');

        }
    } else{
        res.status(200)
    }
})

server.get('/logout', urlencodedParser, function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(200).json(error);
        }
        res.status(200);
    });
})

server.post('/reg', urlencodedParser, function (req, res) {
    let sql = `INSERT INTO cse135_hw3.users (username, email, password, type) VALUES ('${req.body['username']}', '${req.body['email']}', '${req.body['password']}', '${req.body['type']}')`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ message: "useradded" })
        }


    })

})
//Get a specific entry in the browser table that matches the specified ID
server.post('/login', urlencodedParser, function (req, res) {


    if (req.body['username'] && req.body['password']) {
        let sql = `SELECT * FROM users WHERE username='${req.body['username']}' OR email='${req.body['username']}'`
        db.query(sql, function (err, results) {
            if (err) {
                res.status(400).json(err)
            } else if (!results[0]) {
                res.status(400).json({ message: "cannot find user" })
            } else {
                if (results[0]['password'] == req.body['password']) {
                    req.session.user = req.body['username']
                    req.session.type = results[0]['type']
                    if (results[0]['type'] == 'admin') {
                        res.redirect('https://reporting.moonjiaocse135.site/admin.html');

                    } else {
                        res.redirect('https://reporting.moonjiaocse135.site/index.html');

                    }
                    res.status(200)
                } else {
                    res.status(400).json({ message: "wrong password" })
                }

            }

        })
    } else {
        res.status(400).json("empty fields")
    }

})


/**
 * users CRUD
 */
server.post('/users', jsonParser, function (req, res) {
    let sql = `INSERT INTO cse135_hw3.users (username, email, password, type) VALUES ('${req.body['username']}', '${req.body['email']}', '${req.body['password']}', '${req.body['type']}')`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({results})
        }


    })
})
server.get('/users', jsonParser, function (req, res) {
    let sql = `SELECT * FROM cse135_hw3.users`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results)
        }


    })
})
server.delete('/users/:id', jsonParser, function (req, res) {
    let sql = `DELETE FROM cse135_hw3.users WHERE id = '${req.params['id']}'`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ message: "deleted" })
        }


    })
})
server.put('/users/:id', jsonParser, function (req, res) {
    let sql = `UPDATE cse135_hw3.users SET username = '${req.body['username']}', email = '${req.body['email']}', password = '${req.body['password']}', type = '${req.body['type']}' WHERE id = '${req.params['id']}'`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ message: "changesaved" })
        }


    })
})

server.patch('/users/:id', jsonParser, function (req, res) {
    var key = Object.keys(req.body)[0]
    var value = req.body[key]
    let sql = `UPDATE cse135_hw3.users SET ${key} = '${value}' WHERE id = '${req.params['id']}'`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ message: "changesaved" })
        }


    })
})

/**
 * chart 
 */
server.get('/initialBrowserData', jsonParser, function (req, res) {
    let sql = `SELECT * FROM cse135_hw3.initialBrowserData`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results)
        }

    })
})
server.get('/navigationTiming', jsonParser, function (req, res) {
    let sql = `SELECT data FROM cse135_hw3.navigationTiming`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results)
        }


    })
})
server.get('/clsFinal', jsonParser, function (req, res) {
    let sql = `SELECT * FROM cse135_hw3.clsFinal`
    db.query(sql, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results)
        }
    })
})
server.get('/barchart', jsonParser, function (req, res) {
    var barchart = []
    let sqllcpFinal= `SELECT metricName,vitalsScore, data FROM cse135_hw3.lcpFinal`
    db.query(sqllcpFinal, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }

    })
    let sqlclsFinal = `SELECT metricName,vitalsScore, data FROM cse135_hw3.clsFinal`
    db.query(sqlclsFinal, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }
    })
    let sqlfid = `SELECT metricName,vitalsScore, data FROM cse135_hw3.fid`
    db.query(sqlfid, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }
    })
    setTimeout(() => {
        res.status(200).json(barchart)
    }, 500)
})
server.get('/metricgrid', jsonParser, function (req, res) {
    var barchart = []
    let sqllcpFinal= `SELECT metricName,vitalsScore FROM cse135_hw3.lcpFinal`
    db.query(sqllcpFinal, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }

    })
    let sqlclsFinal = `SELECT metricName,vitalsScore FROM cse135_hw3.clsFinal`
    db.query(sqlclsFinal, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }
    })
    let sqlfid = `SELECT metricName,vitalsScore FROM cse135_hw3.fid`
    db.query(sqlfid, function (err, results) {
        if (err) {
            res.status(400).json(err)
        } else {
            barchart.push(results)
        }
    })
    setTimeout(() => {
        res.status(200).json(barchart)
    }, 500)
})
// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(5000);