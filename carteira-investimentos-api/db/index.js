const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../api/models/Usuario');
const Carteira = require('../api/models/Carteira');
const Ativo = require('../api/models/Ativo');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Carteira.init(connection);
Ativo.init(connection);

Usuario.associate(connection.models)
Carteira.associate(connection.models)
Ativo.associate(connection.models)


module.exports = connection;