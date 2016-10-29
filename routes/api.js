"use strict";
var express = require('express');
var jwt    = require('jsonwebtoken');
var User    = require('../models/user');
var config = require('../config');
var app = express();
var router = express.Router();

/* authenticate */
router.post('/', function(req, res) {
  console.log(req.body);
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret , {
           expiresIn : 60*60*24 // expires in 24 hours
        });

        var body = { 
              _id: user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              admin: user.admin,
              token: token
        }
        // return the information including token as JSON
        res.json(body);
      }   

    }

  });
});

router.post('/register', function(req, res) {
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

module.exports = router;
