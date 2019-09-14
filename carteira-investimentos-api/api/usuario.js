const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password,salt,null, (err, hash) => callback(hash));
        })
    }

    const save = (req, res) => {
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
            .then(_ => res.status(204).send())
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        });
    }

    return { save };
}