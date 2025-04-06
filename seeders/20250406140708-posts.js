"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE "isAuthor" = true`
    );

    if (!users.length) return;

    const posts = [
      {
        id: uuidv4(),
        userId: users[0].id,
        title: "2025's favourite female artists",
        content:
          "Chappel Roan, Billie Eilish, Melanie Martinez, Cloudy June, Fletcher .",
        isPublished: true,
        category: "Music",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        title: "Top canceled celebrities of 2025",
        content: "Still working on this...",
        isPublished: false,
        category: "Gossip",
        publishedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Posts", posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
