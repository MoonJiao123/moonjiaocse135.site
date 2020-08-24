
// app.js file

var jsonServer = require('json-server');

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
server.get('/browsers', function (req, res) {
    
    res.send("hello browers")
})
server.post('/browsers', function (req, res) {
    console.log("sent to browsers" + req.body)
    if(req.body){
        res.status(200).send('got the browsers data');

    } else{
        res.status(400).send('not data was sent');

    }
})

server.get('/browsers/:id', function (req, res) { res.send("hello browers") })
server.delete('/browsers/:id', function (req, res) { res.send("hello browers") })
server.put('/browsers/:id', function (req, res) { res.send("hello browers") })

// server.get('/echo', (req, res) => {
//     res.jsonp(req.query)
// })

//user a body parser
server.use(jsonServer.bodyParser)

// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(5000, () => {
    console.log('JSON Server is running')
})