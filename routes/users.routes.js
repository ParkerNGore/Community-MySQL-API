module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  const router = require("express").Router();

  router.get("/", users.findAll);

  router.get("/:id", users.findOne);

  router.post("/", users.create);

  router.put("/:id", users.updateOne);

  router.delete("/:id", users.deleteOne);

  app.use("/api/users", router);
};
