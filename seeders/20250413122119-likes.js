"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`
    );

    const [posts] = await queryInterface.sequelize.query(
      `SELECT id FROM "Posts"`
    );

    const likes = [];

    for (const post of posts) {
      // Limit the number of likes to available users
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      const numberOfLikes = Math.floor(Math.random() * users.length); // 0 to users.length - 1
      const selectedUsers = shuffledUsers.slice(0, numberOfLikes);

      for (const user of selectedUsers) {
        likes.push({
          id: uuidv4(),
          postId: post.id,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Update the post's like count
      await queryInterface.bulkUpdate(
        "Posts",
        { likes: numberOfLikes },
        { id: post.id }
      );
    }

    await queryInterface.bulkInsert("Likes", likes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {});
    // Optionally reset like counts
    await queryInterface.sequelize.query(`UPDATE "Posts" SET likes = 0`);
  },
};
