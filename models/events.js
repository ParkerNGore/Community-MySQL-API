const sequelize = require("sequelize");

exports.model = (sequelize, DataTypes) => {
  const Event = sequelize.define("Events", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relatedGame: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPlayersWanted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Event;
};
