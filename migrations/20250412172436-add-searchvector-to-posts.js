"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a column that holds the TSVECTOR
    await queryInterface.sequelize.query(`
      ALTER TABLE "Posts"
      ADD COLUMN "searchVector" tsvector
        GENERATED ALWAYS AS (
          to_tsvector('english', coalesce("title", '') || ' ' || coalesce("content", ''))
        ) STORED;
    `);

    // Create a GIN index for performance
    await queryInterface.sequelize.query(`
      CREATE INDEX "posts_search_vector_idx"
      ON "Posts"
      USING GIN ("searchVector");
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP INDEX "posts_search_vector_idx";`
    );
    await queryInterface.removeColumn("Posts", "searchVector");
  },
};
