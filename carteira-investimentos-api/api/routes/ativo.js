const prefix = "/ativo";

module.exports = app => {
    app.use(prefix,app.api.middleware.passport.authenticate());

    app.put(`${prefix}/:id/acoes`, (req, res) => {
        app.api.controllers.ativo.venderAcoes(app, req, res);
    });
}