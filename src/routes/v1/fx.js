const express = require('express');
const router = express.Router();
const fxController = require('../../controllers/fx');

const { fxRate, fxConvert } = fxController;

router.post('/rate', fxRate);

router.get('/convert', fxConvert);

module.exports = router;