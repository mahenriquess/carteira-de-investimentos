const { Model, DataTypes } = require('sequelize');

class Carteira extends Model {
  	static init(sequelize) {
		console.log("Registrando Modulo de Usuário");

		super.init({
			nome: DataTypes.STRING,
			id_usuario: DataTypes.INTEGER,
			valor: DataTypes.DECIMAL(14, 2),
		}, {
			sequelize
		})
	}

	static associate(models) {
		// Associações
		// Ex: this.myAssociation = this.belongsTo(models.OtherModel);
		// this.carteiras = this.belongsToMany(models.Carteira)
	}
}

module.exports = Carteira;