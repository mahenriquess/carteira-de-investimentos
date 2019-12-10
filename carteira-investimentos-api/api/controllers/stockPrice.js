const stockPriceHelper = require('../helpers/stockPrice');
const mongoose = require('../../config/database-nosql');
const History = require('../../collections/history');

module.exports = {
    get: async (app, req, res) => {

        try {
            const data = await stockPriceHelper.getData(req.params.symbol); 
            const hist = {...data};

            const history = new History({
                _id: mongoose.Types.ObjectId(),
                simbolo: hist.simbolo,
                nome: hist.nome,
                regiao: hist.regiao,
                moeda: hist.moeda,
                preco: hist.preco
            });

            history.save()
            .then(result => {
                console.log(result);
                res.json(hist)
            })
            .catch(err => {
                console.log(err);
                res.status(500).send();
            })

        } catch(err) {
            console.log(err);
            res.status(500).send();
        }
    }
}