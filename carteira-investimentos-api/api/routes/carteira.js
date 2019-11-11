

const prefix = '/carteira';

module.exports = app => {
    
    app.use(prefix,app.api.middleware.passport.authenticate());

    app.get(`${prefix}/`, (req, res) => {
        app.api.controllers.carteira.get(app, req, res);
    });
    app.post(`${prefix}/`, (req, res) => {
        app.api.controllers.carteira.store(app, req, res);
    });

}