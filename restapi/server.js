'use strict';
// call the packages we need//
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var port = process.env.PORT || 8060;

mongoose.connect('mongodb://localhost/online-grafik');

var Hours = require('./Models/HoursPerDays.js');
var Persons = require('./Models/Person.js');

var router = express.Router();

router.get('/', function(req, res)
{
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });
});


router.get('/hours',function(req, res)
{
    Hours.find(function(err,hours)
    {
        if(err) res.send({error: err});
        else res.json(hours);
    });
});


router.get('/hours/:weekday',function(req, res)
{
    var weekday = req.params.weekday;
    console.log('Query for:' + weekday);
    Hours.find({ type : 'hour' }).where('day').equals(weekday).exec(function(err,hour)
    {
        if(err) res.send(err);
        else res.json(hour);
    });
});

router.put('/hours/:weekday',function(req, res)
{
    var weekday = req.params.weekday;
    var arr = [];
    var h  = { hour: req.body.hour, free: req.body.free };
    var obj = {};
    console.log('Query for:' + weekday + " | hour:" + h.hour + "| free:" + h.free);


    Hours.find({}).where('day').equals(weekday).exec(function(err,hour)
    {
        if(err) res.send(err);
        arr = hour[0].hours;
        console.log(hour);
        console.log(arr);
        for (var i = 0; i < arr.length; i++)
        {
            if(arr[i].hour === h.hour)
            {
                arr[i].free = h.free;
                break;
            }
        }

        Hours.findOneAndUpdate({hours:arr}).where('day').equals(weekday).exec(function(err)
        {
            if(err) res.send(err);
            else console.log("Item was updateed successfully!");
        });
        res.send(hour);
    });
});

router.post('/persons',function(req, res)
{
    var person = new Persons({
        type : req.body.type,
        name : req.body.name,
        family : req.body.family,
        date : req.body.date,
        hour : req.body.hour
    });
    person.save(function(err){
        if(err) throw err;
        Persons.find({type:'person'}).exec(function(err, items)
        {
            if(err) throw err;
            for (var i = 0; i < items.length; i++)
            {
                console.log(items[i]);
            }
        });
    });
});


app.on('error', function (err)
{
    console.error(err);
});

app.use(function (req, res, next)
{
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("===========================");
  console.log('||Client IP|'+ ip + "|Port:" + port+"||");
  console.log("===========================");
  next();
});

app.use('/api',router);
app.listen(port);
console.log("==========================================================");
console.log('||Beers are served at: http://localhost:'+ port +" "+ app.settings.env+"||");
console.log("==========================================================");
