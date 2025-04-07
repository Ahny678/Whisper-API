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

exports.isResourceOwner = (model, resourceIdParam) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const resource = await model.findByPk(resourceId);

      if (!resource) {
        return res.status(404).json({ message: `${resource} not found` });
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
