const prefix = '/stock-price';


module.exports = app => {
    app.get(`${prefix}/`, (req, res) => {
        app.api.controllers.stockPrice.get(app, req, res);
    });
}