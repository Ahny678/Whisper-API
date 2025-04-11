const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token)
      return res.status(401).json({ message: "Access token missing" });

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.isAuthor = (req, res, next) => {
  if (!req.user || !req.user.isAuthor) {
    return res
      .status(403)
      .json({ message: "You are not authorized as an author" });
  }
  next();
};

exports.isResourceOwner = (model) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      const resource = await model.findByPk(req.params.id);
      if (!resource) {
        return res.status(404).json({ message: `resource not found` });
      }

      if (resource.userId !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You do not own this resource" });
      }

      next();
    } catch (error) {
      console.error("Ownership check failed:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

exports.getPaginatedPosts = (model) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await model.findAndCountAll({
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
