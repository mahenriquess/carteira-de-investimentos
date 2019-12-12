const Carteira = require('../models/Carteira');

const association = {
    include: [
        {association: 'usuario'},
        {association: 'ativos'}
    ]
}
module.exports = {

    getAll: async (app, req, res) => {
        try{
            const carteiras = await Carteira.findAll(association);
            
            return res.send(carteiras);
        }catch(err){
            return res.status(500).send(err);
        }

    },
    get: async (app, req, res) => {
        const carteiras = await Carteira.findAll({
            where: {id_usuario: req.user.id},
            ...association
        });

        console.log(carteiras);

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

    clearTable: async (app, req, res) => {
        await Carteira.destroy({
            where: {},
            truncate: true
        });
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
    },

    addAtivo: async (app, req, res) => {
        const { idCarteira, ativo } = req.body;
        if(!idCarteira){
            return res.status(400).send({message: "Necessário informar carteira que deve ser adicionado o ativo"});
        }

        const carteira = await Carteira.findByPk(idCarteira);

        if(!carteira){
            return res.status(401).send({message: "Carteira não encontrada"});
        }

        const ativoCreated = await carteira.addAtivo(ativo);

        if(ativoCreated){
            return res.send({message: `Ativo adicioando com sucesso à carteira ${carteira.nome}`});
        }

        return res.status(500).send({message: "Erro ao salvar ativo"});

    }
}