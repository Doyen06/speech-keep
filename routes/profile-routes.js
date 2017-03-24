const express     = require("express");
const profileRoutes  = express.Router();
const User = require('../models/user.js');

profileRoutes.get('/teacher', (req, res, next) => {
  res.render('profile/teacher', {
    successMessage: req.flash('success')
  });
});

module.exports = profileRoutes;
