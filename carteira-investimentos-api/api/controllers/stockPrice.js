const stockPriceHelper = require('../helpers/stockPrice');
const mongoose = require('../../config/database-nosql');
const History = require('../../collections/history');

module.exports = {
    getAndSaveStockPrice: async (app, req, res) => {
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
    },

    get: async (app, req, res) => {
        const {simbolo} = req.params;
        if(!simbolo){
            res.status(400).send({message: "Necessário simbolo"});
        }
        try{
            const data = await History.findOne({simbolo}).sort({'updated_at': -1});
            res.json(data);
        }catch(err){
            res.status(500).send({message: "Erro ao buscar ultimo histórico da empresa "+simbolo});
        }
    }
}