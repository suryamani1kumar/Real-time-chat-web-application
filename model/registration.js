const mongoose = require('mongoose')

const userregistration = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    number: {
        type: Number,
        require: true,
        unique: true,
    },

})

const userDetail = mongoose.model('registrationDetail', userregistration)

module.exports = userDetail;