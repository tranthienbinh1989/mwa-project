"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Order = require('../models/order');

router.use(bodyParser.json());

router.get('/', function(req, res) {
  // get all the orders
    Order.find({}, function(err, orders) {
    if (err) throw err;
        res.json(orders);
    });
});

router.get('/:orderId', function(req, res) {
  // get order
    Order.findById({_id: req.params.orderId}, function(err, order) {
    if (err) throw err;
        res.json(order);
    });
});

router.get('/users/:username', function(req, res) {
  // get order
    Order.find({username: req.params.username}, function(err, orders) {
    if (err) throw err;
        res.json(orders);
    });
});


router.post('/', function(req, res) {
    Order.create(req.body, function(err, order){
        if (err) throw err;
        console.log("Order created");
        let id = order._id;
        
        let response = {
            "message": "Order created successful.",
            order: order,
        };
        res.json(response);
    });
});

router.put('/:orderId', function(req, res) {
    Order.findByIdAndUpdate(req.params.orderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, order) {
        if (err) throw err;
        res.json(order);
    });
})


router.delete('/:orderId', function (req, res, next) {
    Order.findByIdAndRemove(req.params.orderId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = router;