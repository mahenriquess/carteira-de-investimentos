const stockPriceHelper = require('../helpers/stockPrice');

module.exports = {
    get: async (app, req, res) => {
        const data = await stockPriceHelper.getData(req.params.symbol);        
        res.json(data);
    }
}