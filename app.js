const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const bcrypt       = require('bcrypt');
const LocalStrategy= require('passport-local').Strategy;
const flash        = require('connect-flash');
const dotenv       = require('dotenv');
const passport     = require('passport');

const User         = require('./models/user');


dotenv.config();
mongoose.connect('mongodb://localhost/speech-keep');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Speech-Keep';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use(session({
  secret: "this better work",
  resave:  true,
saveUninitialized: true,
}));

//local passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  next();
});

passport.use(new LocalStrategy((user, password, next) => {

  User.findOne({ user }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

//determines what to save in the session
passport.serializeUser((user, cb) => {
  if(user.provider) {
    cb(null, user);
  }else{
  cb(null, user._id);
}
});

//if I do not have everything saved, how do I get the rest
passport.deserializeUser((id, cb) => {
  if(id.provider){
    cb(null,id);
    return;
  }

  User.findOne({ "_id": id })
    .populate('home')
    .exec((err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
});

//routes

//const user = require('./routes/user');
//app.use('/', user);

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes.js');
app.use('/', authRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
