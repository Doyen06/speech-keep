const express     = require("express");
const studentAuthRoutes  = express.Router();
const passport    = require('passport');

const Student     = require('../models/student.js');

const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;

studentAuthRoutes.get("/section/:id/new-student",
(req, res, next) =>{
  res.render("profile/student-new.ejs");
});




studentAuthRoutes.get("/studentLogin", (req, res, next) => {
  res.render('auth/login-student', {
    errorMessage: req.flash('error')
  });
});

studentAuthRoutes.post("/studentLogin",
passport.authenticate("local", {
  successReturnToOrRedirect: '/',
  failureRedirect: "/studentLogin",
  failureFlash: true,
  successFlash: "You have been logged in, student!",
  passReqToCallback: true
}));

studentAuthRoutes.get('/logout',(req, res) =>{
  req.logout();
  req.flash('success', "You have successfully logged out");
  res.redirect('/');
});


module.exports = studentAuthRoutes;
