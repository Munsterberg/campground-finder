var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/Campground');
var Comment = require('../models/Comment');

// Comments New
router.get('/new', isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) console.log(err);
    
    res.render('comments/new', {
      title: 'New Comment',
      campground: campground
    });
  });
});

// Comments Create
router.post('/', isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;