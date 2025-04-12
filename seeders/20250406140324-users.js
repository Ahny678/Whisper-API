"use strict";

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        username: "devAuthor",
        email: "author@dev.com",
        password: bcrypt.hashSync("secret123", 10),
        isAuthor: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "devUser",
        email: "user@dev.com",
        password: bcrypt.hashSync("password", 10),
        isAuthor: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "devAuthor2",
        email: "author2@dev.com",
        password: bcrypt.hashSync("secret1234", 10),
        isAuthor: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...Array.from({ length: 7 }, (_, i) => ({
        id: uuidv4(),
        username: `user${i + 3}`,
        email: `user${i + 3}@dev.com`,
        password: bcrypt.hashSync("pass123", 10),
        isAuthor: i % 2 === 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
