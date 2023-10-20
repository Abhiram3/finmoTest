const AccountService = require('../services/account');

const accountTopup = (request, response) => {
    try {
        const { currency, amount, accountId } = request.body;
        console.log(currency, amount, accountId);
        if (!currency || !amount || !accountId) {
            response.status(400).send('Invalid request!');
            return;
        }
        const currencyData = AccountService.fetchAccount(accountId) || AccountService.addAccount(accountId);
        const newAmount = (currencyData[currency] || 0) + amount;
        const newCurrencyData = AccountService.updateAccount(accountId, { ...currencyData, [currency]: newAmount});
        response.status(200).json({ [currency]: newCurrencyData[currency] });
    } catch (e) {
        console.log(e);
        response.status(500).send('Something went wrong!');
    }
}

const accountBalance = (request, response) => {
    try {
        const { accountId } = request.query;
        if (!accountId) {
            response.status(400).send('Invalid request!');
            return;
        }
        const currencyData = AccountService.fetchAccount(parseInt(accountId));
        if (!currencyData) {
            response.status(404).send('Data not found!');
        } else {
            response.status(200).json(currencyData);
        }
    } catch (e) {
        console.log(e);
        response.status(500).send('Something went wrong!');
    }
}

module.exports = {
    accountTopup,
    accountBalance
}