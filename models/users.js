module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    // Username is their Discord username/email
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenExpiration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "UTC-5",
    },
  });
  return User;
};
