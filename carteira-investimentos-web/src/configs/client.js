import axios from 'axios';
import configs from './constants';
import VueCookies from 'vue-cookies';

const client = axios.create({
    baseURL: configs.api
});

const usuario = VueCookies.get('usuario');

if(usuario){
    client.defaults.headers.common['Authorization'] = `bearer ${usuario.token}`;
}

export default client;