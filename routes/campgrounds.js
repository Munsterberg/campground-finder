var express = require('express');
var router = express.Router();
var Campground = require('../models/Campground');

// Show all campgrounds
router.get('/', function(req, res) {
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

// POST New Campground
router.post('/', function(req, res) {
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

// GET NEW Campground
router.get('/new', function(req, res) {
  res.render('campgrounds/new');
});

// SHOW Campground
router.get('/:id', function(req, res) {
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

module.exports = router;