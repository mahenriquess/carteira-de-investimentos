const stockPriceHelper = require('../helpers/stockPrice');
const mongoose = require('../../config/database-nosql');
const History = require('../../collections/history');
const Ativo = require('../models/Ativo');

module.exports = {
    getAndSaveStockPrice: async (app, req, res) => {
        try {
            const data = await stockPriceHelper.getData(req.params.symbol.toUpperCase()); 
            const ativos = await Ativo.findAll({ where: { codigoEmpresa: data.simbolo }});

            // data.preco = 15.96;
            ativos.forEach(ativo => {
                const valorCompra = ativo.qtdAcoes * data.preco;
                const valorMoedaAtual = data.preco
                ativo.update({valorCompra, valorMoedaUltimaAtualizacao: valorMoedaAtual});
            });

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
            const data = await History.findOne({simbolo: simbolo.toUpperCase()}).sort({'updated_at': -1});
            res.json(data);
        }catch(err){
            res.status(500).send({message: "Erro ao buscar ultimo histórico da empresa "+simbolo});
        }
    },

    list: async(app, req, res) => {
        const data = await History.find({});
        res.json(data);
    },
}