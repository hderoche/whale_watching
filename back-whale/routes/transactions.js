const express = require('express');
const router = express.Router();
const transctionsCtrl = require('../controllers/transactions');


router.get('/transactions', transctionsCtrl.getTransactions);
router.get('/address/buy', transctionsCtrl.getBuyersAddress);
router.get('/address/sell', transctionsCtrl.getSellersAddress);
router.post('/hash/:hash', transctionsCtrl.getTransactionByHash);
router.get('/stats', transctionsCtrl.getStats);
module.exports = router;