"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

console.debug("Creating loadedModules!");
const loadedModules = [];

console.debug("Looking through all modules for references!");
files.forEach((file) => {
  const exportObj = require(path.join(__dirname, file));

  console.debug("Checking " + file + "...");
  if ("references" in exportObj) {
    console.debug("References list in " + file + ". Adding references");
    exportObj.references
      .filter((file) => {
        const newFile = !loadedModules.includes(file);

        if (!newFile) {
          console.debug("loadedModules already includes this reference");
        }
        return newFile;
      })
      .forEach((reference) => {
        console.debug(`Loading reference ${reference}`);
        const model = require(path.join(__dirname, reference)).model(
          sequelize,
          Sequelize.DataTypes
        );

        db[model.name] = model;

        if (model.associate) {
          model.associate(db);
        }

        const lowerCaseName = model.name.toLowerCase();

        exports[`reference_${lowerCaseName}`] = model;

        loadedModules.push(lowerCaseName);
      });
  }
});

files
  .filter((file) => {
    const fileName = file.substring(0, file.length - 3).toLowerCase();

    return !loadedModules.includes(fileName);
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).model(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    loadedModules.push(model.name.toLowerCase());
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports.db = db;
