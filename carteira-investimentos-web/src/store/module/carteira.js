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
        }
    },
    actions: {
        addCarteira: async({commit}, carteira) => {
            carteira.loading = true;
            commit('addCarteira',carteira);

            const response = await client.post('/carteira', carteira);

            carteira.loading = false;
            carteira.id = response.data.id;

            commit('loadFinishCarteira',carteira);

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

        }
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