const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    productName: {
        type: String
    },
    bundlePrice: {
        type: Number
    },
    bundleQuantity: {
        type: Number
    }
});

module.exports = mongoose.model('Product', Product);	