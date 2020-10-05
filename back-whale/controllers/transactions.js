const Transaction = require('../models/transaction');

exports.getTransactions = (req, res) => {
    Transaction.find().then( (transactions) => {
        res.status(200).json(transactions);
    }).catch( (error) => {
        res.status(400).json({error: 'Cannot retrieve all transactions'});
    });
};

exports.getTransactionsByWallet = (req,res) => {
    Transaction.find({from: {address: req.address}}).then( (transactions) => {
        res.status(200).json(transactions);
    }).catch( (error) => {
        res.status(400).json({
            error: 'Error in the query function'
        });
    });
};