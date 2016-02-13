var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var seedDB = require('./seeds');

var app = express();

var Campground = require('./models/Campground');
var Comment = require('./models/Comment');
var User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/yelp_camp');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

seedDB();

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
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
  res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {
        campground: foundCampground
      });
    }
  });
});

// Comment routes
// =================
app.get('/campgrounds/:id/comments/new', function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) console.log(err);
    
    res.render('comments/new', {
      title: 'New Comment',
      campground: campground
    });
  });
});

app.post('/campgrounds/:id/comments', function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err)
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});