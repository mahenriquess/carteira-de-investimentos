import Vue from 'vue';
import Vuex from 'vuex';

import usuario from './module/usuario';
import carteira from './module/carteira';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        usuario,
        carteira
    },
    state: {
        loading:false
    },
    mutations: {
        initLoading(state) {
            state.loading = true;
        },
        dismissLoading(state) {
            state.loading = false;
        }
    },
    actions: {
        initLoading({ commit }) {
            commit('initLoading');
        },
        dismissLoading({ commit }) {
            commit('dismissLoading');
        }
    },
    getters: {
        loading(state){
            return state.loading;
        }
    }
});