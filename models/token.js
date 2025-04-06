const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // optional, depending on use case
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Token",
  }
);

Token.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

User.hasMany(Token, {
  foreignKey: "userId",
});

module.exports = Token;
