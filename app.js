var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('./config')
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// // catch 500 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 500;
//   next(err);
// });

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({error: err.message});
})



app.listen(process.env.PORT || 3000);
// console.log('Server started on port 3000');

module.exports = app;
