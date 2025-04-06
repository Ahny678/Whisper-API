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
      expiresAt: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shares");
  },
};
