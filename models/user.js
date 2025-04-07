const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
var bcrypt = require("bcryptjs");

class User extends Model {
  //Compares a plain password (e.g., entered during login) with a hashed password from the database.
  async verify(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
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

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      },
    },
    isAuthor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
