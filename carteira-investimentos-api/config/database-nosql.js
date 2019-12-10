const mongoose = require('mongoose');
const cfg = require('../.env');

mongoose.connect(cfg.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("MONGODB: Conexão bem-sucedida. "))
    .catch(err => {console.log(err)});
    
mongoose.Promise = global.Promise;

module.exports = mongoose;