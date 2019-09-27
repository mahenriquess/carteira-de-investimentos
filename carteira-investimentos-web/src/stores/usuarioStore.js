import Vue from 'vue';
import Vuex from 'vuex';

import client from '../configs/client';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        usuario: {
            isLogged: false,
            nome: ''
        }
    },
    mutations: {
        async login (state,usuario){
            console.log(usuario);
            await client.post('/signin', usuario )
                    .then(({ data }) => {
                        console.log(data);
                        state.usuario.nome = data.nome;
                        state.usuario.isLogged = true;
                    })
                    .catch(err => {
                        console.log("Erro no login: " +err.response);
                    })
                    .finally(() => {
                    });
            
        }
    },
    actions: {
        login: ({ commit }, usuario) => {
            commit('login', usuario )
        }
    }
});

export default store;