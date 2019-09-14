module.exports = app => {
    app.post('/signup', app.api.usuario.save);
    app.post('/signin', app.api.auth.signin);

    app.get('/teste', (req, res) => {
        res.send('Api funcionando...');
    })
}