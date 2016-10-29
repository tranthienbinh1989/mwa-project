"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var Product = require('../models/product');
var multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });


router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res) {
  // get all the products
    Product.find({}, function(err, products) {
    if (err) throw err;
        res.json(products);
    });
});

router.get('/:productId', function(req, res) {
  // get all the products
    Product.findById({_id: req.params.productId}, function(err, product) {
    if (err) throw err;
        res.json(product);
    });
});

router.post('/', function(req, res) {
    Product.create(req.body, function(err, product){
        if (err) throw err;
        console.log("Product created");
        let id = product._id;
        
        let response = {
            "message": "Product created successful."
        };
        res.json(response);
    });
});

router.put('/:productId', upload.single("image"), function(req, res) {
    let product = req.body;
    if (req.file) {
        product.image = req.file.filename;
    }
    Product.findByIdAndUpdate(req.params.productId, {
        $set: product
    }, {
        new: true
    }, function(err, product) {
        if (err) throw err;
        res.json(product);
    });
})


router.delete('/:productId', function (req, res, next) {
    Product.findByIdAndRemove(req.params.productId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


router.post("/upload", upload.single("image"), function(req, res) {
    let product = req.body;
    product.image = req.file ? req.file.filename : '';
    Product.create(product, function(err, product){
        if (err) throw err;
        console.log("Product created");
        let id = product._id;
        
        let response = {
            "message": "Product created successful.",
            "_id": id
        };
        res.json(response);
    });
});

module.exports = router;