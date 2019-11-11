const Carteira = require('../models/Carteira');

module.exports = {
    get: async (app, req, res) => {
        const carteiras = await Carteira.findAll({
            where: {id_usuario: req.user.id}
        });

        return res.send(carteiras);
    },

    store: async (app ,req, res) => {
        const {nome, valor} = req.body;
        if(!nome || !valor) return res.status(400).send("Nome e Valor são requeridos");

        const carteiraSaved = await Carteira.create({
            nome,
            valor,
            id_usuario: req.user.id
        });

        if(carteiraSaved)
            return res.status(201).send(carteiraSaved)
        else
            return res.status(500).send('Erro ao salvar carteira');
        
    }
}