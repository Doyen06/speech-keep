const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/speech-keep');

const Video = require('../models/video.js');

const videos =[
  {
    creator: 'Tommy Boy',
    video: 'http://giphy.com/gifs/martinbet-martin-2x03-xT1XGXBercOLSE50Qg',
    commentCreator: 'Jamie',
    comments: 'Good Great Great',
  },
  {
    creator: 'Mike',
    video: 'http://giphy.com/gifs/martinbet-martin-2x03-xT1XGXBercOLSE50Qg',
    commentCreator: "Stacy",
    comments: "Great Great Great Great Great",
  },
];

Video.create(videos, (err, docs)=>{
  if(err){
    throw(err);
  }
  docs.forEach((videos)=>{
    console.log(`${videos.creator} ${videos._id}`);
  });

  mongoose.disconnect();
});
