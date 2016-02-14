var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// ROUTES
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

// var seedDB = require('./seeds');

var app = express();

// MODELS
var Campground = require('./models/Campground');
var Comment = require('./models/Comment');
var User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/yelp_camp');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// PASSPORT
app.use(require('express-session')({
  secret: 'ANYTHING AT ALL',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Using routes
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


// seedDB();


app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});