var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validation = require('validator');

var BookingSchema = new Schema({
    Created: {
        type: Date,
        default: Date.now()
    },
    Name: {
        type: String,
        required: [true, 'Customer name can not be blanked']
    },
    Email: {
        type: String,
        validate: {
            validator: validation.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    BookingDate:{
        type: Date,
        required: [true, 'Please select Booking Date']
    },
    Phone:{
        type: String,
        validate: {
            validator: validation.isMobilePhone,
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    Description:{
        type: String
    },
    IsConfirm:{
        type: Boolean,
        default: false
    },
    Status:{
        type: String,
        default: 'Initial'
    }
});

BookingModel = mongoose.model('Booking',BookingSchema);

module.exports = {
    Booking: BookingModel
} 