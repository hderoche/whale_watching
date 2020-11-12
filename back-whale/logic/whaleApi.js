const mongoose = require('mongoose');
const https = require('https');
const Transaction = require('../models/transaction');

const cron = require('node-cron');
const listA = require('./list-addresses');
const stats = require('./stats');

exports.cronFunc = () =>{
    var dataRequest ='';
    cron.schedule('*/10 * * * * *', () =>{
        const time = Math.floor(Date.now()/1000) - 10;
        console.log(time);
        
        https.get(`https://api.whale-alert.io/v1/transactions?api_key=3PDbyvfzkuFHP3BEyfuAhP2uiKJEE9aT&min_value=500000&start=${time}&cursor=2bc7e46-2bc7e46-5c66c0a7`, (res) => {
            console.log(res.statusMessage)
            res.setEncoding('utf-8');
            res.on('data', (d) =>{
                dataRequest += d;
            });
            res.on('end', () =>{
                dataRequest = JSON.parse(dataRequest);
                console.log(dataRequest.count);
                convertToObject(dataRequest);
                dataRequest='';
            });
            
        }).on('error', (e)=>{
            console.log('Error on Https request')
        })
        
    });

}
convertToObject = (data) =>{
    if (data.count === 0) return;
    listA.listAddresses(data);
    stats.stats(data);
    data.transactions.forEach(
        (t) => {
        // for the Transaction object I decided to go with strings of strings
        // seems to be the easiest way, might change later
        const transaction = new Transaction({
            blockchain: t.blockchain,
            symbol: t.symbol,
            transaction_type: t.transaction_type,
            hash: t.hash,
            from: { 
                address: t.from.address,
                owner_type : t.from.owner_type
            },
            to: { 
                address: t.to.address,
                owner_type : t.to.owner_type
            },
            timestamp: t.timestamp,
            amount: t.amount,
            amount_usd: t.amount_usd,
            transaction_count: t.transaction_count
        });
        Transaction.findOne({hash: transaction.hash}).then(
            (db_transaction) =>{
                if (db_transaction === null){
                    transaction.save().then(() =>{
                        console.log('Successfully added to the database');
                    }).catch((error) => {
                        console.log({message: error.message});
                    })
                };
            }).catch( (error) =>{
                console.log({message: error.message});
            })
    });
}
