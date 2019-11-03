const bcrypt = require('bcrypt-nodejs');

module.exports.obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password,salt,null, (err, hash) => callback(hash));
    })
} 