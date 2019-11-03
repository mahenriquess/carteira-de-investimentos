const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../api/models/Usuario');

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

module.exports = connection;