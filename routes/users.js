"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');

router.use(bodyParser.json());

router.get('/', function(req, res) {
  // get all the users
    User.find({}, function(err, users) {
    if (err) throw err;
        res.json(users);
    });
});

router.get('/:userId', function(req, res) {
  // get user
    User.findById({_id: req.params.userId}, function(err, user) {
    if (err) throw err;
        res.json(user);
    });
});

router.post('/', function(req, res) {
    User.create(req.body, function(err, user){
        if (err) throw err;
        console.log("User created");
        let id = user._id;
        
        let response = {
            "message": "User created successful.",
            user: user,
        };
        res.json(response);
    });
});

router.put('/:userId', function(req, res) {
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, {
        new: true
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
})


router.delete('/:userId', function (req, res, next) {
    User.findByIdAndRemove(req.params.userId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});




module.exports = router;