// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Usuarios = sequelize.define('Usuarios', {
//     nome: DataTypes.STRING,
//     email: DataTypes.STRING,
//     senha: DataTypes.STRING
//   }, {});
//   Usuarios.associate = function(models) {
//     // associations can be defined here
//   };
//   return Usuarios;
// };

const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  	static init(sequelize) {
		console.log("Registrando Modulo de Usuário");

		super.init({
			nome: DataTypes.STRING,
			sobrenome: DataTypes.STRING,
			email: DataTypes.STRING,
			senha: DataTypes.STRING,
			status: DataTypes.STRING
		}, {
			sequelize
		})
	}
}

module.exports = Usuario;