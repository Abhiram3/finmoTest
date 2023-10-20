const accounts = new Map();

const addAccount = (accountId) => {
    accounts.set(accountId, {});
    return accounts.get(accountId);
}

const updateAccount = (accountId, update) => {
    accounts.set(accountId, update);
    return accounts.get(accountId);
}

const fetchAccount = (accountId) => {
    return accounts.get(accountId);
}

module.exports = {
    addAccount,
    updateAccount,
    fetchAccount
}