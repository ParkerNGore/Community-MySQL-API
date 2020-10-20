module.exports = (app) => {
  const oauth2 = require("../controllers/oauth2.controller");

  const router = require("express").Router();

  router.get("/login", oauth2.handleLogin);

  router.get("/logout", oauth2.handleLogout);

  router.get("/callback", oauth2.handleCallback);
  app.use("/api/oauth2", router);
};
