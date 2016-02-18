var middleware = require('../middleware');
var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/Campground');
var Comment = require('../models/Comment');

// Comments New
router.get('/new', middleware.isLoggedIn, function(req, res) {
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
router.post('/', middleware.isLoggedIn, function(req, res) {
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
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// EDIT comment route
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if(err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        campground_id: req.params.id,
        comment: comment
      });
    }
  }) 
});

// PUT edit route
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY comment route
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});


module.exports = router;
