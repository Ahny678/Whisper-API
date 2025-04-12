const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./post");

class Trending extends Model {}

Trending.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Trending",
    timestamps: true,
  }
);

Trending.belongsTo(Post, { foreignKey: "postId" });

module.exports = Trending;
