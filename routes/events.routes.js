module.exports = (app) => {
  const events = require("../controllers/events.controller.js");

  const router = require("express").Router();

  router.get("/", events.findAll);

  router.get("/:id", events.findOne);

  router.post("/", events.create);

  router.put("/:id", events.updateOne);

  router.delete("/:id", events.deleteOne);

  app.use("/api/events", router);
};
