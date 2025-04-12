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
      {
        id: uuidv4(),
        userId: users[2].id,
        postId: posts[2].id,
        content: "Great breakdown on the Grammys",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[3].id,
        postId: posts[1].id,
        content: "Interesting viewpoint",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[4].id,
        postId: posts[3].id,
        content: "I totally agree!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[5].id,
        postId: posts[3].id,
        content: "Disagree on Saltburn though",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[6].id,
        postId: posts[0].id,
        content: "Climate denial is real!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[7].id,
        postId: posts[3].id,
        content: "PJ 🔥",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[8].id,
        postId: posts[2].id,
        content: "bot comment!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[9].id,
        postId: posts[6].id,
        content: " content please 💖",
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
