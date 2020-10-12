const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define("Calendar", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startingDayOfTheWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Calendar;
};
