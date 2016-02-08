var mongoose = require('mongoose');
var Campground = require('./models/Campground');
var Comment = require('./models/Comment');

var data = [
  {
    name: "Cloud's Rest", 
    image: 'https://farm4.staticflickr.com/3327/4593576497_835bbd10cd.jpg', 
    description: 'Blah blah blah'
  },
  {
    name: "Foggy Morne", 
    image: 'https://farm2.staticflickr.com/1296/1386923112_3329c176bf.jpg', 
    description: 'Blah blah blah'
  },
  {
    name: "Canyon Forest", 
    image: 'https://farm1.staticflickr.com/22/36792881_2d689c2a97.jpg', 
    description: 'Blah blah blah'
  }
]

function seedDB() {
  
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) console.log(err);
   
    console.log('Removed campgrounds!');
    
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if(err) console.log(err);
      
        console.log('Added a campground!');
        // create a comment
        Comment.create({
          text: 'This place is great, I wish there was internet though!',
          author: 'Jason'
        }, function(err, comment) {
          if(err) console.log(err);
          
          campground.comments.push(comment);
          campground.save();
          console.log('Created new comment!');
        });
      });  
    });
  });  
}

module.exports = seedDB;

