const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https');
app.use(express.json);



// MongoDB Atlas pwd : pQik6TGVZJkCGkFU
// MongoDB Atlas usr : hderoche
mongoose.connect(`mongodb+srv://hderoche:pQik6TGVZJkCGkFU@cluster0.f5hgc.mongodb.net/<dbname>?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=>{
    console.log('Successfully connected to MongoDB Atlas Whale')
}).catch((error)=>{
    console.log('Unable to connect to the database');
    console.error(error);
})

var cron = require('node-cron');
cron.schedule('*/7 * * * * *', () =>{
    const time = Math.floor(Date.now()/1000) - 7;
    console.log(time);
    
    https.get(`https://api.whale-alert.io/v1/transactions?api_key=3PDbyvfzkuFHP3BEyfuAhP2uiKJEE9aT&min_value=500000&start=${time}&cursor=2bc7e46-2bc7e46-5c66c0a7`, (res) => {
        console.log(res.statusMessage)
        res.setEncoding('utf-8');
        res.on('data', (d) =>{
            console.log(d);
        });
        
    }).on('error', (e)=>{
        console.log('Error on Https request')
    });
});
app.listen(3000);