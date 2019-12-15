const Carteira = require('../models/Carteira');
const Ativo = require('../models/Ativo');

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

        carteiras.map(carteira => {
            carteira.valorDisponivel = carteira.valor;
            carteira.ativos.forEach(ativo => {
                carteira.valorDisponivel -= ativo.valorCompra
                carteira.valorDisponivel = parseFloat(carteira.valorDisponivel).toFixed(2)
            })
            return carteira;
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


        // console.log(carteiraSaved);
        
        if(carteiraSaved){
            const newCarteira = await Carteira.findByPk(carteiraSaved.id,association);
            return res.status(201).json(newCarteira);
        }
        else{
            return res.status(500).send('Erro ao salvar carteira');
        }
        
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
        const { idCarteira } = req.body;
        const { tipo, codigoEmpresa, valorCompra, valorMoedaCompra,tipoMoeda, qtdAcoes } = req.body.ativo;
        if(!idCarteira){
            return res.status(400).send({message: "Necessário informar carteira que deve ser adicionado o ativo"});
        }

        const carteira = await Carteira.findByPk(idCarteira);

        if(!carteira){
            return res.status(401).send({message: "Carteira não encontrada"});
        }

        try{
            const [ ativo ] = await Ativo.findOrCreate({ where: { tipo, codigoEmpresa: codigoEmpresa.toUpperCase(), valorCompra, valorMoedaCompra, valorMoedaUltimaAtualizacao: valorMoedaCompra, tipoMoeda, qtdAcoes } });
            await carteira.addAtivo(ativo);
            await carteira.update({valor: carteira.valor - valorCompra});
            res.json(ativo);
        }catch(err) {
            console.log(err);
            return res.status(500).send({message: "Erro ao salvar ativo"});
        }
    },

    venderAtivo: async (app, req, res) => {
        const { idAtivo } = req.params;

        try{
            const ativo = await Ativo.findByPk(idAtivo, { include: {association: 'carteira'} });

            if(!ativo || !ativo.carteira){
                return res.status(404).send({message: "Nenhum ativo encontrado"});
            }
    
            const newValorCarteira = parseFloat(ativo.carteira.valor) + parseFloat(ativo.valorCompra);
            await ativo.carteira.removeAtivo(ativo);
            await ativo.carteira.update({ valor: newValorCarteira });
            res.json(ativo);
        }catch(err){
            console.log(err);
            return res.status(500).send({message: "Erro ao remover ativo"});
        }
        
    }
}