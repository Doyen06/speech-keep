const express     = require("express");
const profileRoutes  = express.Router();
const Section =  require('../models/section.js');
// const User = require('../models/user.js');

profileRoutes.get('/teacher', (req, res, next) => {

    var teachID= req.user._id;

    Section.find({teacher:teachID}, (err, sectionList)=>{
      console.log(sectionList);
      res.render('profile/teacher', {
        section: sectionList,
        successMessage: req.flash('success')
      });
    });


});

module.exports = profileRoutes;
