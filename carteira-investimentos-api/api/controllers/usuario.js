const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const { authSecret } = require('../../.env');

module.exports = {
    async store(req, res) {
        
        const usuario = await Usuario.create({ nome, sobrenome, email, senha });

        return res.json(usuario);
    }
}

module.exports.signup = async (app, req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

    app.api.helpers.hash.obterHash(senha, hash => {
        const senhaEncript = hash;
            Usuario.create({nome,sobrenome,email, senha: senhaEncript})
                .then(data => res.status(201).send())
                .catch(err => res.status(400).json(err));
    });
}

module.exports.signin = async (app, req, res) => {
    if (!req.body.email || !req.body.senha){
        return res.status(400).send();
    }

    const {email, senha} = req.body;
    
    Usuario.findOne({where: {email}})
        .then(usuario => {
            if(!usuario) res.status(404).send();

            bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).send();
                }

                console.log(usuario.carteiras);
    
                const payload = {id: usuario.id};
                res.json({
                    nome: usuario.nome,
                    email: usuario.email,
                    token: jwt.encode(payload, authSecret)
                });
            });
        })
        .catch(err => res.status(500).send());
}