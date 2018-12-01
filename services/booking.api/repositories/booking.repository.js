const model = require('../model/booking').Booking;

// class BookingRepository {
    // constructor(){}
    // async createBooking (booking,cb) {
    //     var booking = await model.save(booking).exec();
    //     console.info(`save entity ${booking}`);
    // };
    // async getAllBooking () {
    //     var bookings = await model.find({}).exec();
    //     if(bookings != null)
    //         return bookings;
    // }
    // createBooking: async function () {
    //     var booking = await model.save(booking).exec();
    //     console.info(`save entity ${booking}`);
    // };

    // getAllBooking = async function () {
    //     var bookings = await model.find({}).exec();
    //     if (bookings != null)
    //         return bookings;
    // }

// }

// BookingRepository.createBooking = async () => {
//     var booking = await model.save(booking).exec();
//     console.info(`save entity ${booking}`);
// }

// BookingRepository.getAllBooking = async () => {
//     var bookings = await model.find({}).exec();
//     if (bookings != null)
//         return bookings;
// }
// module.exports = BookingRepository;

module.exports.getAllBooking = async function () {
    try {
        var bookings = await model.find({}, { sort: { Created: -1 }}).exec();
        if (bookings != null)
            return bookings;
    } catch (error) {
        console.error(`error:  ${error}`);
    }

};

module.exports.getBooking = async function (query) {
    try {

        var _query = JSON.stringify(query);
        Object.keys(query).forEach( key =>
            console.debug(`query_key: ${key} | query_value: ${query[key]}`)
        );
        
        console.debug(`query ${_query}`)
        var bookings = await model.find(query).exec();
        if (bookings != null)
            return bookings;
    } catch (error) {
        console.error(`error:  ${error}`);
    }

};

module.exports.createBooking = async function (bk_dt,name,email,mobile_no,description) {
    try {
        var save_entity = await model.create({
            Name: name,
            Email: email,
            BookingDate: bk_dt,
            Phone: mobile_no,
            Description: description
        });
        console.info(`save entity ${save_entity}`);
        return save_entity;
    } catch (error) {
        console.error(`error:  ${error}`);
    }
};

module.exports.createBookingV2 = async function (entity) {
    try {
        var save_entity = await model.create(entity);
        console.info(`repository save entity ${entity}`);
        return save_entity;
    } catch (error) {
        console.error(`error:  ${error}`);
    }
};

module.exports.deleteBooking = async function (query) {
    try {

        var _query = JSON.stringify(query);
        Object.keys(query).forEach(key =>
            console.debug(`query_key: ${key} | query_value: ${query[key]}`)
        );

        console.debug(`query ${_query}`)
        var bookings = await model.deleteOne(query).exec();
        if (bookings != null)
            return bookings;
    } catch (error) {
        console.error(`error:  ${error}`);
    }

}