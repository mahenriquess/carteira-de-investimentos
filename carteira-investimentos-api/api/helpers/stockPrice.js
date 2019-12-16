const {API_STOCK_PRICE} = require('../constants/apis');
const axios = require('axios');
const { hdbrasilKey } = require('../../.env');
module.exports = {
    getData: async symbol => {

        console.log(`${API_STOCK_PRICE}?key=${hdbrasilKey}&symbol=${symbol.toUpperCase()}`);
        const {data} = await axios.get(`${API_STOCK_PRICE}?key=${hdbrasilKey}&symbol=${symbol}`);
        console.log(data);

        const { results } = data;
        const details = results[symbol.toUpperCase()];
        
        return {
            simbolo: details.symbol,
            nome: details.name,
            regiao: details.region,
            moeda: details.currency,
            preco: details.price
        }
    },
}
