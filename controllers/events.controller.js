const { db } = require("../models");
const Events = db.Events;

exports.create = (req, res) => {
  if (
    !req.body.date ||
    !req.body.time ||
    !req.body.relatedGame ||
    !req.body.numberOfPlayersWanted
  ) {
    res.status(400).send("All fields are required!");
    return;
  }

  const event = {
    date: req.body.date,
    time: req.body.time,
    relatedGame: req.body.relatedGame,
    numberOfPlayersWanted: req.body.numberOfPlayersWanted,
  };

  Events.create(event)
    .then((submittedEvent) => res.status(201).send(submittedEvent))
    .catch((err) => res.status(400).send(err));
};

exports.findAll = (req, res) => {
  Events.findAll()
    .then((events) => res.status(200).send(events))
    .catch((err) => res.status(400).send(err));
};

exports.findOne = (req, res) => {
  const eventId = req.params.id;

  Events.findByPk(eventId)
    .then((event) => res.status(200).send(event))
    .catch((err) => res.status(404).send(err));
};

exports.updateOne = (req, res) => {
  const eventId = req.params.id;

  Events.update(
    {
      date: req.body.date,
      time: req.body.time,
      relatedGame: req.body.relatedGame,
      numberOfPlayersWanted: req.body.numberOfPlayersWanted,
    },
    {
      where: { id: eventId },
    }
  )
    .then(() =>
      res.status(200).send(`Successfully Updated Event with id ${eventId}`)
    )
    .catch((err) => res.status(404).send(err));
};

exports.deleteOne = (req, res) => {
  const eventId = req.params.id;

  Events.destroy({
    where: { id: eventId },
  })
    .then(() =>
      res.status(200).send(`Successfully Deleted Event with id ${eventId}`)
    )
    .catch((err) => res.status(404).send(err));
};
