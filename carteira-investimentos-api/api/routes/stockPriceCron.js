const prefix = '/stock-price-cron';

module.exports = app => {
    app.get(`${prefix}/:symbol`, (req, res) => {
        app.api.controllers.stockPrice.getAndSaveStockPrice(app, req, res);
    });
}