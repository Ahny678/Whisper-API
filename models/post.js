const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

class Post extends Model {}

Post.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Starts as null until published
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "post",
  }
);

//one to many -> user -- posts
Post.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

User.hasMany(Post, {
  foreignKey: "userId",
});

module.exports = Post;
