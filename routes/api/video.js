const express       = require('express');
const router        = express.Router();
const mongoose      = require('mongoose');

const Video         = require('../../models/video');

router.get('/sectionvideos/:id', (req, res, next)=>{
    console.log("REQ PARAMS IS: " + req.params.id);
  Video.find({section:req.params.id}, (err, entriesList)=>{
    if(err){
      console.log("THERE'S AN ERROR");
      res.json(err);
      return;
    }
    console.log("before res.json");
    res.json(entriesList);
    console.log(entriesList);
    console.log("after res.json");
  });
});

router.post('/sectionvideos/:id',(req,res,next)=>{
  const theEntry = new Video({
    creator: req.body.creator,
    video: req.body.video,
    assignment: req.body.assignment,
    comments: req.body.comments,

    section: req.params.id
  });
    theEntry.save((err)=>{
      if(err){
        res.json(err);
        return;
      }
      res.json({
        message:'new entry was created',
        id: theEntry._id
      });
    });
  });


  router.get('/videos/:id',(req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400)
      .json({message: 'Specified id is not valid'});
return;
}
 Video.findById(req.params.id,(err, theEntry)=>{
   if(err){
     res.json(err);
     return;
   }
   res.json(theEntry);
    });
  });

module.exports = router;
