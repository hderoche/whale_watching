const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Transaction = require('./transaction');


const documentSchema = mongoose.Schema({
    result : { type: String, required: true },
    cursor : { type: String, required: true },
    count : { type: Number, required: true },
    transactions : { type: Array(Transaction), required: true },
});
documentSchema.plugin(uniqueValidator);
  
module.exports = mongoose.model('Document', documentSchema);