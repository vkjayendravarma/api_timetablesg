var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// middle ware
var bodyParser = require('body-parser')



// DB config
var mongoose = require('mongoose')
const db = require('./config/mongoConnect').dbURL;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected'))
        .catch((err) => console.error(err));




// aqure routes 
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var subjectsRouter = require('./routes/api/subjects')
var facultyRouter = require('./routes/api/faculty')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// api routes 
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/api/subjects', subjectsRouter)
app.use('/api/faculty', facultyRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
