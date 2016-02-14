var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

// Index route
router.get('/', function(req, res) {
  res.render('landing');
});

// GET register form
router.get('/register', function(req, res) {
  res.render('register');
});

// POST register form
router.post('/register', function(req, res) {
  var user = new User({
    username: req.body.username
  });
  
  User.register(user, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds');
    });
  });
});

// GET login form
router.get('/login', function(req, res) {
  res.render('login');
});

// POST login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res) {
  
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;