const Ativo = require('../models/Ativo');
const Carteira = require('../models/Carteira');

const association = {
    include: [
        {association: 'usuario'},
        {association: 'ativos'}
    ]
}

module.exports = {
    venderAcoes: async (app, req, res) => {
        const { qtdAcoes } = req.body;
        const { id } = req.params;

        try{
            const ativo = await Ativo.findByPk(id,{ include: {association: 'carteira'} });

            if(!ativo) res.status(404).send({ message: "Ativo não encontrado" });
    
            const { carteira } = ativo;
            const qtdRestante = ativo.qtdAcoes - qtdAcoes;
            const rendimentoCarteira = parseFloat(carteira.valor) + parseFloat(ativo.valorMoedaUltimaAtualizacao * qtdAcoes);
            const rendimentoAtivo = ativo.valorMoedaUltimaAtualizacao * qtdRestante;

            if(qtdRestante > 0){
                ativo.update({qtdAcoes: qtdRestante, valorCompra: rendimentoAtivo});
            }else{
                ativo.destroy()
            }
            console.log(rendimentoCarteira);
            // res.status(500).send({ message: 'Problemas ao vender ações' });
            await carteira.update({ valor: rendimentoCarteira });
            const updatedCarteira = await Carteira.findByPk(carteira.id, association);
            res.status(200).json(updatedCarteira);
        }catch(err){
            console.log(err);
            res.status(500).send({ message: 'Problemas ao vender ações' });
        }
    }   
}