const axios = require('axios');
const FxService = require('../services/fx');

const fxRate = async (request, response) => {
    try {
        const { fromCurrency, toCurrency } = request.body;
        if (!fromCurrency || !toCurrency) {
            return response.status(400).send('Invalid request!');
        }
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Accept-Encoding': 'gzip, deflate, br'
            },
        };
        const url = `${process.env.FX_URL}&from_currency=${fromCurrency}&to_currency=${toCurrency}`;
        const { data: conversionData } = await axios.get(url, config);
        const rate = conversionData['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        const fxData = {
            rate,
            fromCurrency,
            toCurrency,
            expiryAt: Date.now() + process.env.SPOT * 1000
        }
        const quoteId = FxService.addRate(fxData);
        response.status(200).json({ quoteId, rate });
    } catch (e) {
        console.log(e);
        response.status(500).send('Something went wrong!');
    }
}

const fxConvert = (request, response) => {
    try {
        const { quoteId, amount } = request.body;
        if (!quoteId || !amount) {
            return response.status(400).send('Invalid Request!');
        }
        const { toCurrency, rate, expiryAt} = FxService.fetchRate(quoteId);
        if (Date.now() > expiryAt) {
            return response.status(400).send('Request Expired!');
        }
        const convertedAmount = amount * rate; 
        response.status(200).json({ currency: toCurrency, convertedAmount });
    } catch (e) {
        console.log(e);
        response.status(500).send('Something went wrong!');
    }
}

module.exports = {
    fxConvert,
    fxRate
}