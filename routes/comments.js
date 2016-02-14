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
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // push comment to comments array
          campground.comments.push(comment);
          // save campground
          campground.save();
          console.log('HERE IS THE INFO:' + comment);
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