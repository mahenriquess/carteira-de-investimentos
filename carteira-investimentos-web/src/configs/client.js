import axios from 'axios';
import configs from './constants';

export default axios.create({
    baseURL: configs.api
});