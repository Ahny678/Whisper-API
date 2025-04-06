"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`
    );
    const [posts] = await queryInterface.sequelize.query(
      `SELECT id FROM "Posts" WHERE "isPublished" = true`
    );

    if (!users.length || !posts.length) return;

    const comments = [
      {
        id: uuidv4(),
        userId: users[1].id,
        postId: posts[0].id,
        content: "Billieeee.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[0].id,
        postId: posts[0].id,
        content: "Why is Charli xcx not here...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Comments", comments);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
