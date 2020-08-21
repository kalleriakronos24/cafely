const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto-random-string');
const rand = crypto({ length : 20, type : 'base64' })
const date = new Date();
const d = date.toLocaleDateString('id-ID', { year : 'numeric', month :'long', day :'numeric', weekday :'long', timezone : 'UTC', timeZoneName :'short' });

const UserSchema = new Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    fullname : {
        type : String
    },
    password : {
        type : String
    },
    roles : {
        type : String,
        default : 'Member'
    },
    account_created : {
        type : String,
        default : d
    },
    api_token : {
        type : String,
        default : rand
    },
    verified : false
}, {
    timestamps : true
})

const User = mongoose.model('User', UserSchema);

exports.User = User;