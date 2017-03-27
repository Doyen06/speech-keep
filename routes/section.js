const express = require('express');
const ensure = require('connect-ensure-login');
const sectionRoutes = express.Router();
const Students = require('../models/student.js');
const Section = require('../models/section.js');

sectionRoutes.get('/section/new',
  ensure.ensureLoggedIn(),(req, res, next)=>{
    res.render('section/new.ejs',{
    message: req.flash('success')
    });
  });

sectionRoutes.get('/section',
  ensure.ensureLoggedIn(),(req,res, next)=>{
    Section.find((err, sectionList) =>{
      if(err){
        next(err);
        return;
      }
      res.render('section/index.ejs',{
        section: sectionList,
        message: req.flash('success')
      });
    });
  });

sectionRoutes.get('/section/view',
  ensure.ensureLoggedIn(), (req, res, next)=>{
    Section.find((err, sectionInfo)=>{
      if(err){
        next(err);
        return;
      }
    res.render('section/view.ejs',{
      sections: sectionInfo,
      message: req.flash('success')
      });
    });
  });

sectionRoutes.post('/section',
  ensure.ensureLoggedIn(), (req, res, next)=>{
    const department= req.body.department;
    const sectionName=  req.body.sectionName;
    const teacher=  req.user._id;

    const newSection =new Section({
      department: department,
      sectionName: sectionName,
      teacher: teacher,
    });

    newSection.save((err)=>{
      if(err){ return next(err); }
      else {
        req.flash('success', 'Your class has been created');
        res.redirect("/section");
      }
    });
  });

sectionRoutes.get('/section/:id', ensure.ensureLoggedIn(), (req, res, next)=>{
  let sectionId = req.params.id;
  Students.find({section: sectionId}, (err, students)=>{
    if (err){return next(err);}
    console.log(students);
    res.render('section/view', {
      students: students
    });
  });
});

sectionRoutes.get('/section/:id/edit', ensure.ensureLoggedIn(),
  (req, res, next)=>{
    let sectionid=req.params.id;
    section.findbyId(sectionId, (err, theUser)=>{
      if (err) { return next(err); }
        res.render('section/edit', { section: section });
      });
    });

sectionRoutes.post('/:id',
  ensure.ensureLoggedIn(),
  (req, res, next) => {
      const sectionId = req.params.id;{
      const department= req.body.department;
      const sectionName=  req.body.sectionName;
      const teacher=  req.body.teacher;

      const newSection=new Section({
        department: department,
        sectionName: sectionName,
        teacher: teacher,
    });
  }
  Section.findByIdAndUpdate(sectionId, (err, sectionId) => {
    if (err){ return next(err); }
    return res.redirect('/section');
  });
});

sectionRoutes.post('/:id/delete', (req, res, next) => {
  let sectionId = req.params.id;

  Section.findByIdAndRemove(id, (err, theUser) => {
    if (err){ return next(err); }
    return res.redirect('/section');
  });
});


module.exports = sectionRoutes;
