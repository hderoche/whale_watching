const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const transactionSchema = mongoose.Schema({
    blockchain: { type: String, required: true },
    symbol: { type: String, required: true },
    transaction_type: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    from: { 
        address: { type: String, required: true },
        owner_type : { type: String, required: true }
    },
    to: { 
        address: { type: String, required: true },
        owner_type : { type: String, required: true }
    },
    timestamp: { type: Number, required: true},
    amount: { type: Number, required: true },
    amount_usd: { type: Number, required: true },
    transaction_count: { type: Number, required: true }
});
transactionSchema.plugin(uniqueValidator);

  module.exports = mongoose.model('Transaction', transactionSchema);