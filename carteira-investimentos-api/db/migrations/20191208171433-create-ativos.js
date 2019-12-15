'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ativos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codigo_empresa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      valor_compra: {
        allowNull: false,
        type: Sequelize.DECIMAL(14, 2)
      },
      valor_moeda_compra: {
        type: Sequelize.DECIMAL(14, 2),
      },
      valor_moeda_ultima_atualizacao: {
        type: Sequelize.DECIMAL(14, 2),
      },
      tipo_moeda: {
        type: Sequelize.STRING,
      },
      qtd_acoes: {
        type: Sequelize.INTEGER
      },
      id_carteira: {
        type: Sequelize.INTEGER,
        references: {
          model: 'carteiras', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.dropTable('ativos');
  }
};
