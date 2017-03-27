var express = require('express');
var eventsRouter = express.Router();
var Event = require('../models/event');

eventsRouter.get('/events', function (req, res) {
    if (req.query.pageNumber && req.query.pageSize) {
        // Event.find().skip(req.query.pageSize * (req.query.pageNumber - 1)).limit(req.query.pageSize);
        var pagingOptions = {
            limit: parseInt(req.query.pageSize),
            skip: parseInt(req.query.pageSize * (req.query.pageNumber - 1))
        };
        Event.find({}, null, pagingOptions, function (err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events);
        });
    } else {
        Event.find(function(err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events);
        });
    }
})
.get('/events/:eventId', function (req, res) {
    var id = req.params.eventId;
    Event.findById(id, function (err, event) {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
})
.delete('/events/:eventId', function (req, res) {
    var id = req.params.eventId;
    Event.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send('error');
            return;
        }
        res.send('deleted');
    });
})
.post('/events', function (req, res) {
    var obj = req.body;
    var event = new Event(obj);
    console.log(obj);
    event.save(function(err, result) {
        if (err) {
            res.send('error');
            return;
        }
        res.send('created event; id: ' + result.id);
    });
})
.put('/events/:eventId', function (req, res) {
    var id = req.params.eventId;
    console.log(id);
    var obj = req.body;
    console.log(req);
    Event.findByIdAndUpdate(id, obj, function(err, result) {
        if (err) {
            res.send('error');
            console.log(err);
            return;
        }
        res.send('updated event; id: ' + result.id);
    });
});

module.exports = eventsRouter;
