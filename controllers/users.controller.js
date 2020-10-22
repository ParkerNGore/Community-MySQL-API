const { db } = require("../models");
const Users = db.Users;

exports.create = (req, res) => {
  if (
    !req.body.username ||
    !req.body.token ||
    !req.body.tokenExpiration ||
    !req.body.timezone
  ) {
    res.status(400).send("All fields are required!");
    return;
  }

  const user = {
    username: req.body.username,
    token: req.body.token,
    tokenExpiration: req.body.tokenExpiration,
    timezone: req.body.timezone,
  };

  Users.create(user)
    .then((submittedUser) => res.status(201).send(submittedUser))
    .catch((err) => res.status(400).send(err));
};

exports.findAll = (req, res) => {
  Users.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

exports.findOne = (req, res) => {
  const userId = req.params.id;

  Users.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(404).send(err));
};

exports.updateOne = (req, res) => {
  const userId = req.params.id;

  Users.update(
    {
      username: req.body.username,
      token: req.body.token,
      tokenExpiration: req.body.tokenExpiration,
      timezone: req.body.timezone,
    },
    {
      where: { id: userId },
    }
  )
    .then(() =>
      res.status(200).send(`Successfully Upodated User with id ${userId}`)
    )
    .catch((err) => res.status(404).send(err));
};

exports.deleteOne = (req, res) => {
  const userId = req.params.id;

  Users.destroy({
    where: { id: userId },
  })
    .then(() =>
      res.status(200).send(`Successfully Deleted User with id ${userId}`)
    )
    .catch((err) => res.status(404).send(err));
};
