const bcrypt = require('bcrypt-nodejs');
const Usuario = require('../models/usuario');

module.exports.signup = (app, req, res) => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password,salt,null, (err, hash) => callback(hash));
        })
    } 
     
    Usuario.save(app, req, res, obterHash);
}

module.exports.signin = async (app, req, res) => {
    Usuario.login(app, req, res);
}