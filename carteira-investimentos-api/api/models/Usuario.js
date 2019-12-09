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

	static associate(models) {
		// Associações
		// Ex: this.myAssociation = this.belongsTo(models.OtherModel);
		// console.log(models.Carteira);
		this.hasMany(models.Carteira,{ as: 'carteiras', foreignKey: 'id_usuario' });
	}
}

module.exports = Usuario;