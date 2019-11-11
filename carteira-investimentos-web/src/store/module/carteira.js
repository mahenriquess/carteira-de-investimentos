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

        }
    },
    getters: {
        carteiras(state) {
            return state.carteiras;
        }
    }
}