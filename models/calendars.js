const sequelize = require("sequelize");

const importObj = require("./index");

exports.model = (sequelize, DataTypes) => {
  const Calendar = sequelize.define("Calendars", {
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

  console.log(importObj);
  Calendar.hasMany(importObj.references.Events);

  return Calendar;
};

exports.references = ["events"];
