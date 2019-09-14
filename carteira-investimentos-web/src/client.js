import axios from 'axios';
import configs from './configs';

console.log(configs.api);
//axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
export default axios.create({
    baseURL: configs.api
});

 //axios;