const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https');
const cron = require('node-cron');

app.use(express.json);



// MongoDB Atlas pwd : pQik6TGVZJkCGkFU
// MongoDB Atlas usr : hderoche
mongoose.connect(`mongodb+srv://hderoche:pQik6TGVZJkCGkFU@cluster0.f5hgc.mongodb.net/<dbname>?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=>{
    console.log('Successfully connected to MongoDB Atlas Whale')
}).catch((error)=>{
    console.log('Unable to connect to the database');
    console.error(error);
})

const Transaction = require('./models/transaction');
const { db } = require('./models/transaction');



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

convertToObject = (data) =>{
    if (data.count === 0) return;
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
        Transaction.findOne({timestamp: transaction.timestamp}).then(
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



// Fonction pour save les json dans la base de données MongoDB
// Fonction pour traiter les données, whale_watching

app.listen(3000);