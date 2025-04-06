const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Post = require("./post");
const User = require("./user");

class Share extends Model {}

Share.init(
  {
    id: {
      type: DataTypes.STRING, //going to use slugs btw
      allowNull: false,
      unique: true,
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    accessCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Share",
  }
);

//one to many -> one post -- many shares
Share.belongsTo(Post, {
  foreignKey: {
    name: "postId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

Post.hasMany(Share, {
  foreignKey: "postId",
});

//a share blongs to 1 user
Share.belongsTo(User, {
  foreignKey: {
    name: "sharedBy",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

//a user can have many shares
User.hasMany(Share, {
  foreignKey: "sharedBy",
});

module.exports = Share;
