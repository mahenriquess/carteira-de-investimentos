const app = require('express')();
const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

consign()
    .include('./api/middleware/passport.js')
    .then('./api/routes')
    .then('./api/controllers')
    .then('./api/helpers')
    .into(app);
    
module.exports = app;