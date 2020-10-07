const express = require('express');
const router = express.Router();
const transctionsCtrl = require('../controllers/transactions');


router.get('/transactions', transctionsCtrl.getTransactions);
router.post('/transactionHash', transctionsCtrl.getTransactionByHash);
module.exports = router;