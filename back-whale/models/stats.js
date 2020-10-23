const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const statsSchema = mongoose.Schema({
  min: String,
  max: String,
  mean: Number,
  big_buyer: {address: String, count: Number},
  big_seller: {address: String, count: Number},
  correlation: [{timstamp: Number, t_id: String}]
});


  module.exports = mongoose.model('Stats', statsSchema);