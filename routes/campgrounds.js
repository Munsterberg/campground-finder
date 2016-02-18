var middleware = require('../middleware');
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

// Creat POST New Campground
router.post('/', middleware.isLoggedIn, function(req, res) {
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username 
    }
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
router.get('/new', middleware.isLoggedIn, function(req, res) {
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

// EDIT Campground
router.get('/:id/edit', middleware.checkCampgroundOwner, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render('campgrounds/edit', {
        campground: campground
      });
    }
  });
});

// UPDATE Campground
router.put('/:id', middleware.checkCampgroundOwner, function(req, res) {
  // find and update the campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if(err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY Campground
router.delete('/:id', middleware.checkCampgroundOwner, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) res.redirect('/campgrounds');
    
    res.redirect('/campgrounds');
  });
});


module.exports = router;
