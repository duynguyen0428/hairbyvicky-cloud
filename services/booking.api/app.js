var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var config = require('./config/db');
var process = require('process');
var error_handler = require('./middleware/custome_error_handler');

process.on('unhandledRejection', error_handler.handle_unhandled_error)

var app = express();
var retry_count = 0;
var db_status = false;
mongoose.connect(`mongodb://${config.MONGO_DB}:${config.MONGO_PORT}/${config.MONGO_COLLECTION}`, { useNewUrlParser: true},(err) => {
  if(err){
    console.error(`error: ${err}`);
    setInterval(retry_connect,5000);
    // if(typeof(err) === 'MongoNetworkError')
      
  }
  db_status = true;
});

/* retry to connect db
** will try to connect db 3 times
*/
function retry_connect() {
  if(retry_count < 3 && db_status === false ){
    retry_connect++;
    mongoose.connect(`mongodb://${config.MONGO_DB}:${config.MONGO_PORT}/${config.MONGO_COLLECTION}`, { useNewUrlParser: true},(err) => {
      if(err){
        console.error(`error: ${err}`);
        if(typeof(err) === 'MongoNetworkError')
          retry_conenct();
      }
      db_status = true;    
    });
  }
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(error_handler.handle_error);

app.use('/', index);
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
