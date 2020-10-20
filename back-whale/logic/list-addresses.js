const Transaction = require('../models/transaction');
const mongoose = require('mongoose');

const ListA = require('../models/lists-addresses');


exports.findFiles = async () =>{
    let buyersList = null;
    let sellersList = null;
    try{
        buyersList = await ListA.findOne({title: "Buyers"});
        sellersList = await ListA.findOne({title: "Sellers"});
    } catch {
        console.log();
    }
    return [buyersList, sellersList]
    
}

// buyers & sellers are Object that contains list of unique addresses
// 
// Won't be using it again as it was only to generate the document in the first place
exports.listAddresses = async () => {
    lists = await this.findFiles();
    buyers = lists[0];
    sellers = lists[1];
    if((buyers === null || buyers === undefined)||(sellers === null || sellers === undefined)) {
        return;
    }else {
        const transactions = await Transaction.find();
        transactions.forEach(element => {
            if (!buyers.addresses.includes(element.from.address)){
                buyers.addresses.push(element.from.address);
            }
            if (!sellers.addresses.includes(element.to.address)){
                sellers.addresses.push(element.to.address);
            }
        });
        buyers.count = buyers.addresses.length        
        sellers.count = sellers.addresses.length        
        
        buyers.save().then((doc) => {
            console.log(doc.title + " updated!");
        }).catch((err)=> {
            console.log(err);
        });
        sellers.save().then((doc) => {
            console.log(doc.title + " updated!");
        }).catch((err)=> {
            console.log(err);
        });
        
    }
    
}


exports.add_to_list = async (data) => {
    try {
        // asyncronous function because expect a promise from mongoose db
        lists = await this.findFiles();
        buyers = lists[0];
        sellers = lists[1];
        data.transactions.forEach(element => {
            if(!buyers.addresses.includes(element.from.address)){
                buyers.addresses.push(element.from.address)
            }
            if(!sellers.addresses.includes(element.to.address)){
                sellers.addresses.push(element.to.address)
            }
        });    
    } catch {
        console.log("Error in the add_to_list function");
    }
}