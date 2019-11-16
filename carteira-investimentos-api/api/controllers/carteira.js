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
            return res.status(201).send(carteiraSaved);
        else
            return res.status(500).send('Erro ao salvar carteira');
        
    },

    destroy: async (app ,req, res) => {
        const id = req.params.id;

        if(!id) return res.status(400).send('Necessário ID para deleção');
        
        Carteira.destroy({
            where: {
                id,
                id_usuario: req.user.id
            }
        }).then(rowsDeleted => {
            if(rowsDeleted > 0)
                return res.status(202).send(`${rowsDeleted} carteira(s) excluída(s) com sucesso. `);
            else
                return res.status(403).send('Nenhuma carteira foi excluída. ');
        }).catch(e => {
            return res.status(500).send(e);
        });
    }
}