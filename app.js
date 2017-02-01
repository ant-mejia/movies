var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var index = require('./routes/index');

var users = require('./routes/users');
var directors = require('./routes/directors');

var app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


//davids method override, it makes it so you can edit things
var methodOverride = require('method-override');
//requiring routes (david)
var movies = require('./routes/movies');
var users = require('./routes/user');

const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');

// load environment variables
require('dotenv').config();

//davids app.use method.override to edit things
app.use(methodOverride('_method'));

// //requiring routes (david)
// var movies = require('./routes/movies');
>>>>>>> master

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


//adding our routes
app.use('/movies', movies);
app.use('/users', users);
app.use('/directors', directors);
app.use('/', index);
app.use('/in', authRoutes);
app.use('/user', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
