const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./post");
const User = require("./user");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Like",
  }
);

Like.belongsTo(Post, {
  foreignKey: {
    name: "postId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

Post.hasMany(Like, {
  foreignKey: "postId",
});

Like.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

//a user can have many Comments
User.hasMany(Like, {
  foreignKey: "userId",
});

module.exports = Comment;
