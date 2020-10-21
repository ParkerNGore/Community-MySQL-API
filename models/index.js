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

console.log("Creating loadedModules!");
const loadedModules = [];

console.log("Looking through all modules for references!");
files.forEach((file) => {
  const exportObj = require(path.join(__dirname, file));

  console.log("Checking " + file + "...");
  if ("references" in exportObj) {
    console.log("References list in " + file + ". Adding references");
    exportObj.references
      .filter((file) => {
        const newFile = !loadedModules.includes(file);

        if (!newFile) {
          console.log("loadedModules already includes this reference");
        }
        return newFile;
      })
      .forEach((reference) => {
        console.log(`Loading reference ${reference}`);
        const model = require(path.join(__dirname, reference)).model(
          sequelize,
          Sequelize.DataTypes
        );

        db[model.name] = model;

        exports[`reference_${model.name.toLowerCase()}`] = db[model.name];

        loadedModules.push(model.name.toLowerCase());
      });
  }
});

files
  .filter((file) => {
    const fileName = file.substring(0, file.length - 3).toLowerCase();

    console.log(fileName);
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

console.log("Showing loadedModules:");
for (const module of loadedModules) {
  console.log(`module: ${module}`);
}

console.log("Showing db:");
for (const module in db) {
  console.log(`module: ${module}`);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports.db = db;
