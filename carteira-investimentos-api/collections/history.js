const mongoose = require('mongoose');

const History = mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    simbolo:       {type: String, required: true, match: /^[A-Z0-9]{5}$/},
    nome:          {type: String, required: true},
    regiao:        {type: String, required: true},
    moeda:         {type: String, required: true, match: /^[A-Z]{3}$/},
    preco:         {type: Number, required: true},
    updated_at:    {type:Date}
});
History.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
})

module.exports = mongoose.model('histories', History);