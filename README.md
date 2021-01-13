# Whale_watching Project 

Using the Whale_Alert API to track big transactions (Work in Progress)


|NodeJS|Angular|
|---|---|
|Backend|Frontend|

## Statistics

The end goal is to analyse the whales on the crypto market and create/use my own metrics based on the data gathered uing the Whale_Alert API


## Front End | Angular

Using Angular, Angular Material
I display the stats and the transactions from the server nicely

## Back End | NodeJS

The server is running on my Raspberry Pi and it stores the large transactions of the Whale Alert API into a Mongo database
Everytime there is a new entry, it updates the stat file in the DB 

Using Node-cron, I am sending request every 7 seconds, to the Whale_Alert API to get the latest data from the API

Maybe **webSocket** later for real time update

