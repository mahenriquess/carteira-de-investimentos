const { Model, DataTypes } = require('sequelize');

class Carteira extends Model {
  	static init(sequelize) {
		console.log("Registrando Modulo de Carteira");

		super.init({
			nome: DataTypes.STRING,
			id_usuario: DataTypes.INTEGER,
			valor: DataTypes.DECIMAL(14, 2),
		}, {
			sequelize
		})
	}

	static associate(models) {
		this.belongsTo(models.Usuario,{ as: 'usuario', foreignKey: 'id_usuario' });
		this.hasMany(models.Ativo,{ as: 'ativos', foreignKey: 'id_carteira' });
	}
}

module.exports = Carteira;