const express     = require("express");
const authRoutes  = express.Router();
const passport    = require('passport');

const User        = require('../models/user');

const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;

authRoutes.get("/signup", (req, res, next) =>{
  res.render("auth/signup-view.ejs");
});


authRoutes.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const preferredName = req.body.preferredName;
  const userName  = req.body.userName;
  const email     = req.body.email;
  const password  = req.body.password;
  const photo     = req.body.photo;

  if (userName === "" || password ===""){
    res.render("auth/signup-view", {message:"Please indicate your username or password"});
      return;
    }

  User.findOne({ userName }, "userName", (err, user) => {
    if (user !== null) {
      res.render("auth/signup-view.ejs", { message: "The email already exists" });
      return;
    }

    const salt      = bcrypt.genSaltSync(bcryptSalt);
    const hashPass  = bcrypt.hashSync(password, salt);

    const newUser   = User({
      firstName:     firstName,
      lastName:      lastName,
      preferredName: preferredName,
      email:         email,
      username:      username,
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
  res.render('auth/login-view.ejs', {
    errorMessage: req.flash('error')
  });
});

authRoutes.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: '/',
  successRedirect: "/",
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
