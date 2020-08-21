const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function qq(city, offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd.toLocaleString('en-ID', { hour12: false });
}

const OrderSchema = new Schema({
    food : [{
        type : Schema.Types.ObjectId,
        ref : 'Food'
    }],
    order_time : {
        type : String,
        default : qq('+8')
    },
    deliver_time : {
        type : String
    },
    subtotal : {
        type : String
    },
    order_type : {
        type : String
    },
    phone_number : {
        type : String
    },
    receiver : {
        type : String
    },
    address : {
        type : String
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Orders', OrderSchema);

exports.Order = Order;