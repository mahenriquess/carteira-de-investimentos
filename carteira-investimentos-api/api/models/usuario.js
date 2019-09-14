const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const { authSecret } = require('../../.env');

module.exports.save = (app, req, res, obterHash) => {
    obterHash(req.body.senha, hash => {
        const senha = hash;
        console.log(req.body);

        app.db('usuarios').insert({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha,
            status: 'A'
        })
        .then(_ => res.status(201).send())
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}

module.exports.login = async (app, req, res) => {
    if (!req.body.email || !req.body.senha){
        return res.status(400).send();
    }

    console.log('Realizando login...');

    const usuario = await app.db('usuarios')
        .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
        .first();

    if(usuario){
        bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
            if(err || !isMatch){
                return res.status(401).send();
            }

            const payload = {id: usuario.id};
            res.json({
                nome: usuario.nome,
                email: usuario.email,
                token: jwt.encode(payload, authSecret)
            });
        });
    } else {
        res.status(404).send();
    }
}