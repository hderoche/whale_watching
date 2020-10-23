const Transaction = require('../models/transaction');
const mongoose = require('mongoose');

const ListA = require('../models/lists-addresses');



exports.findFiles = async () =>{
    let buyersList = null;
    let sellersList = null;
    try{
        buyersList = await ListA.find({title: "Buyers"});
        sellersList = await ListA.find({title: "Sellers"});

        /*
        buyersList = await ListA.findOne({title: "Buyers"});
        sellersList = await ListA.findOne({title: "Sellers"});

        if(buyersList === null) {
            buyersList = {title: "Buyers", addresses: [], count: 0}
        }
        if(sellersList === null) {
            sellersList = {title: "Buyers", addresses: [], count: 0}
        }

        */
    } catch {
        console.log();
    }
    return [buyersList, sellersList]
    
}

// buyers & sellers are Object that contains list of unique addresses
// 
// Won't be using it again as it was only to generate the document in the first place
exports.listAddresses = async (data) => {
    lists = await this.findFiles();
    buyers = lists[0][0];
    sellers = lists[1][0];

    //buyers = {title: "Buyers", addresses: [], count: 0}
    //sellers = {title: "Sellers", addresses: [], count: 0}
    if((buyers === null || buyers === undefined)||(sellers === null || sellers === undefined)) {
        return;
    }else {

        data.forEach(element => {
            let containB = false;
            let containS = false;
            buyers.addresses.forEach( a => {
                if(element.from.address === a.address){
                    containB = true;
                    a.count++;
                }
            });
            if(containB === false) {
                buyers.addresses.push({address: element.from.address, count: 1});
            }

            sellers.addresses.forEach(a => {
                if(element.to.address === a.address){
                    containS = true;
                    a.count++;
                }
            });
            if(containS === false) {
                sellers.addresses.push({address: element.to.address, count: 1});
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
            if(!buyers.addresses.address.includes(element.from.address)){
                buyers.addresses.push({address: element.from.address, count: 0})
            } else{
                i = buyers.find()
            }
            if(!sellers.addresses.address.includes(element.to.address)){
                sellers.addresses.push({address: element.to.address, count: 0})
            }

        });    
    } catch {
        console.log("Error in the add_to_list function");
    }
}