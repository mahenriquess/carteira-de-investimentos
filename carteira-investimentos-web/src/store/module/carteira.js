import client from '../../configs/client';

export default {
    state: {
        carteiras: []
    },
    mutations: {
        setCarteiras(state,carteiras) {
            state.carteiras = carteiras;
        },

        addCarteira(state,carteira) {
            state.carteiras.push(carteira);
        },
        loadFinishCarteira(state,salvedCarteira) {
            state.carteiras = state.carteiras.map(carteira => {
                if(!carteira.id && carteira.loading){
                    return salvedCarteira
                }else{
                    return carteira;
                }
            });
        },

        deleteCarteira(state, carteiraDeleted) {
            state.carteiras = state.carteiras.filter(carteira => carteira.id != carteiraDeleted.id);
        },

        popularCarteiras(state, carteiras) {
            console.log("Populando Carteira ");
            state.carteiras = carteiras;
        },

        atualizarCarteira(state, carteiraUpdated) {
            state.carteiras = state.carteiras.map(carteira => {
                if(carteira.id == carteiraUpdated.id){
                    return carteiraUpdated;
                }else{
                    return carteira;
                }
            });
        },

        addAtivo(state, {data, idCarteira}) {
            state.carteiras = state.carteiras.map(carteira => {
                if(carteira.id == idCarteira){
                    data.idCarteira = carteira.id;
                    carteira.ativos.push(data);
                    carteira.valor -= data.valorCompra
                }
                return carteira;
            })
        },
        venderAtivo(state, ativoDeleted) {
            state.carteiras = state.carteiras.map(carteira => {
                carteira.ativos = carteira.ativos.filter(ativo => ativo.id != ativoDeleted.id);
                if(carteira.id == ativoDeleted.idCarteira){
                    const newValorCarteira = parseFloat(carteira.valor) + parseFloat(ativoDeleted.valorCompra);
                    carteira.valor = newValorCarteira;
                }
                return carteira;
            })
        },
    },
    actions: {
        addCarteira: async({commit}, carteira) => {
            carteira.loading = true;
            commit('addCarteira',carteira);

            const {data} = await client.post('/carteira', carteira);

            await commit('loadFinishCarteira',data);

        },

        deleteCarteira: async({commit}, carteira) => {
            const { id } = carteira;
            //console.warn(carteira);
            try{
                const response = await client.delete('/carteira/'+ id);
                console.log(response.data);
                commit("deleteCarteira",carteira);

            }catch(e) {
                console.log("Erro ao tentar excluir carteira. " + e);
            }
        },
        loadCarteiras: async({commit}) => {
            const { data } = await client.get('/carteira');
            if(data){
                await commit('popularCarteiras',data)
            }
        },
        addAtivo: async({commit}, {idCarteira, ativo}) => {
            const { data } = await client.post('/carteira/ativo', {
                idCarteira,
                ativo
            });
            console.log(data,idCarteira);
            await commit('addAtivo',{data,idCarteira})
        },
        venderAtivo: async({commit}, ativo) => {
            const { data } = await client.delete(`/carteira/ativo/${ativo.id}`);
            await commit('venderAtivo',data);
        },
    },
    getters: {
        carteiras(state) {
            return state.carteiras;
        },

        carteiraIsLoading(state) {
            const carteiraLoading = state.carteiras.filter(carteira => carteira.loading);
            return carteiraLoading != null && carteiraLoading.length > 0;
        }
    }
}