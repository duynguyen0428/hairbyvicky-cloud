var express = require('express');
var router = express.Router();
var bookingRoute = require('./api/booking.route');


router.use('/api/booking',bookingRoute);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
