import Vue from 'vue';
import Vuex from 'vuex';

import usuario from './module/usuario';
import carteira from './module/carteira';
import ativo from './module/ativo';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        usuario,
        carteira,
        ativo
    },
    state: {
        loading:false,
        drawer: true,
    },
    mutations: {
        initLoading(state) {
            state.loading = true;
        },
        dismissLoading(state) {
            state.loading = false;
        },
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        }
    },
    actions: {
        initLoading({ commit }) {
            commit('initLoading');
        },
        dismissLoading({ commit }) {
            commit('dismissLoading');
        },
        toggleDrawer({commit}) {
            console.log("Abrir/fechar drawer")
            commit('toggleDrawer');
        }
    },
    getters: {
        loading(state){
            return state.loading;
        },
        drawer(state) {
            return state.drawer;
        }
    }
});