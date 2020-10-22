const sequelize = require("sequelize");

// Can't use destructring here for some reason
// Just results in undefined
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

  console.debug("Applying hasMany to Calendar...");
  Calendar.hasMany(importObj.reference_events);
  console.debug("Finished applying hasMany to Calendar~");

  return Calendar;
};

exports.references = ["Events"];
