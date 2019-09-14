import axios from 'axios';
import configs from './constants';

console.log(configs.api);
export default axios.create({
    baseURL: configs.api
});