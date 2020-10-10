const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/users", (req, res) => {
  db.Users.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(400).send(error));
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.Users.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(404).send(error));
});

router.post("/users/newUser", (req, res) => {
  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    timezone: req.body.timezone,
  })
    .then((submittedUser) => res.status(201).send(submittedUser))
    .catch((error) => res.status(400).send(error));
});

router.put("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.Users.update(
    {
      username: req.body.username,
      password: req.body.password,
      timezone: req.body.timezone,
    },
    {
      where: { id: userId },
    }
  )
    .then(() =>
      res.status(200).send(`Successfully Upodated User with id ${userId}`)
    )
    .catch((error) => res.status(404).send(error));
});

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.Users.destroy({
    where: { id: userId },
  })
    .then(() => res.status(200).send(`Successfully Deleted User ${userId}`))
    .catch((error) => response.status(404).send(error));
});

module.exports = router;