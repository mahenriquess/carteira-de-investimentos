import client from '../../configs/client';
import VueCookies from 'vue-cookies';

import router from '../../configs/router';



export default {
    state: {
        usuario: null,
    },
    mutations: {
        signin (state,usuario){
            state.usuario = usuario;
            VueCookies.set('usuario', state.usuario, {expires: '30s'});        
            client.defaults.headers.common['Authorization'] = `bearer ${usuario.token}`;    
        },
        

        signup (state) {
            state.statusCadastro = true;
        },

        async logout (state){
            state.usuario = null;
            VueCookies.remove('usuario');            
        },

        async atualizaUsuarioLogado(state) {
            const usuarioLogado = VueCookies.get('usuario');
                
            console.log(usuarioLogado);
            if(usuarioLogado){
                // populaCarteiras(usuarioLogado.carteiras);
                state.usuario = usuarioLogado;
            }
        }
    },
    actions: {
        signin: async ({ commit }, usuario) => {
            const response = await client.post('/signin', usuario );
            commit('signin',response.data);
        },
        signup: async ({ commit }, usuario) => {
            const response = await client.post('/signup',usuario);
            commit('signup',response.data);
        },
        logout: async ({ commit }) => {
            await commit('logout');
            await commit('setCarteiras',[], {root:true});
            router.push('/login');
        },
        atualizaUsuarioLogado: ({ commit }) => {
            commit('atualizaUsuarioLogado');
        },
    },
    getters: {
        usuarioIsLogged(state) {
            return state.usuario != null;
        },
        usuario(state) {
            return state.usuario
        },
    }
}