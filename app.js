var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3403/4634353704_704a3bc1d7.jpg'},
    {name: 'Mountain Rest', image: 'https://farm8.staticflickr.com/7007/6792988383_f880c555a2.jpg'},
    {name: 'Deer Peak', image: 'https://farm4.staticflickr.com/3327/4593576497_835bbd10cd.jpg'}
  ];
  
  res.render('campgrounds', {
    campgrounds: campgrounds
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});