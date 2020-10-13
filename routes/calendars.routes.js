module.exports = (app) => {
  const calendars = require("../controllers/calendars.controller.js");

  const router = require("express").Router();

  router.get("/", calendars.findAll);

  router.get("/:id", calendars.findOne);

  router.post("/", calendars.create);

  router.put("/:id", calendars.updateOne);

  router.delete("/:id", calendars.deleteOne);

  app.use("/api/calendars", router);
};
