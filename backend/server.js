const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();
const productRoutes = express.Router();
const vendorRoutes = express.Router();
const customerRoutes = express.Router();
const orderRoutes = express.Router();

let User = require('./models/user');
let Vendor = require('./models/vendor');
let Customer = require('./models/customer');
let Product = require('./models/product.model');
let Orders = require('./models/orders');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the customers
userRoutes.route('/customerget').get(function(req, res) {
    Customer.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Getting all the vendors
userRoutes.route('/vendorget').get(function(req, res) {
    Vendor.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new vendor
userRoutes.route('/vendoradd').post(function(req, res) {
    let user = new Vendor(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfullys'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new customer
userRoutes.route('/customeradd').post(function(req, res) {
    let user = new Customer(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfullys'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
vendorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Vendor.find({username : id}, function (err, docs){
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    });
});
// Getting a user by id
customerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Customer.find({username : id}, function (err, docs){
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    });
});

productRoutes.route('/').get(function(req, res) {
    Product.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

productRoutes.route('/:id/:id2').get(function(req, res) {
    let id = req.params.id;
    let id2 = req.params.id2;
    Product.find({username : id, status : id2}, function (err, docs){
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
productRoutes.route('/search/:id2/:id3').get(function(req, res) {
    let id2 = req.params.id2;
    let id3 = req.params.id3;
    if (id3==='-')
    {
        Product.find(function (err, docs)
    {
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    });
    }
    else{
    const regex = new RegExp(escapeRegex(id3), 'gi');
    console.log(regex)
    Product.find({productName: regex}, function (err, docs)
    {
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    });
    
    }
});

productRoutes.route('/sort/bundlePrice/:id2/:id3').get(function(req, res) {
    let id2 = req.params.id2;
    let id3 = parseInt(req.params.id3);

    Product.find({status : id2}, function (err, docs)
    {
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    }).sort({"bundlePrice" : id3});
});
productRoutes.route('/sort/leftQuantity/:id/:id3').get(function(req, res) {
    let id3 = parseInt(req.params.id3);
    let id = req.params.id2;
    Product.find({ status : id}, function (err, docs)
    {
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    }).sort({"leftQuantity" : id3});
});
productRoutes.route('/sort/rating/:id2/:id3').get(function(req, res) {
    let id2 = req.params.id2;
    let id3 = parseInt(req.params.id3);
    Product.find({ status : id2}, function (err, docs)
    {
        if (err) 
        {
            console.log(err);
        }
        else
        { 
             res.json(docs);
        }
    }).sort({"rating" : id3});
});


productRoutes.route('/add').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

productRoutes.route('/update').post(function(req, res) {
    // console.log(req.body["id"]);
    Product.findByIdAndUpdate(req.body["id"] , {
    $set: {leftQuantity : req.body["newleftQuantity"], status : req.body["status"] }
   } )
   
   .catch( error => {
    console.log( `Error updating user by ID: ${error.message}` );
    next( error );
   } );
});

orderRoutes.route('/add').post(function(req, res) {
    // console.log()
    let Order = new Orders(req.body);
    Order.save()
        .then(product => {
            res.status(200).json({'User': 'Order added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

orderRoutes.route('/').get(function(req, res) {
    Orders.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

app.use('/', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/customer', customerRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
