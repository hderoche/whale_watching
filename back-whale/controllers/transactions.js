const Transaction = require('../models/transaction');

exports.getTransactions = (req, res) => {
    Transaction.find().limit(10).then( (transactions) => {
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

exports.getTransactionByHash = (req, res) => {
    Transaction.findOne({hash: req.body.hash}).then( (transaction) => {
        res.status(200).json(transaction);
    }).catch((error) =>{
        res.status(404).json({error: error.message});
    })
};