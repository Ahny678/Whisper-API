"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Shares", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      expiresIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      accessCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sharedBy: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shares");
  },
};
