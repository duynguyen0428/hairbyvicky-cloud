const Router = require('express').Router();
var bookingRepo = require('../../repositories/booking.repository');

Router.get('/',async (req,res)=>{
    var Bookings = await bookingRepo.getAllBooking();
    // console.info(`All Bookings: ${Bookings}`);
    res.send(Bookings);
})
.get('/email/:email', async (req, res) => {
    var query = {
        Email: req.params.email
    }
    console.info(`email: ${query.email}`);
    var booking = await bookingRepo.getBooking(query);

    if (booking)
        return res.send(booking);

    return res.status(404).send();

    })
.get('/:id',async (req,res)=>{
    var query = {
        _id: req.params.id
    }
    var booking = await bookingRepo.getBooking(query);
    if (booking)
        return res.send(booking);

    return res.status(404).send();

})
.get('/phone/:mobile_no',async (req,res) => {
    var query = {
        Phone: req.params.mobile_no
    }
    var booking = await bookingRepo.getBooking(query);
    if (booking)
        return res.send(booking);

    return res.status(404).send();
})
.get('/date/:date',async (req,res) => {
    var query = {
        BookingDate: req.params.date
    }
    var booking = await bookingRepo.getBooking(query);
    if (booking)
        return res.send(booking);

    return res.status(404).send();  
})
.delete('/',async (req,res) => {
    var query = {
        _id: req.body.id
    }
    console.info(`email: ${query._id}`);
    var del = await bookingRepo.deleteBooking(query);
    if (!del)
        return res.send(del);

    return res.status(200).send(); 
})
.put('/:id', async (req,res)=>{
    var new_booking = req.body;
    var query = {_id: req.params.id};
    await bookingRepo.updateBooking(query,new_booking);
    return res.status(200).send();
});

module.exports = Router;