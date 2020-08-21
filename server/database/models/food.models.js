const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date();
const d = date.toLocaleDateString('id-ID', { year : 'numeric', month :'long', day :'numeric', weekday :'long', timezone : 'UTC', timeZoneName :'short' });

const FoodSchema = new Schema({
    name : {
        type : String,
        max: 25
    },
    price : {
        type : Number
    },
    qty : {
        type : Number,
        default : 0
    },
    description : {
        type : String,
        maxlength: 40
    },
    posted_time : {
        type : String,
        default: d
    },
    primary_img : {
        type : String
    },
    other_img : {
        type : []
    },
    created_by : {
        type : String
    },
    added_to_cart : false,
    tambahan_lauk : {
        ikan : false,
        telur : false,
        ayam : false
    },
    tambahan_lainnya : {
        sambel_goreng_tempe : false,
        serondeng_kelapa : false,
        sambel : false
    }
}, {
    timestamps : true
})
const Food = mongoose.model('Food', FoodSchema);

exports.Food = Food;