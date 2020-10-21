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

  console.log("Printing props:");
  for (const prop in importObj) {
    console.log(`prop: ${prop}`);
  }

  console.log(importObj.reference_events);

  if (!importObj.reference_events) {
    console.log("reference_events is undefined/null");
  }

  Calendar.hasMany(importObj.reference_events);

  return Calendar;
};

exports.references = ["events"];
