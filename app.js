var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/yelp_camp');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Temp Schema
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        campgrounds: campgrounds
      });
    }
  });
});

app.post('/campgrounds', function(req, res) {
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  }
  
  Campground.create(newCampground, function(err, newCampground) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render('show.ejs', {
        campground: foundCampground
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});