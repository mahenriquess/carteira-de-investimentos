import VueCookies from 'vue-cookies'

export default {
    isLogged: () => {
        const usuarioLogado = VueCookies.get('usuario');
        if(usuarioLogado) return true; else return false;
    },
};