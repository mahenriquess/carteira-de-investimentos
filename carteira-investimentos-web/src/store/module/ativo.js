import client from '../../configs/client';

export default {
    state: {
        ativos: []
    },
    mutations: {
        setAtivos(state,ativos) {
            state.ativos = ativos;
        },

        addAtivo(state,ativo) {
            state.ativos.push(ativo);
        },
        loadFinishAtivo(state,salvedativo) {
            state.ativos = state.ativos.map(ativo => {
                if(!ativo.id && ativo.loading){
                    return salvedativo
                }else{
                    return ativo;
                }
            });
        },

        deleteAtivo(state, ativoDeleted) {
            state.ativos = state.ativos.filter(ativo => ativo.id != ativoDeleted.id);
        }
    },
    actions: {
        addAtivo: async({commit}, ativo) => {
            ativo.loading = true;
            commit('addAtivo',ativo);

            const response = await client.post('/ativo', ativo);

            ativo.loading = false;
            ativo.id = response.data.id;

            commit('loadFinishAtivo',ativo);

        },

        deleteAtivo: async({commit}, ativo) => {
            const { id } = ativo;
            //console.warn(ativo);
            try{
                const response = await client.delete('/ativo/'+ id);
                console.log(response.data);
                commit("deleteAtivo",ativo);

            }catch(e) {
                console.log("Erro ao tentar excluir ativo. " + e);
            }

        }
    },
    getters: {
        ativos(state) {
            return state.ativos;
        },

        ativoIsLoading(state) {
            const ativoLoading = state.ativos.filter(ativo => ativo.loading);
            return ativoLoading != null && ativoLoading.length > 0;
        }
    }
}