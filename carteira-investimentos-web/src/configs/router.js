import Vue from 'vue';
import Router from 'vue-router';
import Cadastro from '../screens/usuario/Cadastro'
import Login from '../screens/usuario/Login'
import Index from '../screens/Index';

import usuarioHelper from '../helpers/usuarioHelper';

Vue.use(Router);

const routesDontNeedLogin = [
    '/login',
    '/cadastro'
];

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        component: Login
    },
    {
        path: '/cadastro',
        component: Cadastro
    },
    {
        path: '/',
        component: Index
    }]
});

router.beforeEach((to,_,next) => {
    if(!usuarioHelper.isLogged() && routesDontNeedLogin.indexOf(to.path) < 0)
        next('/login');
    else if(usuarioHelper.isLogged() && routesDontNeedLogin.indexOf(to.path) > -1)
        next('/');
    else
        next();
});

export default router;