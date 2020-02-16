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

let User = require('./models/user');
let Vendor = require('./models/vendor');
let Customer = require('./models/customer');
let Product = require('./models/product.model');

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
            console.log(docs);
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
            // console.log(docs.username);
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


app.use('/', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/customer', customerRoutes);
app.use('/product', productRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
