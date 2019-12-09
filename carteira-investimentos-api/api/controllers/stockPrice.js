const stockPriceHelper = require('../helpers/stockPrice');

module.exports = {
    get: async (app, req, res) => {
        const data = await stockPriceHelper.getData("bidi4");
        res.json(data);
    }
}