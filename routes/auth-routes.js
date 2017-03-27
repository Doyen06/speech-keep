const express     = require("express");
const authRoutes  = express.Router();
const passport    = require('passport');
const Student     = require('../models/student.js');

const User        = require('../models/user.js');

const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;

authRoutes.post("/student", (req, res, next) => {
console.log("WHAM!!!!!!");

  if (req.body.username === "" || req.body.password ===""){
    res.render("profile/student-new.ejs", {message:"Please indicate your username or password"});
      return;
    }

  Student.findOne({ "username": req.body.username }, "username", (err, user) => {
    console.log("studnetfindone");
      if (user !== null) {
      res.render("profile/student-new.ejs", { message: "The username already exists" });
      return;
    }

    const salt      = bcrypt.genSaltSync(bcryptSalt);
    const hashPass  = bcrypt.hashSync(req.body.password, salt);

    const newStudent   =
      {

      firstName:     req.body.firstName,
      lastName:      req.body.lastName,
      email:         req.body.email,
      username:      req.body.username,
      password:      hashPass,
      section:       req.params._id,

    };
    const student = new Student(newStudent);

  student.save((err) =>{
      if (err) {
        res.render('profile/student-new.ejs',{ message: "Something went wrong, please try again"});
      } else {
        req.flash("success", "You have been registered. Please try logging in.");
          //redirect to the homepage? Not made yet
        res.redirect('/');
      }
    });
  });
});

authRoutes.get("/signup", (req, res, next) =>{
  res.render("auth/signup-view.ejs");
});


authRoutes.post("/signup", (req, res, next) => {
  console.log(req.body.username);
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const preferredName = req.body.preferredName;
  const username  = req.body.username;
  const email     = req.body.email;
  const password  = req.body.password;
  const photo     = req.body.photo;

  if (username === "" || password ===""){
    res.render("auth/signup-view", {message:"Please indicate your username or password"});
      return;
    }

  User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
      res.render("auth/signup-view.ejs", { message: "The username already exists" });
      return;
    }

    const salt      = bcrypt.genSaltSync(bcryptSalt);
    const hashPass  = bcrypt.hashSync(password, salt);

    const newUser   = User({
      firstName:     req.body.firstName,
      lastName:      req.body.lastName,
      preferredName: req.body.preferredName,
      email:         req.body.email,
      username:      req.body.username,
      password:      hashPass
    });

    newUser.save((err) =>{
      if (err) {
        res.render('auth/signup-view.ejs',{ message: "Something went wrong, please try again"});
      } else {
        req.flash("success", "You have been registered. Please try logging in.");
          //redirect to the homepage? Not made yet
        res.redirect('/');
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render('auth/login-view', {
    errorMessage: req.flash('error')
  });
});

authRoutes.post("/login",
passport.authenticate("local", {
  successReturnToOrRedirect: '/teacher',
  failureRedirect: "/login",
  failureFlash: true,
  successFlash: "You have been logged in, user!",
  passReqToCallback: true
}));

authRoutes.get('/logout',(req, res) =>{
  req.logout();
  req.flash('success', "You have successfully logged out");
  res.redirect('/');
});


module.exports = authRoutes;
