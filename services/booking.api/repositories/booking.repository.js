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

module.exports.getAllBooking = async () => {
    try {
        console.info(`get to repo`);
        var bookings = await model.find({}).exec();
        console.info(`bookings: ${bookings}`);
        if (bookings != null)
            return bookings;
    } catch (error) {
        console.error(`error:  ${error}`);
    }

};

module.exports.getBooking = async (query) => {
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

module.exports.createBooking = async (bk_dt,name,email,mobile_no,description) => {
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

module.exports.createBookingV2 = async (entity) => {
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

};

module.exports.updateBooking = async (query,content) => {
    try {
        // var entity = await model.where(query);
        // console.debug(`found entity: ${typeof(entity)}`);
        // if(entity)
        //     throw new Error(`can't find entity`);            
        // var save_entity = await entity.update(content);
        // if(save_entity <= 0)
        //     throw new Error(`can't update booking`);
        var save_entity = await model.where(query).update(content);
        console.debug(`save_entity: ${save_entity}`);
        Object.keys(save_entity).forEach((key) => {
            console.debug(`save_entity key ${key} and value ${save_entity[key]} - type ${typeof(save_entity[key])} `);
        } );
        if(save_entity.nModified <= 0)
            throw new Error(`can't update booking`);
    } catch (error) {
        console.error(`error: ${error}`);
        throw new Error(`system error`);
    }


};