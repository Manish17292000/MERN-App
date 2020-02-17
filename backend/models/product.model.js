const mongoose = require('mongoose');

let Product = new mongoose.Schema({

    username : {
    	type : String
    },
    productName: {
        type: String
    },
    bundlePrice: {
        type: Number
    },
    bundleQuantity: {
        type: Number
    },
    leftQuantity: {
        type: Number
    },
    status: {
    	type : String
        
    }

});

module.exports = mongoose.model('Product', Product);	