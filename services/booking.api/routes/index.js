var express = require('express');
var router = express.Router();
var bookingRoute = require('./api/booking.route');
var adminRoute = require('./api/admin.route');


router.use('/api/booking',bookingRoute);
router.use('/api/admin',adminRoute);

module.exports = router;
