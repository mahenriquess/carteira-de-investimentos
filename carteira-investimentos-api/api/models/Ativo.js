const { Model, DataTypes } = require('sequelize');

class Ativo extends Model {
  	static init(sequelize) {
		console.log("Registrando Modulo de Ativo");

		super.init({
			tipo: DataTypes.STRING,
			codigoEmpresa: DataTypes.STRING,
			valorCompra: DataTypes.DECIMAL(14, 2),
		}, {
			sequelize
		})
	}

	static associate(models) {
		// Associações
        this.belongsTo(models.Carteira,{ as: 'carteira', foreignKey: 'id_carteira' });
	}
}

module.exports = Ativo;