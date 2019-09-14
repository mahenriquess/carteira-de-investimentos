const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const signin = async (req, res) => {

        if (!req.body.email || !req.body.senha){
            return res.status(400).send('Dados incompletos');
        }

        console.log('Realizando login...');

        const usuario = await app.db('usuarios')
            .whereRaw("LOWER(email) = LOWER(?)",req.body.email)
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
        }else{
            res.status(400).send('Email não encontrado !');
        }
    }

    return { signin };
}