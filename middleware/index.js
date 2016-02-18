// Middleware for project
var Campground = require('../models/Campground');
var Comment = require('../models/Comment.js');

var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next) {
  if(req.isAuthenticated()) {
    // Does the user own the campground
    Campground.findById(req.params.id, function(err, campground) {
      if(err) {
        res.redirect('back');
      } else {
        // does the user own the campground
        if(campground.author.id.equals(req.user._id)) {
          next();   
        } else {
          res.redirect('back');
        }
      }
    }); 
  } else {
    res.redirect('back');
  }
}

middlewareObj.checkCommentOwner = function(req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if(err) {
        res.redirect('back');
      } else {
        if(comment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {

  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = middlewareObj;
