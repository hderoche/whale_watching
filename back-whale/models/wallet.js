const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const walletSchema = mongoose.Schema({
    address : { type: String, required: true },
    owner_type : { type: String, required: true }
})
walletSchema.plugin(uniqueValidator);
  
module.exports = mongoose.model('Wallet', walletSchema);