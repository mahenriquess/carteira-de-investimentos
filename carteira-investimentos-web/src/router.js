import Vue from 'vue';
import Router from 'vue-router';
import Cadastro from './screens/usuario/Cadastro'
import Login from './screens/usuario/Login'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        component: Login
    },
    {
        path: '/cadastro',
        component: Cadastro
    }]
})