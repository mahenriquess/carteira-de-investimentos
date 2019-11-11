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

        console.log(carteiraSaved);

        if(carteiraSaved)
            return res.status(201).send(carteiraSaved)
        else
            return res.status(500).send('Erro ao salvar carteira');
        
    },

    destroy: async  (app ,req, res) => {
        const { id } = req.query;

        if(!id) res.status(400).send('Necessario ID para deleção');
        Carteira.destroy({
            where: {
                id,
                id_usuario: req.user.id
            }
        }).then(rowsDeleted => {
            console.log(rowsDeleted);
            if(rowsDeleted > 0)
                res.status(202).send('Deletado com sucesso');
            else
                res.status(403).send();
        }).catch(e => {
            res.status(500).send(e);
        });
        

       
    }
}