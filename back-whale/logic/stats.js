const Transaction = require('../models/transaction');
const Stats = require('../models/stats');
const ListA = require('../models/lists-addresses');
const mongoose = require('mongoose');


exports.update_stats = async () => {
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

exports.update_stat = async (data) => {
    const stats = await Stats.findOne();
    

    data.transactions.forEach(element => {
        if(stats.min > element.ammout_usd){
            min = element._id;
        }    
        if(stats.max < element.ammout_usd){
            max = element._id;
        }    
        stats.correlation.push({timstamp: element.timestamp, t_id: element._id})
    });

    stats.save().then((doc) => {
        console.log('doc saved!');
    }).catch(error => {
        console.log(error);
    });
}