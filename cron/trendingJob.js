const cron = require("node-cron");
const { Op, Sequelize } = require("sequelize");
const Post = require("../models/post");
const TrendingPost = require("../models/trending");

const updateTrendingPosts = async () => {
  try {
    console.log("Updating trending posts...");

    const topPosts = await Post.findAll({
      where: {
        isPublished: true,
        publishedAt: { [Op.not]: null },
      },
      attributes: {
        include: [[Sequelize.literal("(likes * 2 + views)"), "score"]],
      },
      order: [
        [Sequelize.literal("(likes * 2 + views)"), "DESC"],
        ["publishedAt", "DESC"],
      ],
      limit: 5,
    });

    // Clear existing trending posts
    await TrendingPost.destroy({ where: {} });

    // Save new trending posts
    const trendingData = topPosts.map((post) => ({
      postId: post.id,
      postTitle: post.title,
      score: post.get("score"),
    }));

    await TrendingPost.bulkCreate(trendingData);
    console.log("Trending posts updated.");
  } catch (err) {
    console.error("Error updating trending posts:", err);
  }
};

// Run every 10 seconds
cron.schedule("*/10 * * * * *", updateTrendingPosts);
