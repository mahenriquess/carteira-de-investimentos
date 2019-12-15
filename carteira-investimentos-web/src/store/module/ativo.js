import client from '../../configs/client';

export default {
    state: {
        carteiras: []
    },
    mutations: {
        
    },
    actions: {
        venderAcoes: async ({ commit }, { ativo, qtdAcoes }) => {
            const { data } = await client.put(`/ativo/${ativo.id}/acoes`,{ qtdAcoes });
            if(data) {
                commit('atualizarCarteira', data, { root: true });
            }
        }
    }
}