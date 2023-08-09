'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      polid: {
        type: Sequelize.INTEGER
      },
      billadvisor: {
        type: Sequelize.STRING
      },
      netflag: {
        type: Sequelize.STRING
      },
      // prem comm ov1 ov2 ov3 disc
      transType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // i = in or o = out
      transStatus: {
        allowNull: false,
        type: Sequelize.CHAR
      },
      txtype2: {
        type: Sequelize.STRING
      },
      // 1  , -1
      subType: {
        defaultValue: 1,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalamt:{
        type: Sequelize.FLOAT
      },
      paidamt:{
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      remainamt:{
        type: Sequelize.FLOAT
      },
      status:{
        type: Sequelize.STRING
      },
      mainaccountcode:{
        type: Sequelize.STRING
      },
      agentCode: {
        type: Sequelize.STRING
      },
      insurerCode: {
        type: Sequelize.STRING
      },
      policyNo: {
        allowNull:false,
        type: Sequelize.STRING
      },
      endoseNo: {
        type: Sequelize.STRING
      },
      receiptno: {
        type: Sequelize.STRING
      },
      seqno:{
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.FLOAT
      },
      duty: {
        type: Sequelize.FLOAT
      },
      stamp: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      commamt:{
        type: Sequelize.FLOAT
      },
      commtaxamt:{
        type: Sequelize.FLOAT
      },
      ovamt:{
        type: Sequelize.FLOAT
      },
      ovtaxamt:{
        type: Sequelize.FLOAT
      },
      rprefdate: {
        type: Sequelize.DATEONLY
      },
      dfrpreferno: {
        type: Sequelize.STRING
      },
      "premin-rprefdate": {
        type: Sequelize.DATEONLY
      },
      "premin-rprefdate-dfrpreferno": {
        type: Sequelize.STRING
      },
      "premout-rprefdate": {
        type: Sequelize.DATEONLY
      },
      "premout-rprefdate-dfrpreferno": {
        type: Sequelize.STRING
      },
      dueDate:{
        allowNull:false,
        type: Sequelize.DATEONLY
      },
      groupStamentID:{
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
    await queryInterface.dropTable('Transactions',{ schema: 'static_data'});
  }
};