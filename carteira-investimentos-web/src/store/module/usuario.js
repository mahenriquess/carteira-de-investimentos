import client from '../../configs/client';
import VueCookies from 'vue-cookies';

import router from '../../configs/router';



export default {
    state: {
        usuario: null,
        erroLogin:false,
        statusCadastro: null,
    },
    mutations: {
        async loginSuccess (state,usuario){
            state.usuario = usuario;
            state.erroLogin = false;
            VueCookies.set('usuario', state.usuario, {expires: '30s'});            
        },

        loginFailure(state) {
            state.erroLogin = true;
        },

        cadastroFailure (state) {
            state.statusCadastro = false;
        },

        cadastroSuccess (state) {
            state.statusCadastro = true;
        },

        async logout (state){
            state.usuario = null;
            VueCookies.remove('usuario');            
        },

        async atualizaUsuarioLogado(state) {
            const usuarioLogado = VueCookies.get('usuario');
            if(usuarioLogado)
                state.usuario = usuarioLogado;
        }
    },
    actions: {
        login: async ({ commit, rootState }, usuario) => {
            rootState.loading = true;
            await client.post('/signin', usuario )
                    .then(({ data }) => data)
                    .then(usuario => {
                        commit('loginSuccess',usuario);
                        router.push('/');
                    })
                    .catch(err => {
                        commit('loginFailure');
                        console.log("Erro no login: " +err.response);
                    })
                    .finally(() => {
                        rootState.loading = false;
                    });
        },
        cadastrarUsuario: async ({ commit, rootState }, usuario) => {
            rootState.loading = true;
            await client.post('/signup',usuario)
                    .then(()=> {
                        commit('cadastroSuccess');
                        setTimeout(() => {
                            router.push('login')
                        },3000)
                    })
                    .catch(err => {
                        console.log(err);
                        commit('cadastroFailure');
                    })
                    .finally(() => rootState.loading = false);
        },
        logout: async ({ commit }) => {
            await commit('logout');
            router.push('/login');
        },
        atualizaUsuarioLogado: ({ commit }) => {
            commit('atualizaUsuarioLogado');
        }
    },
    getters: {
        usuarioIsLogged(state) {
            return state.usuario != null;
        },
        usuario(state) {
            return state.usuario
        },
        erroLogin(state) {
            return state.erroLogin
        },
        messageCadastro(state) {
            if(state.statusCadastro === true){
                return 'Cadastro efetuado com sucesso ! Você sera redirecionado em alguns segundos.';
            }else {
                return 'Erro ao efetuar cadastro. Verifique os campos e tente novamente';
            }
        },
        statusCadastro(state) {
            return state.statusCadastro;
        }
    }
}