module.exports = app => {
    app.post('/signup', (req, res) => {
        app.api.controllers.usuario.signup(app, req, res);
    });

    app.post('/signin', (req, res) => {
        app.api.controllers.usuario.signin(app, req, res);
    });

    app.post('/store', (req, res) => {
        console.log(req.body);
        // app.api.controllers.usuario.store(req, res);
    });
}