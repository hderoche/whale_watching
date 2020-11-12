const Transaction = require('../models/transaction');
const Stats = require('../models/stats');
const ListA = require('../models/lists-addresses');
const mongoose = require('mongoose');


exports.create_stats = async () => {
    const stats = await Stats.findOne();
    console.log(stats)
    const transactions = await Transaction.find();
    const listA = await ListA.find();
    /*
    stats = {
        min: null,
        max: null,
        mean: null,
        big_buyer: null,
        big_seller: null,
        correlation: null
    }
    */
    
    // Processing the transactions
    let mean = 0;

    const correlation = []
    let min = transactions[0].amount_usd;
    let minId = transactions[0]._id;
    let maxId = transactions[0]._id;
    let max = transactions[0].amount_usd;

    transactions.forEach(element => {
        mean = mean + element.amount_usd;
        if(max < element.amount_usd) {
            max = element.amount_usd;
            maxId = element._id;
        }
        if(min > element.amount_usd) {
            min = element.amount_usd;
            minId = element._id;
        }
        // Porcessing for correlation
        correlation.push({timstamp: element.timestamp, t_id: element._id});
    });
    mean = mean/(transactions.length);
    stats.max = maxId.toString();
    stats.min = minId.toString();
    stats.mean = mean;

    // Processing the Addresses

    let big_buyer = listA[0].addresses[0];
    let big_seller= listA[1].addresses[0];
    listA.forEach(element =>{
        element.addresses.forEach(e => {
            if(element.title === "Buyers"){
                if(big_buyer.count < e.count && e.address !== "Multiple Addresses"){
                    big_buyer = e;
                }
            }
            if(element.title === "Sellers"){
                if(big_seller.count < e.count){
                    big_seller = e;
                }
            }
        })
    })

    stats.big_buyer = big_buyer;
    stats.big_seller = big_seller;
    stats.correlation = correlation;



    stats.save().then((doc) =>{
        console.log("stats saved!");
    }).catch((err) => {
        console.log(err)
    })
};

exports.update_stats = async (data) => {
    const stats = await Stats.findOne();
    
    minTransaction = await Transaction.findOne({_id: stats.min});
    maxTransaction = await Transaction.findOne({_id: stats.max});
    
    // Temporary comparison, so that the update is done once

    maxTemp = {amount: data.transactions[0].amount_usd, Id: data.transactions[0]._id};
    minTemp = {amount: data.transactions[0].amount_usd, Id: data.transactions[0]._id};
    meanTemp = 0
    data.transactions.forEach(element => {
        if(minTemp.amount_usd > element.ammout_usd){
            minTemp.amount = element.amount_usd;
            minTemp.Id = element._id;
            
        }    
        if(maxTemp < element.ammout_usd){
            maxTemp = element.amount_usd;
            maxTemp.Id = element._id;
        }    
        stats.correlation.push({timstamp: element.timestamp, t_id: element._id})
        meanTemp = meanTemp + element.amount_usd;
    });

    if(maxTemp.amount > maxTransaction.amount_usd){
        stats.max = maxTemp.Id;
    }
    if(minTemp.amount > minTransaction.amount_usd){
        stats.min = minTemp.Id;
    }

    stats.mean = (meanTemp + mean)/(data.transactions.length + 1)

    // Updating the biggest Buyers and Sellers, but need to fetch all the Transactions and iterate through it.

    stats.save().then(() => {
        console.log('doc saved!');
    }).catch(error => {
        console.log(error);
    });
}

exports.stats = async (data) => {
    const stats = await Stats.findOne();
    const transactionsMongoose = await Transaction.find();
    let mean = 0
    let max = transactionsMongoose[0].amount_usd
    let min = transactionsMongoose[0].amount_usd
    let maxId = transactionsMongoose[0].address.from
    let minId = transactionsMongoose[0].address.from
    transactionsMongoose.forEach(tx => {
        iterate(tx, mean, max, min, maxId, minId)
    })
    if(data.count !== 0 ) {
        data.transactions.forEach(tx => {
            iterate(tx, mean, max, min, maxId, minId)
        })
    }
    stats.mean = mean / transactionsMongoose.length;
    stats.max = maxId;
    stats.min = minId;

    stats.save().then(() => {
        console.log('doc saved');
    }).catch((err) => console.error(err))
}

function iterate(tx, mean, max, min, maxId, minId) {
    mean += tx.amount_usd
    if(max < tx.amount_usd) {
        max = tx.amount_usd
        maxId = tx.address.from
    }
    if(min > tx.amount_usd){
        min = tx.amount_usd
        minId = tx.address.from
    }
}