var express = require('express');
const router = express.Router();
const accountsController = require('../../controllers/accounts');

const { accountTopup, accountBalance } = accountsController;

router.post('/topup', accountTopup);

router.get('/balance', accountBalance);

module.exports = router;