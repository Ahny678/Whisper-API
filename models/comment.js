const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Post = require("./post");
const User = require("./user");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Comment",
  }
);

//one to many -> one post -- many Comments
Comment.belongsTo(Post, {
  foreignKey: {
    name: "postId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

Post.hasMany(Comment, {
  foreignKey: "postId",
});

//a Comment blongs to 1 user
Comment.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

//a user can have many Comments
User.hasMany(Comment, {
  foreignKey: "userId",
});

module.exports = Comment;
