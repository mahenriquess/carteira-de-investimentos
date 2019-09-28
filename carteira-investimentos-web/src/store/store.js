import Vue from 'vue';
import Vuex from 'vuex';

import usuario from './module/usuario';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        usuario
    },
    state: {
        loading:false
    },
    getters: {
        loading(state){
            return state.loading;
        }
    }
});