const mongoose = require('mongoose');

let Orders = new mongoose.Schema({

    username : {
    	type : String
    },
    ProductId :{
    	type : String
    },
    quantity :{
    	type : Number
    }

});

module.exports = mongoose.model('Orders', Orders);	