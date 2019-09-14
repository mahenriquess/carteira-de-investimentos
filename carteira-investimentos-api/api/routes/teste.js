module.exports = app => {
    //Verificar implementação de middleware de autenticação (app.use()).
    app.use((req, res, next) => {
        //res.status(400).send("Deu ruim");
        next();
    });

    app.get('/teste', (req, res) => {
        app.api.controllers.teste.logTeste(app, req, res);
    });
}
