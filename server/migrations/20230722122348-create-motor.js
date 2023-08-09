'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voluntarycode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brandID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      modelID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      specname: {
        type: Sequelize.STRING
      },
      motorprovinceID: {
        type: Sequelize.INTEGER
      },
      chassisNo: {
        type: Sequelize.STRING
      },
      licenseNo: {
        type: Sequelize.STRING
      },
      modelYear: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE
      }
    },{ schema: 'static_data'});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Motors',{ schema: 'static_data'});
  }
};