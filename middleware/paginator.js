const Post = require("../models/post");
exports.getPaginatedPosts = (filter) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Post.findAndCountAll({
        where: { isPublished: filter },
        limit,
        offset,
        order: [["createdAt", "DESC"]], // Optional: sort by createdAt or any other field
      });

      const totalPages = Math.ceil(count / limit);

      const results = {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize: limit,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        data: rows,
      };

      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  };
};
