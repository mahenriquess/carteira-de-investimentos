const { serverPort } = require('./.env');
const app = require('./config/server');

app.listen(serverPort, () => {
    console.log('API iniciada na porta', serverPort);
})