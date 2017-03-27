var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var eventsController = require('./app/controllers/events.js');
var mongoose = require('mongoose');

var path = require('path');
// var mongodb = require('mongodb').MongoClient;
var db = require('./config/db');

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

// allow cors request
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

var port = process.env.PORT || 3000;

// connect to our mongoDB database
mongoose.connect(db.url);

app.use('/api', eventsController);

app.use(express.static('public'));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/src/index.html'));
// });

app.listen(port, function () {
    console.log('running server on port ' + port);
});
