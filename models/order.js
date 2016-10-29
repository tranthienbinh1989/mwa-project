// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user");

// create a schema
var productSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  quantity: Number,
});

// create a schema
var orderSchema = new Schema({
  username: String,
  products: [productSchema],
  total: Number,
  numProduct: Number,
  created_at: Date,
  updated_at: Date,
});

// the schema is useless so far
// we need to create a model using it
var Order = mongoose.model('Order', orderSchema);

// make this available to our users in our Node applications
module.exports = Order;