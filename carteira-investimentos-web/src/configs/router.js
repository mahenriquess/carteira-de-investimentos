import Vue from 'vue';
import Router from 'vue-router';
import Cadastro from '../screens/usuario/Cadastro'
import Login from '../screens/usuario/Login'
import Index from '../screens/Index';

import VueCookies from 'vue-cookies';

Vue.use(Router);

const routesDontNeedLogin = [
    '/login',
    '/cadastro'
];

const routeNeedLogin = routePath => routesDontNeedLogin.indexOf(routePath) < 0;

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
    console.log(to);
    const isLogged = VueCookies.get('usuario') != null;
    if(!isLogged && routeNeedLogin(to.path))
        next('/login');
    else if(isLogged && !routeNeedLogin(to.path))
        next('/');
    else
        next();
});

export default router;