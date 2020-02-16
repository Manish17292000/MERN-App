const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique :true

    },
    password: {
        type: String,
        required: true

    }
});

module.exports = mongoose.model('Customer', Customer);