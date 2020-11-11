const listsAddresses = require('../models/lists-addresses');
const Stats = require('../models/stats');
const Transaction = require('../models/transaction');

exports.getTransactions = (req, res) => {
    Transaction.find().sort({timestamp: -1}).limit(10).then( (transactions) => {
        res.status(200).json(transactions);
    }).catch( (error) => {
        res.status(400).json({error: 'Cannot retrieve all transactions'});
    });
};

exports.getTransactionsById = (req, res) => {
    Transaction.findById(req.params.id).then((transaction) =>{
        res.status(200).json(transaction);
    }).catch((err) => {
        res.status(404).json({error: 'cannot find the transaction'});
    })
}

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
    Transaction.findOne({hash: req.params.hash}).then( (transaction) => {
        res.status(200).json(transaction);
    }).catch((error) =>{
        res.status(404).json({error: error.message});
    })
};

exports.getBuyersAddress = (req, res) => {
    listsAddresses.find({title: "Buyers"}).then( (list) => {
        res.status(200).json(list);
    }).catch((err) => {
        res.status(404).send({error : err});
    });
};
exports.getSellersAddress = (req, res) => {
    listsAddresses.find({title: "Sellers"}).then( (list) => {
        res.status(200).json(list);
    }).catch((err) => {
        res.status(404).send({error : err});
    });
};

exports.getStats = (req, res) => {
    Stats.findOne().then((doc) =>{
        res.status(200).json(doc);
    }).catch((err) => {
        res.status(404).send({error: err});
    });
}