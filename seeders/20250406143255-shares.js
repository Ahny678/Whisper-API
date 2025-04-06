"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import("nanoid");

    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`
    );
    const [posts] = await queryInterface.sequelize.query(
      `SELECT id FROM "Posts"`
    );

    if (!users.length || !posts.length) return;

    await queryInterface.bulkInsert("Shares", [
      {
        id: nanoid(10),
        postId: posts[0].id,
        sharedBy: users[1].id,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        postId: posts[1].id,
        sharedBy: users[0].id,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        accessCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Shares", null, {});
  },
};
