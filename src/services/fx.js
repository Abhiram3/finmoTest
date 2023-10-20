const crypto = require("crypto");

const fxRates = new Map();


const addRate = (data) => {
    const id = crypto.randomBytes(16).toString("hex");
    fxRates.set(id, data);
    return id;
}

const fetchRate = (id) => {
    return fxRates.get(id);
}

module.exports = {
    addRate,
    fetchRate
}