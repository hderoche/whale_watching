const express = require('express');
const router = express.Router();
const transctionsCtrl = require('../controllers/transactions');


router.post('/transactions', transctionsCtrl.getTransactions);
module.exports = router;