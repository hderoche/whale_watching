const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const listsASchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},  
  addresses: [{ address: String, count: Number}],
  count: {type: Number}
});
listsASchema.plugin(uniqueValidator);

  module.exports = mongoose.model('listsA', listsASchema);