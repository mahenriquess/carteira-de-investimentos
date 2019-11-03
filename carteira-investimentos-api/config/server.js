const app = require('express')();
const bodyParser = require('body-parser');
// const db = require('./db');
const consign = require('consign');
const cors = require('cors');

const db = require('../db/index');

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

consign()
    .include('./api/middleware/passport.js')
    .then('./api/routes')
    .then('./api/controllers')
    .then('./api/helpers')
    // .then('./api/models')
    .into(app);

// app.db = db;

module.exports = app;