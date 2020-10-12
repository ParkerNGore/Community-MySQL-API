const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/users", (req, res) => {
  db.Users.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(400).send(error));
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  db.Users.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(404).send(error));
});

router.post("/user/newUser", (req, res) => {
  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    timezone: req.body.timezone,
  })
    .then((submittedUser) => res.status(201).send(submittedUser))
    .catch((error) => res.status(400).send(error));
});

router.put("/user/:id", (req, res) => {
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

router.delete("/user/:id", (req, res) => {
  const userId = req.params.id;

  db.Users.destroy({
    where: { id: userId },
  })
    .then(() =>
      res.status(200).send(`Successfully Deleted User with id ${userId}`)
    )
    .catch((error) => res.status(404).send(error));
});

// Routes for Calendar
router.get("/calendars", (req, res) => {
  db.Calendar.findAll()
    .then((calendars) => res.status(200).send(calendars))
    .catch((error) => res.status(400).send(error));
});

router.get("/calendar/:id", (req, res) => {
  const calendarId = req.params.id;

  db.Calendar.findByPk(calendarId)
    .then((calendar) => res.status(200).send(calendar))
    .catch((error) => res.status(400).send(error));
});

router.post("/calendar/newCalendar", (req, res) => {
  db.Calendar.create({
    year: req.body.year,
    month: req.body.month,
    numberOfDays: req.body.numberOfDays,
    startingDayOfTheWeek: req.body.startingDayOfTheWeek,
  })
    .then((submittedCalendar) => res.status(201).send(submittedCalendar))
    .catch((error) => res.status(400).send(error));
});

router.put("/calendar/:id", (req, res) => {
  const calendarId = req.params.id;

  db.Calendar.update(
    {
      year: req.body.year,
      month: req.body.month,
      numberOfDays: req.body.numberOfDays,
      startingDayOfTheWeek: req.body.startingDayOfTheWeek,
    },
    {
      where: { id: calendarId },
    }
  )
    .then(() =>
      res
        .status(200)
        .send(`Successfully Updated Calendar with id ${calendarId}`)
    )
    .catch((error) => res.status(404).send(error));
});

router.delete("/calendar/:id", (req, res) => {
  const calendarId = req.params.id;

  db.Calendar.destroy({
    where: { id: calendarId },
  })
    .then(() =>
      res
        .status(200)
        .send(`Successfully Deleted Calendar with id ${calendarId}`)
    )
    .catch((error) => res.status(404).send(error));
});

router.get("/events", (req, res) => {
  db.Events.findAll()
    .then((events) => res.status(200).send(events))
    .catch((error) => res.status(400).send(error));
});

router.get("/event/:id", (req, res) => {
  const eventId = req.params.id;

  db.Events.findByPk(eventId)
    .then((event) =>
      res.status(200).send(`Successfully found Event with id ${eventId}`)
    )
    .catch((error) => res.status(400).send(error));
});

router.post("/event/newEvent", (req, res) => {
  db.Events.create({
    date: req.body.date,
    time: req.body.time,
    relatedGame: req.body.relatedGame,
    numberOfPlayersWanted: req.body.numberOfPlayersWanted,
  })
    .then((submittedEvent) => res.status(200).send(submittedEvent))
    .catch((error) => res.status(400).send(error));
});

router.put("/event/:id", (req, res) => {
  const eventId = req.params.id;

  db.Events.update(
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
    .catch((error) => res.status(404).send(error));
});

router.delete("/event/:id", (req, res) => {
  const eventId = req.params.id;

  db.Events.destroy({
    where: { id: eventId },
  })
    .then(() =>
      res.status(200).send(`Successfully Deleted Event with id ${eventId}`)
    )
    .catch((error) => res.status(404).send(error));
});

module.exports = router;
