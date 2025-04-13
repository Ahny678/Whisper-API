"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id, username FROM "Users" WHERE "isAuthor" = true`
    );

    if (users.length < 3) return;

    const posts = [
      {
        id: uuidv4(),
        userId: users[0].id,
        title: "2025's favourite female artists",
        content:
          "Chappel Roan, Billie Eilish, Melanie Martinez, Cloudy June, Fletcher.",
        isPublished: true,
        category: "Music",
        publishedAt: new Date("2025-01-01"),
        views: 3,
        likes: 0,
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
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[2].id,
        title: "Grammys a scam or a legend?",
        content: "A steal or a bribe...",
        isPublished: true,
        category: "Critique",
        publishedAt: new Date("2025-02-10"),
        views: 6,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[0].id,
        title: "Feminism in modern cinema",
        content: "From Barbie to Saltburn, let’s talk feminist icons.",
        isPublished: true,
        category: "Film",
        publishedAt: new Date("2025-03-15"),
        views: 25,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        title: "Climate change hoaxes?",
        content: "Is it all fear mongering?",
        isPublished: false,
        category: "Critique",
        publishedAt: new Date("2025-03-01"),
        views: 100,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        title: "The ayo edibiri effect",
        content:
          "Was Bottoms really a good show or was so camp y'all ignored the terrible directing?",
        isPublished: true,
        category: "Film",
        publishedAt: null,
        views: 10,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[2].id,
        title: "Best books of the decade",
        content: "From sci-fi to memoirs, here's our top list.",
        isPublished: true,
        category: "Books",
        publishedAt: new Date("2025-04-01"),
        views: 14,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[0].id,
        title: "Brainrot",
        content: "cultivation>>murim>>system>>>isekai",
        isPublished: true,
        category: "Books",
        publishedAt: new Date("2025-02-20"),
        views: 40,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        title: "Cancel culture",
        content: "Sometimes are things really that deep?...",
        isPublished: true,
        category: "Gossip",
        publishedAt: new Date("2025-01-20"),
        views: 8,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: users[2].id,
        title: "Tiktok trends that shocked us",
        content: "Dancing lawyers, trauma dumps, and more",
        isPublished: false,
        category: "Gossip",
        publishedAt: null,
        views: 0,
        likes: 0,
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
